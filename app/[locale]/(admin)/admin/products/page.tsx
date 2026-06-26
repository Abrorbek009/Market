import { featuredProducts } from "@/lib/mock-data";

export default function AdminProductsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold">Mahsulot moderatsiyasi</h1>
      <div className="mt-6 grid gap-4">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col justify-between gap-4 rounded-[2rem] border border-white/60 bg-white/90 p-5 shadow-soft md:flex-row md:items-center"
          >
            <div>
              <p className="font-semibold">{product.title}</p>
              <p className="text-sm text-muted-foreground">{product.seller.name}</p>
            </div>
            <div className="flex gap-3">
              <button className="min-h-11 rounded-full bg-primary px-5 text-sm font-semibold text-white">
                Tasdiqlash
              </button>
              <button className="min-h-11 rounded-full border px-5 text-sm font-semibold">Bloklash</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
