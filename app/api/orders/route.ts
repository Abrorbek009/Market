import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { orderHistory } from "@/lib/mock-data";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { orderSchema } from "@/lib/validations";

export const runtime = "nodejs";

export async function GET() {
  const session = await auth();

  if (!session?.user || !isDatabaseConfigured || !prisma) {
    return NextResponse.json(orderHistory);
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        buyerId: session.user.id
      },
      include: {
        items: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(
      orders.map((order) => ({
        ...order,
        totalPrice: Number(order.totalPrice),
        items: order.items.map((item) => ({
          ...item,
          price: Number(item.price)
        }))
      }))
    );
  } catch {
    return NextResponse.json(orderHistory);
  }
}

export async function POST(request: Request) {
  const session = await auth();

  try {
    const payload = orderSchema.parse(await request.json());

    if (!session?.user || !isDatabaseConfigured || !prisma) {
      return NextResponse.json(
        {
          id: `guest-${Date.now()}`,
          ...payload,
          status: "PENDING"
        },
        { status: 201 }
      );
    }

    const order = await prisma.order.create({
      data: {
        buyerId: session.user.id,
        totalPrice: payload.totalPrice,
        address: payload.address,
        paymentMethod: payload.paymentMethod,
        items: {
          create: payload.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        items: true
      }
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Buyurtma yaratilmadi.", error }, { status: 400 });
  }
}
