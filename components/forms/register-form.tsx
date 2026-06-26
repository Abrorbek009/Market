"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema } from "@/lib/validations";
import type { z } from "zod";

type RegisterValues = z.infer<typeof registerSchema>;

export function RegisterForm({ locale }: { locale: string }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "BUYER"
    }
  });

  const onSubmit = async (values: RegisterValues) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      return;
    }

    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false
    });

    router.push(`/${locale}`);
    router.refresh();
  };

  return (
    <Card className="w-full max-w-xl border-white/60 bg-white/95 shadow-soft">
      <CardHeader>
        <CardTitle>Ro&apos;yxatdan o&apos;tish</CardTitle>
        <CardDescription>Buyer yoki seller sifatida akkaunt yarating.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Ism</Label>
              <Input id="name" placeholder="Ali Valiyev" {...register("name")} />
              {errors.name ? <p className="text-sm text-destructive">{errors.name.message}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input id="phone" placeholder="+998 90 123 45 67" {...register("phone")} />
              {errors.phone ? <p className="text-sm text-destructive">{errors.phone.message}</p> : null}
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
              {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Parol</Label>
              <Input id="password" type="password" placeholder="Kamida 6 ta belgi" {...register("password")} />
              {errors.password ? <p className="text-sm text-destructive">{errors.password.message}</p> : null}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Rol</Label>
            <select id="role" className="min-h-11 w-full rounded-2xl border bg-white px-4 text-sm" {...register("role")}>
              <option value="BUYER">Buyer</option>
              <option value="SELLER">Seller</option>
            </select>
          </div>
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Yaratilmoqda..." : "Akkaunt yaratish"}
          </Button>
        </form>
        <div className="mt-5 text-sm">
          <Link href={`/${locale}/login`} className="font-medium text-primary">
            Akkauntingiz bormi? Kirish
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
