"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/lib/validations";
import type { z } from "zod";

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm({
  locale,
  callbackUrl
}: {
  locale: string;
  callbackUrl?: string;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (values: LoginValues) => {
    const nextUrl = callbackUrl ?? `/${locale}`;

    const result = await signIn("credentials", {
      ...values,
      redirect: false,
      callbackUrl: nextUrl
    });

    if (!result?.error) {
      router.push(nextUrl);
      router.refresh();
    }
  };

  return (
    <Card className="w-full max-w-lg border-white/60 bg-white/95 shadow-soft">
      <CardHeader>
        <CardTitle>Kirish</CardTitle>
        <CardDescription>Email va parol orqali tizimga kiring.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
            {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Parol</Label>
            <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
            {errors.password ? <p className="text-sm text-destructive">{errors.password.message}</p> : null}
          </div>
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Kirilmoqda..." : "Kirish"}
          </Button>
        </form>
        <div className="mt-5 flex items-center justify-between text-sm">
          <Link href={`/${locale}/register`} className="font-medium text-primary">
            Akkaunt yaratish
          </Link>
          <Link href={`/${locale}/login?forgot=1`} className="text-muted-foreground">
            Parolni unutdingizmi?
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
