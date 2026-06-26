import crypto from "crypto";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

import { absoluteUrl } from "@/lib/utils";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { forgotPasswordSchema } from "@/lib/validations";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isDatabaseConfigured || !prisma) {
    return NextResponse.json({ message: "Database sozlanmagan." }, { status: 503 });
  }

  try {
    const { email } = forgotPasswordSchema.parse(await request.json());
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ message: "Agar akkaunt mavjud bo'lsa, email yuboriladi." });
    }

    const resetToken = crypto.randomBytes(24).toString("hex");
    const resetUrl = absoluteUrl(`/uz/login?resetToken=${resetToken}`);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry: new Date(Date.now() + 1000 * 60 * 30)
      }
    });

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
      });

      await transporter.sendMail({
        from: process.env.MAIL_FROM ?? "noreply@example.com",
        to: email,
        subject: "Parolni tiklash",
        text: `Parolni tiklash uchun havola: ${resetUrl}`
      });
    }

    return NextResponse.json({
      message: "Parolni tiklash yo'riqnomasi yuborildi.",
      previewUrl: resetUrl
    });
  } catch (error) {
    return NextResponse.json({ message: "Email yuborilmadi.", error }, { status: 400 });
  }
}
