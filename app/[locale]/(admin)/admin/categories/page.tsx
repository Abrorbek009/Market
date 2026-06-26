import Image from "next/image";

import { categories } from "@/lib/mock-data";

export default function AdminCategoriesPage() {
  return (
    <div className="container py-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Kategoriyalar</h1>
          <p className="mt-2 text-muted-foreground">Kategoriyalarni yarating, yangilang va tartibga soling.</p>
        </div>
        <button className="min-h-11 rounded-full bg-primary px-5 font-semibold text-white">Yangi kategoriya</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <div key={category.id} className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/90 shadow-soft">
            <div className="relative aspect-[5/3]">
              <Image src={category.image} alt={category.name} fill className="object-cover" sizes="33vw" />
            </div>
            <div className="p-5">
              <p className="font-semibold">{category.name}</p>
              <p className="text-sm text-muted-foreground">{category.slug}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
