import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { featuredProducts } from "@/lib/mock-data";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations";

export const runtime = "nodejs";

export async function GET(_: Request, { params }: { params: { productId: string } }) {
  if (!isDatabaseConfigured || !prisma) {
    const fallback = featuredProducts.find((item) => item.id === params.productId);
    return fallback
      ? NextResponse.json(fallback)
      : NextResponse.json({ message: "Mahsulot topilmadi." }, { status: 404 });
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: params.productId },
      include: {
        category: true,
        seller: true,
        reviews: true
      }
    });

    if (!product) {
      return NextResponse.json({ message: "Mahsulot topilmadi." }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch {
    const fallback = featuredProducts.find((item) => item.id === params.productId);
    return fallback
      ? NextResponse.json(fallback)
      : NextResponse.json({ message: "Mahsulot topilmadi." }, { status: 404 });
  }
}

export async function PUT(request: Request, { params }: { params: { productId: string } }) {
  const session = await auth();

  if (!session?.user || (session.user.role !== Role.SELLER && session.user.role !== Role.ADMIN)) {
    return NextResponse.json({ message: "Ruxsat yo'q." }, { status: 401 });
  }

  if (!isDatabaseConfigured || !prisma) {
    return NextResponse.json({ message: "Database sozlanmagan." }, { status: 503 });
  }

  try {
    const payload = productSchema.partial().parse(await request.json());
    const product = await prisma.product.update({
      where: { id: params.productId },
      data: payload
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ message: "Mahsulot yangilanmadi.", error }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { productId: string } }) {
  const session = await auth();

  if (!session?.user || (session.user.role !== Role.SELLER && session.user.role !== Role.ADMIN)) {
    return NextResponse.json({ message: "Ruxsat yo'q." }, { status: 401 });
  }

  if (!isDatabaseConfigured || !prisma) {
    return NextResponse.json({ message: "Database sozlanmagan." }, { status: 503 });
  }

  try {
    await prisma.product.delete({
      where: { id: params.productId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: "Mahsulot o'chirilmadi.", error }, { status: 400 });
  }
}
