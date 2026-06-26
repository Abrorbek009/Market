import { ProductCatalog } from "@/components/buyer/product-catalog";

export default function ProductsPage({
  params
}: {
  params: { locale: string };
}) {
  return (
    <div className="container py-10">
      <ProductCatalog locale={params.locale} />
    </div>
  );
}
