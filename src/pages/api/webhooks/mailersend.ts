import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "~/db/db";
import { subscribers } from "~/db/schema";
import { eq } from "drizzle-orm/expressions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const signature = req.headers["mailersend-signature"] as string;
  //eslint-disable-next-line
  if (!req.body.webhook_id || !req.body.data || !req.body.data.email)
    return res.status(400).json({});
  //eslint-disable-next-line
  if (signature === process.env.MAILERSEND_WEBHOOK_ID) {
    await db
      .delete(subscribers)
      //eslint-disable-next-line
      .where(eq(subscribers.email, req.body.data.email.recipient.email))
      .then(() => {
        return res.status(200).json({});
      })
      .catch(() => {
        return res.status(400).json({ error: "An error deletign subscriber" });
      });
  }

  return res.status(400).json({});
}
