import { z } from "zod";
import { db } from "~/db/db";
import {
  subscribers,
  potential_subscribers,
  stockNotifications,
  emailDesigns,
  notifiedAlreadySubscribed,
} from "~/db/schema";
import { type InferModel } from "drizzle-orm";
import { eq, and } from "drizzle-orm/expressions";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import {
  backInStock,
  backInStockSignUp,
  confirmSubscription,
  alreadySubscribed,
} from "../../../components/emailTemplates";

import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY as string,
});

export const config = {
  runtime: "edge",
  regions: ["cle1"],
};
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length: number) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

const emailMailingList = async (subject: string, html: string) => {
  const subList = await db.select().from(subscribers);

  const sentFrom = new Sender("noreply@scalise.band", "Scalise");
  const bulkMail = [];

  // Send email to each subscriber using mailersend
  for (const subscriber of subList) {
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo([new Recipient(subscriber.email as string)])
      .setReplyTo(new Recipient("graden@scalise.band"))
      .setSubject(subject)
      .setHtml(html);

    bulkMail.push(emailParams);
  }

  await mailerSend.email.sendBulk(bulkMail);
};

export const sendConfirmationEmail = async (
  url: string,
  email: string,
  token: string
) => {
  const sentFrom = new Sender("noreply@scalise.band", "Scalise");
  const recipients = [new Recipient(email)];
  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(new Recipient(""))
    .setSubject("SCALISE - Confirm Subscription")
    .setHtml(confirmSubscription)
    .setVariables([
      {
        email: email,
        substitutions: [
          { var: "url", value: url },
          { var: "token", value: token },
        ],
      },
    ]);
  await mailerSend.email.send(emailParams);
};

const sendInitialNotificationEmail = async (
  email: string,
  product_name: string,
  product_size: string
) => {
  const sentFrom = new Sender("noreply@scalise.band", "Scalise");
  const recipients = [new Recipient(email)];
  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(new Recipient(""))
    .setSubject("SCALISE - Back in Stock Notification")
    .setHtml(backInStockSignUp(product_name, product_size));
  await mailerSend.email.send(emailParams);
};

const sendNotifications = async (
  users: { email: string }[],
  item_name: string,
  size: string
) => {
  for (const user of users) {
    const sentFrom = new Sender("noreply@scalise.band", "Scalise");
    const recipients = [new Recipient(user.email)];
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(new Recipient(""))
      .setSubject("SCALISE - Back In Stock!")
      .setHtml(backInStock(item_name, size));
    await mailerSend.email.send(emailParams);
  }
};

const userAlreadySubscribed = async (email: string, url: string) => {
  const sentFrom = new Sender("noreply@scalise.band", "Scalise");
  const recipients = [new Recipient(email)];
  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(new Recipient(""))
    .setSubject("SCALISE - Subscription Confirmed")
    .setHtml(alreadySubscribed)
    .setVariables([
      {
        email: email,
        substitutions: [{ var: "url", value: url }],
      },
    ]);
  await mailerSend.email.send(emailParams);
};

const sendContactFormEmail = async (
  firstName: string,
  lastName: string,
  email: string,
  subject: string,
  message: string
) => {
  const sentFrom = new Sender("noreply@scalise.band", "Contact Form");
  const recipients = [new Recipient("graden@scalise.band")];
  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject("Contact Form")
    .setHtml(
      `<h1>Subject: ${subject}</h1>
      <h2>From: ${firstName} ${lastName}</h2>
      <h3>Email: <a href="mailto:${email}">${email}</a></h3>
      <h3>Message:</h3>
      <p>${message}</p>`
    );

  await mailerSend.email.send(emailParams);
};

export const emailRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    return await db.select().from(subscribers);
  }),

  confirm: publicProcedure
    .input(z.object({ email: z.string(), url: z.string() }))
    .mutation(async ({ input }) => {
      const sub = await db
        .select()
        .from(subscribers)
        .where(eq(subscribers.email, input.email));
      if (sub && sub.length > 0) {
        const notified = await db
          .select()
          .from(notifiedAlreadySubscribed)
          .where(eq(notifiedAlreadySubscribed.email, input.email));
        if (notified && notified.length > 0) {
          return;
        } else {
          await userAlreadySubscribed(input.email, input.url).catch((error) =>
            console.error(error)
          );
          await db
            .insert(notifiedAlreadySubscribed)
            .values({ email: input.email });
        }
      }
      if (!sub || sub.length === 0) {
        const token = generateString(16);
        await sendConfirmationEmail(input.url, input.email, token)
          .then(async () => {
            //save email and token in potential subscribers table
            type Potential_Subscriber = InferModel<
              typeof potential_subscribers,
              "insert"
            >;
            const newPotential: Potential_Subscriber = {
              email: input.email,
              token: token.trim(),
            };
            await db.insert(potential_subscribers).values(newPotential);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }),

  subscribe: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input }) => {
      type Subscriber = InferModel<typeof subscribers, "insert">;
      //get email from database using token
      await db
        .select()
        .from(potential_subscribers)
        .where(eq(potential_subscribers.token, input.token))
        .then(async (result) => {
          if (!result[0]) {
            console.log(input.token);
            console.log(result);
            throw new Error("No Such Token");
          }
          const newSubscriber: Subscriber = {
            email: result[0].email,
          };
          await db.insert(subscribers).values(newSubscriber);
          await db
            .delete(potential_subscribers)
            .where(eq(potential_subscribers.token, input.token));
          return "success";
        })
        .catch((error) => {
          throw error;
        });
    }),

  adminSubscribe: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input }) => {
      await db.insert(subscribers).values({ email: input.email });
    }),

  notificationSignUp: publicProcedure
    .input(
      z.object({
        product_id: z.string(),
        name: z.string(),
        size: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const sub = await db
        .select()
        .from(stockNotifications)
        .where(
          and(
            eq(stockNotifications.product_id, parseInt(input.product_id)),
            eq(stockNotifications.size, input.size),
            eq(stockNotifications.email, input.email)
          )
        );

      if (sub && sub.length > 0) {
        return;
      }
      await db.insert(stockNotifications).values({
        product_id: parseInt(input.product_id),
        size: input.size,
        email: input.email,
      });
      await sendInitialNotificationEmail(input.email, input.name, input.size);
    }),

  notify: publicProcedure
    .input(
      z.object({
        item_name: z.string(),
        product_id: z.number(),
        size: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const users = (await db
        .select({
          email: stockNotifications.email,
        })
        .from(stockNotifications)
        .where(
          and(
            eq(stockNotifications.product_id, input.product_id),
            eq(stockNotifications.size, input.size)
          )
        )) as { email: string }[];

      if (users.length > 0) {
        await sendNotifications(users, input.item_name, input.size)
          .then(async () => {
            await db
              .delete(stockNotifications)
              .where(
                and(
                  eq(stockNotifications.product_id, input.product_id),
                  eq(stockNotifications.size, input.size)
                )
              );
          })
          .catch((error) => console.error(error));
      }
    }),

  emailList: publicProcedure
    .input(
      z.object({
        subject: z.string(),
        html: z.string(),
        testRecipient: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.testRecipient !== "") {
        //await testEmail(input.subject, input.html, input.testRecipient);
        const sentFrom = new Sender("noreply@scalise.band", "Scalise");
        const recipients = [new Recipient(input.testRecipient)];
        const emailParams = new EmailParams()
          .setFrom(sentFrom)
          .setTo(recipients)
          .setReplyTo(new Recipient("graden@scalise.band"))
          .setSubject(input.subject)
          .setHtml(input.html);
        await mailerSend.email.send(emailParams);
      } else {
        await emailMailingList(input.subject, input.html);
      }
    }),

  unsubscribe: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input }) => {
      await db.delete(subscribers).where(eq(subscribers.email, input.email));
    }),

  getEmailDesignNames: publicProcedure.query(async () => {
    return await db.select({ name: emailDesigns.name }).from(emailDesigns);
  }),

  getEmailDesign: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      return await db
        .select({ json: emailDesigns.json })
        .from(emailDesigns)
        .where(eq(emailDesigns.name, input.name));
    }),

  saveEmailDesign: publicProcedure
    .input(z.object({ name: z.string(), json: z.any() }))
    .mutation(async ({ input }) => {
      const existingDesign = await db
        .select()
        .from(emailDesigns)
        .where(eq(emailDesigns.name, input.name));
      if (existingDesign && existingDesign.length > 0) {
        await db
          .update(emailDesigns)
          .set({ json: input.json })
          .where(eq(emailDesigns.name, input.name))
          .catch((error) => console.error(error));
      } else {
        type designInput = InferModel<typeof emailDesigns, "insert">;
        const newDesign: designInput = {
          name: input.name,
          json: input.json,
        };

        await db
          .insert(emailDesigns)
          .values(newDesign)
          .catch((error) => console.error(error));
      }
    }),

  contactForm: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        subject: z.string(),
        message: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await sendContactFormEmail(
        input.firstName,
        input.lastName,
        input.email,
        input.subject,
        input.message
      );
    }),
});
