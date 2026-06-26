import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isDatabaseConfigured || !prisma) {
    return NextResponse.json({ message: "Database sozlanmagan." }, { status: 503 });
  }

  try {
    const payload = registerSchema.parse(await request.json());

    const existingUser = await prisma.user.findUnique({
      where: { email: payload.email }
    });

    if (existingUser) {
      return NextResponse.json({ message: "Bu email bilan foydalanuvchi mavjud." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const user = await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        password: hashedPassword,
        role: payload.role
      }
    });

    await prisma.cart.create({
      data: {
        userId: user.id
      }
    });

    return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Ro'yxatdan o'tishda xatolik.", error }, { status: 400 });
  }
}
