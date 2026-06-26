import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";

const orderStatusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"])
});

export const runtime = "nodejs";

export async function PATCH(request: Request, { params }: { params: { orderId: string } }) {
  const session = await auth();

  if (!session?.user || (session.user.role !== Role.SELLER && session.user.role !== Role.ADMIN)) {
    return NextResponse.json({ message: "Ruxsat yo'q." }, { status: 401 });
  }

  if (!isDatabaseConfigured || !prisma) {
    return NextResponse.json({ message: "Database sozlanmagan." }, { status: 503 });
  }

  try {
    const payload = orderStatusSchema.parse(await request.json());
    const order = await prisma.order.update({
      where: { id: params.orderId },
      data: {
        status: payload.status
      }
    });

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ message: "Status yangilanmadi.", error }, { status: 400 });
  }
}
