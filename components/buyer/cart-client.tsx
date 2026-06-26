"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export function CartClient({ locale }: { locale: string }) {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("PAYME");

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  async function handleCheckout() {
    if (!items.length || !address) {
      return;
    }

    await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        totalPrice: total,
        address,
        paymentMethod
      })
    });

    clearCart();
    router.push(`/${locale}/orders`);
  }

  if (!items.length) {
    return <EmptyState title="Savatcha bo&apos;sh" description="Mahsulot tanlang va xaridni boshlang." />;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col gap-4 rounded-[2rem] border border-white/60 bg-white/90 p-4 shadow-soft sm:flex-row">
            <div className="relative h-28 w-full overflow-hidden rounded-3xl sm:w-28">
              <Image src={item.image} alt={item.title} fill className="object-cover" sizes="112px" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="mt-1 text-muted-foreground">{formatPrice(item.price)}</p>
                </div>
                <button className="text-sm font-semibold text-destructive" onClick={() => removeItem(item.id)}>
                  O&apos;chirish
                </button>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Miqdor</span>
                <div className="flex items-center gap-2">
                  <button className="h-11 w-11 rounded-full border" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    -
                  </button>
                  <span className="min-w-8 text-center font-semibold">{item.quantity}</span>
                  <button className="h-11 w-11 rounded-full border" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-soft">
        <h2 className="text-2xl font-bold">Checkout</h2>
        <p className="mt-2 text-sm text-muted-foreground">Manzil va to&apos;lov turini kiriting.</p>
        <div className="mt-6 space-y-4">
          <Input value={address} onChange={(event) => setAddress(event.target.value)} placeholder="To'liq manzil" />
          <select
            value={paymentMethod}
            onChange={(event) => setPaymentMethod(event.target.value)}
            className="min-h-11 w-full rounded-2xl border bg-white px-4 text-sm"
          >
            <option value="PAYME">Payme</option>
            <option value="CLICK">Click</option>
            <option value="CASH">Naqd</option>
          </select>
          <div className="rounded-3xl bg-secondary p-4">
            <div className="flex items-center justify-between text-sm">
              <span>Jami</span>
              <span className="text-lg font-bold">{formatPrice(total)}</span>
            </div>
          </div>
          <Button className="w-full" onClick={handleCheckout}>
            Buyurtma berish
          </Button>
        </div>
      </div>
    </div>
  );
}
