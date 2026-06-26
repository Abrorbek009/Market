"use client";

import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";

import { ProductCard } from "@/components/shared/product-card";
import { Input } from "@/components/ui/input";
import { featuredProducts } from "@/lib/mock-data";
import type { ProductCardItem } from "@/lib/types";

async function getProducts(): Promise<ProductCardItem[]> {
  const response = await fetch("/api/products", {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Mahsulotlarni yuklashda xatolik yuz berdi");
  }

  return response.json();
}

export function ProductCatalog({ locale }: { locale: string }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popular");
  const [category, setCategory] = useState("all");

  const { data = featuredProducts, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts
  });

  const filtered = (() => {
    const base = data.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" ? true : item.category.slug === category;
      return matchesSearch && matchesCategory;
    });

    const sorted = [...base];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  })();

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mahsulotlar katalogi</h1>
          <p className="mt-2 text-muted-foreground">Filter, qidiruv va saralash bilan buyer experience.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="relative sm:col-span-2">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(event) => setSearch(event.target.value)} className="pl-10" placeholder="Qidiruv..." />
          </div>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="min-h-11 rounded-2xl border bg-white px-4 text-sm"
          >
            <option value="all">Barcha kategoriya</option>
            <option value="elektronika">Elektronika</option>
            <option value="moda">Moda</option>
            <option value="uy-uchun">Uy uchun</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end">
        <select value={sort} onChange={(event) => setSort(event.target.value)} className="min-h-11 rounded-2xl border bg-white px-4 text-sm">
          <option value="popular">Mashhur</option>
          <option value="rating">Reyting</option>
          <option value="price-asc">Narx: arzon</option>
          <option value="price-desc">Narx: qimmat</option>
        </select>
      </div>
      {isLoading ? <p className="text-sm text-muted-foreground">Mahsulotlar yuklanmoqda...</p> : null}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} locale={locale} product={product} />
        ))}
      </div>
    </section>
  );
}
