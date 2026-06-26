"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ProductCardItem } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

export function ProductCard({
  locale,
  product
}: {
  locale: string;
  product: ProductCardItem;
}) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <Card className="group overflow-hidden border-white/60 bg-white/95 shadow-soft">
      <div className="relative aspect-[5/4] overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <CardContent className="space-y-4 p-5">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{product.category.name}</p>
          <Link href={`/${locale}/products/${product.id}`} className="block text-xl font-bold hover:text-primary">
            {product.title}
          </Link>
          <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold">{formatPrice(product.price)}</p>
            <p className="text-sm text-muted-foreground">
              {product.rating} reyting · {product.reviewCount} sharh
            </p>
          </div>
          <Button
            onClick={() =>
              addItem({
                id: product.id,
                title: product.title,
                image: product.images[0],
                price: product.price,
                quantity: 1
              })
            }
          >
            Qo&apos;shish
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
