import { NextResponse } from "next/server"
import { headers } from "next/headers"

import { stripe } from "@/lib/stripe"
import { GetSessionFromServer } from "@/app/lib/GettingSessions/GetSessionFromServer"

export async function POST() {
  const user = await GetSessionFromServer()
  try {
    const headersList = await headers()
    const origin = headersList.get("origin")

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: "price_1UbPPt57PyWU3Km9GlsR2At2",
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: user?.email,
      metadata: {
        userId: user?.id as string,
      },
      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
      // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
      integration_identifier: "hireloop_web_001",
    })
    return NextResponse.redirect(session.url as string, 303)
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err))
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
