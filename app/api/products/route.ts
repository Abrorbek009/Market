import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { featuredProducts } from "@/lib/mock-data";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations";

export const runtime = "nodejs";

export async function GET() {
  if (!isDatabaseConfigured || !prisma) {
    return NextResponse.json(featuredProducts);
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        status: "APPROVED"
      },
      include: {
        category: true,
        seller: true,
        reviews: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(
      products.map((product) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        price: Number(product.price),
        images: product.images,
        stock: product.stock,
        rating:
          product.reviews.length > 0
            ? Number((product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length).toFixed(1))
            : 4.7,
        reviewCount: product.reviews.length,
        category: {
          id: product.category.id,
          name: product.category.name,
          slug: product.category.slug
        },
        seller: {
          id: product.seller.id,
          name: product.seller.name
        },
        status: product.status
      }))
    );
  } catch {
    return NextResponse.json(featuredProducts);
  }
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user || (session.user.role !== Role.SELLER && session.user.role !== Role.ADMIN)) {
    return NextResponse.json({ message: "Ruxsat yo'q." }, { status: 401 });
  }

  if (!isDatabaseConfigured || !prisma) {
    return NextResponse.json({ message: "Database sozlanmagan." }, { status: 503 });
  }

  try {
    const payload = productSchema.parse(await request.json());

    const product = await prisma.product.create({
      data: {
        title: payload.title,
        description: payload.description,
        price: payload.price,
        images: payload.images,
        stock: payload.stock,
        categoryId: payload.categoryId,
        sellerId: session.user.id,
        status: payload.status
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Mahsulot yaratilmadi.", error }, { status: 400 });
  }
}
