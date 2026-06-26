import Image from "next/image";
import { notFound } from "next/navigation";

import { RoleBadge } from "@/components/shared/role-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { featuredProducts } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function ProductDetailPage({
  params
}: {
  params: { locale: string; productId: string };
}) {
  const product = featuredProducts.find((item) => item.id === params.productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="container py-10">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border bg-white shadow-soft">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.images.concat(product.images, product.images).slice(0, 3).map((image, index) => (
              <div key={`${image}-${index}`} className="relative aspect-square overflow-hidden rounded-3xl border bg-white">
                <Image src={image} alt={product.title} fill className="object-cover" sizes="33vw" />
              </div>
            ))}
          </div>
        </div>
        <Card className="overflow-hidden border-white/60 bg-white/90 shadow-soft">
          <CardContent className="space-y-6 p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{product.category.name}</p>
                <h1 className="mt-2 text-3xl font-bold">{product.title}</h1>
              </div>
              <RoleBadge role="SELLER" />
            </div>
            <p className="text-3xl font-bold text-primary">{formatPrice(product.price)}</p>
            <p className="text-muted-foreground">{product.description}</p>
            <div className="grid gap-3 rounded-3xl bg-secondary p-4 text-sm md:grid-cols-3">
              <div>
                <p className="text-muted-foreground">Sotuvchi</p>
                <p className="font-semibold">{product.seller.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Reyting</p>
                <p className="font-semibold">{product.rating} / 5</p>
              </div>
              <div>
                <p className="text-muted-foreground">Qoldiq</p>
                <p className="font-semibold">{product.stock} dona</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="min-h-11 flex-1">Savatchaga qo&apos;shish</Button>
              <Button variant="outline" className="min-h-11 flex-1">
                Tezkor buyurtma
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
