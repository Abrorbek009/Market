import Image from "next/image";

import { SectionHeading } from "@/components/shared/section-heading";
import { categories } from "@/lib/mock-data";

export function CategoryGrid() {
  return (
    <section className="container space-y-8">
      <SectionHeading
        eyebrow="Kategoriyalar"
        title="Qidiruvni tezlashtiradigan bo'limlar"
        description="Elektronika, moda va uy uchun mahsulotlarni qulay navigatsiya bilan taqdim eting."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {categories.map((category) => (
          <article key={category.id} className="group overflow-hidden rounded-[2rem] border border-white/60 bg-white/95 shadow-soft">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="space-y-1 p-5">
              <h3 className="text-xl font-bold">{category.name}</h3>
              <p className="text-sm text-muted-foreground">slug: {category.slug}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
