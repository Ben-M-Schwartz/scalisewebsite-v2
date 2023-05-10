import type { NextApiRequest, NextApiResponse } from "next";
import rawBody from "raw-body";

import { db } from "~/db/db";
import { subscribers } from "~/db/schema";
import { type InferModel } from "drizzle-orm";
import { eq } from "drizzle-orm/expressions";

export const config = {
  /* runtime: "edge", */
  api: {
    // Turn off the body parser so we can access raw body for verification.
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //const body = await rawBody(req);
  //console.log(body)
  console.log(req);
  console.log(req.headers);
  const signature = req.headers["mailersend-signature"] as string;

  if (signature === process.env.MAILERSEND_SIGNATURE) {
    //const requestBody = JSON.parse(body) as InferModel<typeof subscribers>;
    //eslint-disable-next-line
    await db.delete(subscribers).where(eq(subscribers.email, req.body.email));
    return res.status(200).json({});
  }

  return res.status(400).json({});
}
