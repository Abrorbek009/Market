import { ProductForm } from "@/components/forms/product-form";
import { featuredProducts } from "@/lib/mock-data";

export default function SellerProductsPage() {
  return (
    <div className="container grid gap-8 py-10 lg:grid-cols-[1fr_1.15fr]">
      <div className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-soft">
        <h1 className="text-3xl font-bold">Mahsulotlar boshqaruvi</h1>
        <p className="mt-2 text-muted-foreground">Yangi mahsulot qo&apos;shing yoki mavjud mahsulotlarni yangilang.</p>
        <div className="mt-6 space-y-3">
          {featuredProducts.map((product) => (
            <div key={product.id} className="rounded-3xl bg-secondary p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">{product.title}</p>
                  <p className="text-sm text-muted-foreground">{product.category.name}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-sm font-medium">{product.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ProductForm />
    </div>
  );
}
