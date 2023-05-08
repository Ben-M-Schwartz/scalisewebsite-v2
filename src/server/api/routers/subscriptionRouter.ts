import { z } from "zod";
import { db } from "~/db/db";
import {
  subscribers,
  potential_subscribers,
  stockNotifications,
  emailDesigns,
} from "~/db/schema";
import { type InferModel } from "drizzle-orm";
import { eq, and } from "drizzle-orm/expressions";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import nodemailer from "nodemailer";
import Handlebars from "handlebars";

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

const createTransporter = () => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      secure: true,
      port: 465,
      auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD,
      },
    });
    return transporter;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create email transporter");
  }
};

type EmailOptions = {
  from: string;
  to: string;
  subject: string;
  html: string;
};
//emailOptions - who sends what to whom
export const sendEmail = async (emailOptions: EmailOptions) => {
  const emailTransporter = createTransporter();
  try {
    await emailTransporter.sendMail(emailOptions);
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to send email to ${emailOptions.to}`);
  }
};

const emailMailingList = async (subject: string, html: string) => {
  /*   const template = Handlebars.compile(`
        <h1>{{subject}}</h1>
        <p>{{body}}</p>
        <a href={{domain}}/unsubscribe/{{email}}>Unsubscribe</a>
    `);

    html in email options: template({
        subject: subject,
        body: body,
        domain: process.env.DOMAIN,
        email: subscriber.email,
      })
    
    
    */
  // Get list of subscribers from database or file
  const subList = await db.select().from(subscribers);

  // Send email to each subscriber using nodemailer
  for (const subscriber of subList) {
    //console.log(subscriber.email)
    const mailOptions: EmailOptions = {
      from: "ben@scalise.band" /* process.env.GOOGLE_EMAIL! */,
      to: subscriber.email as string,
      subject: subject,
      html: html,
    };
    await sendEmail(mailOptions);
  }
};

const testEmail = async (
  subject: string,
  html: string,
  testRecipient: string
) => {
  const mailOptions: EmailOptions = {
    from: "ben@scalise.band" /* process.env.GOOGLE_EMAIL! */,
    to: testRecipient,
    subject: subject,
    html: html,
  };
  await sendEmail(mailOptions);
};

const sendConfirmationEmail = async (
  url: string,
  email: string,
  token: string
) => {
  const mailOptions: EmailOptions = {
    from: "ben@scalise.band" /* process.env.GOOGLE_EMAIL! */,
    to: email,
    subject: "Confirm your subscription to SCALISE",
    html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>SCALISE Subscription Confirmation</title>
        </head>
        <body>
          <h1>SCALISE</h1>
          <p>Please confirm your subscription.</p>
          <p>Before we send you any email, we need you to confirm your subscription.</p>
          <a href="${url}/Confirm/${token}" style="display: inline-block; background-color: #007bff; color: #fff; font-size: 16px; padding: 10px 20px; border-radius: 5px; text-decoration: none;">CONFIRM SUBSCRIPTION</a>
          <p>If you didn’t subscribe to this list, ignore this email. We won’t subscribe you unless you tap or click the button above.</p>
        </body>
        </html>`,
  };

  await sendEmail(mailOptions).catch((error) => {
    console.error(error);
    throw new Error(`Failed to send email`);
  });
};

const sendInitialNotificationEmail = async (
  email: string,
  product_name: string,
  product_size: string
) => {
  const emailOptions: EmailOptions = {
    from: "ben@scalise.band" /* process.env.GOOGLE_EMAIL! */,
    to: email,
    subject: "Scalise Store Notifications",
    html: `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Back in Stock Notification</title>
        <style>
          /* Email Styles */
          body {
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            color: #333;
            background-color: #f5f5f5;
            padding: 20px;
          }
          h1 {
            font-size: 24px;
            margin-top: 0;
          }
          p {
            margin-bottom: 1em;
          }
          .button {
            display: inline-block;
            background-color: #007bff;
            color: #fff;
            font-size: 16px;
            text-align: center;
            padding: 10px 20px;
            border-radius: 4px;
            text-decoration: none;
          }
          .button:hover {
            background-color: #0062cc;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <h1>Back in Stock Notification</h1>
        <p>Thank you for signing up to be notified when ${product_name} ${
      product_size !== "" ? `size: ${product_size}` : ""
    } is back in stock. 
        We'll let you know as soon as it becomes available again.</p>
        <p>In the meantime, feel free to browse our selection of other items.</p>
        <a href="${
          process.env.DOMAIN as string
        }/Store" class="button">Shop Now</a>
      </body>
    </html>`,
  };
  await sendEmail(emailOptions).catch((error) => {
    console.error(error);
    throw new Error(`Failed to send confirmation of notifications email`);
  });
};

const sendNotifications = async (
  users: { email: string }[],
  item_name: string,
  size: string
) => {
  for (const user of users) {
    const emailOptions: EmailOptions = {
      from: "ben@scalise.band" /* process.env.GOOGLE_EMAIL! */,
      to: user.email,
      subject: "Scalise Store Notifications",
      html: `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Back in Stock Notification</title>
          <style>
            /* Email Styles */
            body {
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.5;
              color: #333;
              background-color: #f5f5f5;
              padding: 20px;
            }
            h1 {
              font-size: 24px;
              margin-top: 0;
            }
            p {
              margin-bottom: 1em;
            }
          </style>
        </head>
        <body>
            <p>Good News!</p>
            <p>${item_name} ${
        size !== "" ? `Size: ${size}` : ""
      } is back in stock!</p>
            <p>Thank you so much for your support</p>
            <a href="${
              process.env.DOMAIN as string
            }/Store" class="button">Shop Now</a>
        </body>
      </html>`,
    };
    await sendEmail(emailOptions).catch((error) => {
      console.error(error);
      throw new Error(`Failed to send confirmation of notifications email`);
    });
  }
};

const userAlreadySubscribed = async (email: string, url: string) => {
  const mailOptions: EmailOptions = {
    from: "ben@scalise.band" /* process.env.GOOGLE_EMAIL! */,
    to: email,
    subject: "SCALISE subscription",
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>SCALISE Subscription Confirmation</title>
    </head>
    <body>
      <h1>SCALISE</h1>
      <p>Accorrding to our database you are already subscribed.</p>
      <p>If you are not recieving emails for our mailing list, check your spam folder.</p>
      <p>Otherwise, please reach out through our contact form or email benschwartz33@gmail.com for assistance</p>
      <a href=${url}/Contact>Contact</a>
    </body>
    </html>`,
  };

  await sendEmail(mailOptions).catch((error) => {
    console.error(error);
    throw new Error(`Failed to send email`);
  });
};

const sendContactFormEmail = async (
  firstName: string,
  lastName: string,
  email: string,
  subject: string,
  message: string
) => {
  const template = Handlebars.compile(`
        <h1>Subject: {{subject}}</h1>
        <h2>From: {{firstName}} {{lastName}}</h2>
        <h3>Email: <a href="mailto:{{email}}">{{email}}</a></h3>
        <h3>Message:</h3>
        <p>{{body}}</p>
    `);

  const mailOptions: EmailOptions = {
    from: "ben@scalise.band" /* process.env.GOOGLE_EMAIL! */,
    to: "benschwartz33@gmail.com",
    subject: "Scalise Contact Form Submission",
    html: template({
      subject: subject,
      body: message,
      firstName: firstName,
      lastName: lastName,
      email: email,
    }),
  };

  await sendEmail(mailOptions).catch((error) => {
    console.error(error);
    throw new Error(`Failed to send email`);
  });
};

export const subscriptionRouter = createTRPCRouter({
  confirm: publicProcedure
    .input(z.object({ email: z.string(), url: z.string() }))
    .mutation(async ({ input }) => {
      const sub = await db
        .select()
        .from(subscribers)
        .where(eq(subscribers.email, input.email));
      if (sub && sub.length > 0) {
        await userAlreadySubscribed(input.email, input.url).catch((error) =>
          console.error(error)
        );
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
              token: token,
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
        await testEmail(input.subject, input.html, input.testRecipient);
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
      type designInput = InferModel<typeof emailDesigns, "insert">;
      const newDesign: designInput = {
        name: input.name,
        json: input.json,
      };

      await db
        .insert(emailDesigns)
        .values(newDesign)
        .catch((error) => console.error(error));
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
