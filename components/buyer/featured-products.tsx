import { ProductCard } from "@/components/shared/product-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { featuredProducts } from "@/lib/mock-data";

export function FeaturedProducts({ locale }: { locale: string }) {
  return (
    <section className="container space-y-8">
      <SectionHeading
        eyebrow="Tavsiya"
        title="Highlight qilingan mahsulotlar"
        description="Marketing uchun tayyor kartalar, optimallashtirilgan rasmlar va kuchli CTA bloklari bilan."
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} locale={locale} product={product} />
        ))}
      </div>
    </section>
  );
}
