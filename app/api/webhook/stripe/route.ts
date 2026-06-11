import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Payments/webhook handling disabled. Re-implement if you add a payment provider.
  return NextResponse.json({ received: true });
}
