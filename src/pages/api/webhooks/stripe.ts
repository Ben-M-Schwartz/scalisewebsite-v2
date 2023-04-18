/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { NextApiRequest, NextApiResponse } from "next"
import rawBody from "raw-body"
import type Stripe from "stripe"

import { db } from "~/db/db"
import { stripe } from "~/utils/stripe"

export const config = {
  api: {
    // Turn off the body parser so we can access raw body for verification.
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = await rawBody(req)
  const signature = req.headers["stripe-signature"] as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    )
  } catch (error: any) {
    return res.status(400).send(`Webhook Error: ${error.message}`)
  }

  const session = event.data.object as Stripe.Checkout.Session
  console.log(session)

  if (event.type === "checkout.session.completed") {
    console.log(event)
  }

  if (event.type === "invoice.payment_succeeded") {
    console.log(event)
  }
}

/*
Stripe webhook response: 
{
  id: 'pi_3My2knHmtb6xoR6R04oyHzbJ',
  object: 'payment_intent',
  amount: 21500,
  amount_capturable: 0,
  amount_details: { tip: {} },
  amount_received: 21500,
  application: null,
  application_fee_amount: null,
  automatic_payment_methods: null,
  canceled_at: null,
  cancellation_reason: null,
  capture_method: 'automatic',
  client_secret: 'pi_3My2knHmtb6xoR6R04oyHzbJ_secret_MsngiPqCA3pMbxNxsjXV8nJPO',
  confirmation_method: 'automatic',
  created: 1681779041,
  currency: 'usd',
  customer: null,
  description: null,
  invoice: null,
  last_payment_error: null,
  latest_charge: 'ch_3My2knHmtb6xoR6R0k5qJFmp',
  livemode: false,
  metadata: {},
  next_action: null,
  on_behalf_of: null,
  payment_method: 'pm_1My2knHmtb6xoR6RSzZPlaVq',
  payment_method_options: {
    card: {
      installments: null,
      mandate_options: null,
      network: null,
      request_three_d_secure: 'automatic'
    }
  },
  payment_method_types: [ 'card' ],
  processing: null,
  receipt_email: null,
  review: null,
  setup_future_usage: null,
  shipping: {
    address: {
      city: 'Lakeville',
      country: 'US',
      line1: '16275 Havelock Way',
      line2: null,
      postal_code: '55044',
      state: 'MN'
    },
    carrier: null,
    name: 'Ben Schwartz',
    phone: null,
    tracking_number: null
  },
  source: null,
  statement_descriptor: null,
  statement_descriptor_suffix: null,
  status: 'succeeded',
  transfer_data: null,
  transfer_group: null
}
API resolved without sending a response for /api/webhooks/stripe, this may result in stalled requests.
{
  id: 'ch_3My2knHmtb6xoR6R0k5qJFmp',
  object: 'charge',
  amount: 21500,
  amount_captured: 21500,
  amount_refunded: 0,
  application: null,
  application_fee: null,
  application_fee_amount: null,
  balance_transaction: 'txn_3My2knHmtb6xoR6R0MVCFmgh',
  billing_details: {
    address: {
      city: 'Lakeville',
      country: 'US',
      line1: '16275 Havelock Way',
      line2: null,
      postal_code: '55044',
      state: 'MN'
    },
    email: 'benschwartz33@gmail.com',
    name: 'Ben Schwartz',
    phone: null
  },
  calculated_statement_descriptor: 'Stripe',
  captured: true,
  created: 1681779042,
  currency: 'usd',
  customer: null,
  description: null,
  destination: null,
  dispute: null,
  disputed: false,
  failure_balance_transaction: null,
  failure_code: null,
  failure_message: null,
  fraud_details: {},
  invoice: null,
  livemode: false,
  metadata: {},
  on_behalf_of: null,
  order: null,
  outcome: {
    network_status: 'approved_by_network',
    reason: null,
    risk_level: 'normal',
    risk_score: 15,
    seller_message: 'Payment complete.',
    type: 'authorized'
  },
  paid: true,
  payment_intent: 'pi_3My2knHmtb6xoR6R04oyHzbJ',
  payment_method: 'pm_1My2knHmtb6xoR6RSzZPlaVq',
  payment_method_details: {
    card: {
      brand: 'visa',
      checks: [Object],
      country: 'US',
      exp_month: 12,
      exp_year: 2025,
      fingerprint: 'mwtgrUJG4wyLYHrT',
      funding: 'credit',
      installments: null,
      last4: '4242',
      mandate: null,
      network: 'visa',
      network_token: [Object],
      three_d_secure: null,
      wallet: null
    },
    type: 'card'
  },
  receipt_email: null,
  receipt_number: null,
  receipt_url: 'https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTXZPd21IbXRiNnhvUjZSKOPS96EGMgY_os9g6SU6LBZRn1f5BUsP0fnp88PECtnoM9juHp2CtFX3uFR7k9TtjS7-2JrM6E48LLLC',
  refunded: false,
  review: null,
  shipping: {
    address: {
      city: 'Lakeville',
      country: 'US',
      line1: '16275 Havelock Way',
      line2: null,
      postal_code: '55044',
      state: 'MN'
    },
    carrier: null,
    name: 'Ben Schwartz',
    phone: null,
    tracking_number: null
  },
  source: null,
  source_transfer: null,
  statement_descriptor: null,
  statement_descriptor_suffix: null,
  status: 'succeeded',
  transfer_data: null,
  transfer_group: null
}
API resolved without sending a response for /api/webhooks/stripe, this may result in stalled requests.
{
  id: 'pi_3My2knHmtb6xoR6R04oyHzbJ',
  object: 'payment_intent',
  amount: 21500,
  amount_capturable: 0,
  amount_details: { tip: {} },
  amount_received: 0,
  application: null,
  application_fee_amount: null,
  automatic_payment_methods: null,
  canceled_at: null,
  cancellation_reason: null,
  capture_method: 'automatic',
  client_secret: 'pi_3My2knHmtb6xoR6R04oyHzbJ_secret_MsngiPqCA3pMbxNxsjXV8nJPO',
  confirmation_method: 'automatic',
  created: 1681779041,
  currency: 'usd',
  customer: null,
  description: null,
  invoice: null,
  last_payment_error: null,
  latest_charge: null,
  livemode: false,
  metadata: {},
  next_action: null,
  on_behalf_of: null,
  payment_method: null,
  payment_method_options: {
    card: {
      installments: null,
      mandate_options: null,
      network: null,
      request_three_d_secure: 'automatic'
    }
  },
  payment_method_types: [ 'card' ],
  processing: null,
  receipt_email: null,
  review: null,
  setup_future_usage: null,
  shipping: null,
  source: null,
  statement_descriptor: null,
  statement_descriptor_suffix: null,
  status: 'requires_payment_method',
  transfer_data: null,
  transfer_group: null
}
API resolved without sending a response for /api/webhooks/stripe, this may result in stalled requests.
{
  id: 'cs_test_b1aJw6rfEuo8T9hNPcQB4fBVoYEt7TYDnFm25xZnNayaPJDXzKbjB1M1oC',
  object: 'checkout.session',
  after_expiration: null,
  allow_promotion_codes: null,
  amount_subtotal: 21500,
  amount_total: 21500,
  automatic_tax: { enabled: false, status: null },
  billing_address_collection: 'required',
  cancel_url: 'http://localhost:3000/canceled/{CHECKOUT_SESSION_ID}',
  client_reference_id: null,
  consent: null,
  consent_collection: null,
  created: 1681779000,
  currency: 'usd',
  currency_conversion: null,
  custom_fields: [],
  custom_text: { shipping_address: null, submit: null },
  customer: null,
  customer_creation: 'if_required',
  customer_details: {
    address: {
      city: 'Lakeville',
      country: 'US',
      line1: '16275 Havelock Way',
      line2: null,
      postal_code: '55044',
      state: 'MN'
    },
    email: 'benschwartz33@gmail.com',
    name: 'Ben Schwartz',
    phone: null,
    tax_exempt: 'none',
    tax_ids: []
  },
  customer_email: null,
  expires_at: 1681865400,
  invoice: null,
  invoice_creation: {
    enabled: false,
    invoice_data: {
      account_tax_ids: null,
      custom_fields: null,
      description: null,
      footer: null,
      metadata: {},
      rendering_options: null
    }
  },
  livemode: false,
  locale: null,
  metadata: {},
  mode: 'payment',
  payment_intent: 'pi_3My2knHmtb6xoR6R04oyHzbJ',
  payment_link: null,
  payment_method_collection: 'always',
  payment_method_options: {},
  payment_method_types: [ 'card', 'link', 'cashapp' ],
  payment_status: 'paid',
  phone_number_collection: { enabled: false },
  recovered_from: null,
  setup_intent: null,
  shipping_address_collection: { allowed_countries: [ 'US', 'CA' ] },
  shipping_cost: null,
  shipping_details: {
    address: {
      city: 'Lakeville',
      country: 'US',
      line1: '16275 Havelock Way',
      line2: null,
      postal_code: '55044',
      state: 'MN'
    },
    name: 'Ben Schwartz'
  },
  shipping_options: [],
  status: 'complete',
  submit_type: null,
  subscription: null,
  success_url: 'http://localhost:3000/success/{CHECKOUT_SESSION_ID}',
  total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
  url: null
}
*/