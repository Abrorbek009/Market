"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { productSchema } from "@/lib/validations";

type ProductValues = z.infer<typeof productSchema>;

export function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ProductValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80"],
      stock: 1,
      categoryId: "cat-tech",
      status: "PENDING"
    }
  });

  const onSubmit = async (values: ProductValues) => {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    if (response.ok) {
      reset();
    }
  };

  return (
    <Card className="border-white/60 bg-white/95 shadow-soft">
      <CardHeader>
        <CardTitle>Yangi mahsulot</CardTitle>
        <CardDescription>Bir nechta rasm, kategoriya va narx bilan mahsulot qo&apos;shish formasi.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="title">Nomi</Label>
            <Input id="title" {...register("title")} />
            {errors.title ? <p className="text-sm text-destructive">{errors.title.message}</p> : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Tavsif</Label>
            <Textarea id="description" {...register("description")} />
            {errors.description ? <p className="text-sm text-destructive">{errors.description.message}</p> : null}
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Narx</Label>
              <Input id="price" type="number" {...register("price", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Ombor</Label>
              <Input id="stock" type="number" {...register("stock", { valueAsNumber: true })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Rasm URL</Label>
            <Input id="image" {...register("images.0")} />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="categoryId">Kategoriya</Label>
              <select id="categoryId" className="min-h-11 w-full rounded-2xl border bg-white px-4 text-sm" {...register("categoryId")}>
                <option value="cat-tech">Elektronika</option>
                <option value="cat-fashion">Moda</option>
                <option value="cat-home">Uy uchun</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select id="status" className="min-h-11 w-full rounded-2xl border bg-white px-4 text-sm" {...register("status")}>
                <option value="DRAFT">Draft</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
              </select>
            </div>
          </div>
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saqlanmoqda..." : "Mahsulotni saqlash"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
