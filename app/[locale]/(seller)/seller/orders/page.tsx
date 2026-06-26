import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { orderHistory } from "@/lib/mock-data";

export default function SellerOrdersPage() {
  return (
    <div className="container py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Sotuvchi buyurtmalari</h1>
        <p className="mt-2 text-muted-foreground">Qabul qilish, yuborish va holatlarni yangilash uchun navbat.</p>
      </div>
      <div className="grid gap-4">
        {orderHistory.map((order) => (
          <Card key={order.id} className="rounded-3xl border-white/60 bg-white/90 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <div>
                <CardTitle>{order.id}</CardTitle>
                <p className="text-sm text-muted-foreground">{order.address}</p>
              </div>
              <span className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">
                {order.status}
              </span>
            </CardHeader>
            <CardContent className="flex gap-3">
              <button className="min-h-11 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">
                Qabul qilish
              </button>
              <button className="min-h-11 rounded-full border px-5 text-sm font-semibold">Yetkazilmoqda</button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
