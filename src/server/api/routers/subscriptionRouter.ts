import { z } from "zod";
import {db} from '~/db/db'
import { subscribers, potential_subscribers } from '~/db/schema'
import { type InferModel } from 'drizzle-orm';
import { eq } from 'drizzle-orm/expressions'

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

import crypto from 'crypto'

import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';

const createTransporter = () => {
      try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
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
      throw new Error('Failed to create email transporter');
    }
 } 

type EmailOptions = {
    from: string,
    to: string,
    subject: string,
    html: string
}
//emailOptions - who sends what to whom
const sendEmail = async (emailOptions: EmailOptions) => {
    const emailTransporter = createTransporter();
    try {
      await emailTransporter.sendMail(emailOptions);
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to send email to ${emailOptions.to}`);
    }
  };

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const emailMailingList = async (subject: string, body: string) => {
    const template = Handlebars.compile(`
        <h1>{{subject}}</h1>
        <p>{{body}}</p>
    `);
    // Get list of subscribers from database or file
    const subList = await db.select().from(subscribers)
    // Send email to each subscriber using nodemailer
    for (const subscriber of subList) {
        //console.log(subscriber.email)
        const mailOptions: EmailOptions = {    
        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        from: process.env.GOOGLE_EMAIL!,
        to: subscriber.email!,
        /* eslint-enable @typescript-eslint/no-non-null-assertion */
        subject: subject,
        html: template({ subject: subject, body: body })
        };
        await sendEmail(mailOptions)
    }
}

const sendConfirmationEmail = async( url: string, email: string, token: string) => {
    const mailOptions: EmailOptions = {
        /*eslint-disable-next--line @typescript-eslint/no-non-null-assertion*/
        from: process.env.GOOGLE_EMAIL!,
        to: email,
        subject: 'Confirm your subscription to SCALISE',
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
        </html>`
    };

    await sendEmail(mailOptions).catch((error) => {
        console.error(error)
        throw new Error(`Failed to send email`);
    })
}


export const subscriptionRouter = createTRPCRouter({
  confirm: publicProcedure
    .input(z.object({ email: z.string(), url: z.string() }))
    .mutation(async ({ input }) => {
        const token = crypto.randomBytes(16).toString('hex');
        await sendConfirmationEmail(input.url, input.email, token).then(async () => {
        //save email and token in potential subscribers table
            type Potential_Subscriber = InferModel<typeof potential_subscribers, 'insert'>;
            const newPotential: Potential_Subscriber = {
                email: input.email, token: token
            }
            await db.insert(potential_subscribers).values(newPotential)
        }).catch((error) => {
            console.error(error)
            throw new Error('Email Invalid')
        })
  }), 
  subscribe: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input }) => {
        type Subscriber = InferModel<typeof subscribers, 'insert'>;
        //get email from database using token
        await db.select().from(potential_subscribers).where(eq(potential_subscribers.token, input.token)).then(
            async (result) => {
                if(!result[0]){
                    throw new Error('No Such Token')
                }
                const newSubscriber: Subscriber = {
                    email: result[0].email
                }
                await db.insert(subscribers).values(newSubscriber)
                await db.delete(potential_subscribers).where(eq(potential_subscribers.token, input.token))
            }
        )//.catch((error)=>console.error(error))
        //Theres probably a better way around this but I want the error to make it to the tsx file running this
        //So that the on screen text says that the link is not valid. I don't really care
        //About catching any errors otherwise because this is only used from the link in the email and
        //If it doesn't work I want the user to generate a new one since I know it works normally.
    }),
});