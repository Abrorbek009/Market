import { NextResponse } from "next/server";
import { z } from "zod";

const clickSchema = z.object({
  orderId: z.string().min(1),
  amount: z.number().positive()
});

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = clickSchema.parse(await request.json());

    return NextResponse.json({
      provider: "Click",
      serviceId: process.env.CLICK_SERVICE_ID ?? "demo-service",
      merchantId: process.env.CLICK_MERCHANT_ID ?? "demo-merchant",
      orderId: payload.orderId,
      amount: payload.amount,
      status: "created"
    });
  } catch (error) {
    return NextResponse.json({ message: "Click so'rovi xato.", error }, { status: 400 });
  }
}
