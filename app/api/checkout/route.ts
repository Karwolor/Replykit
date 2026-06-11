import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Payments are currently disabled in this deployment.
  // The Stripe integration was removed per project configuration.
  // To re-enable payments later, replace this handler with an integration
  // for your chosen provider (Stripe, PayPal, Paddle, Razorpay, etc.)
  return NextResponse.json(
    { error: "Payments are disabled. Configure a payment provider to enable checkout." },
    { status: 501 }
  );
}
