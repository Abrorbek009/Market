import { NextResponse } from "next/server";
import { z } from "zod";

const paymeSchema = z.object({
  orderId: z.string().min(1),
  amount: z.number().positive()
});

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = paymeSchema.parse(await request.json());

    return NextResponse.json({
      provider: "Payme",
      merchantId: process.env.PAYME_MERCHANT_ID ?? "demo-merchant",
      orderId: payload.orderId,
      amount: payload.amount,
      status: "created"
    });
  } catch (error) {
    return NextResponse.json({ message: "Payme so'rovi xato.", error }, { status: 400 });
  }
}
