import { CategoryGrid } from "@/components/buyer/category-grid";
import { FeaturedProducts } from "@/components/buyer/featured-products";
import { HeroBanner } from "@/components/buyer/hero-banner";

export default function HomePage({
  params
}: {
  params: { locale: string };
}) {
  return (
    <div className="space-y-14 pb-16">
      <HeroBanner locale={params.locale} />
      <CategoryGrid />
      <FeaturedProducts locale={params.locale} />
    </div>
  );
}
