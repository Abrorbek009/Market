import { EmptyState } from "@/components/shared/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { orderHistory } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

export default function OrdersPage() {
  if (!orderHistory.length) {
    return (
      <div className="container py-10">
        <EmptyState title="Buyurtmalar topilmadi" description="Hali buyurtmalar yaratilmagan." />
      </div>
    );
  }

  return (
    <div className="container space-y-4 py-10">
      <div>
        <h1 className="text-3xl font-bold">Buyurtmalar tarixi</h1>
        <p className="mt-2 text-muted-foreground">Buyurtmalaringiz holatini real vaqtga yaqin tarzda kuzating.</p>
      </div>
      <div className="grid gap-4">
        {orderHistory.map((order) => (
          <Card key={order.id} className="rounded-3xl border-white/60 bg-white/90 shadow-soft">
            <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>{order.id}</CardTitle>
                <p className="text-sm text-muted-foreground">{order.createdAt}</p>
              </div>
              <span className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">
                {order.status}
              </span>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm md:grid-cols-3">
              <div>
                <p className="text-muted-foreground">To&apos;lov</p>
                <p className="font-semibold">{order.paymentMethod}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Manzil</p>
                <p className="font-semibold">{order.address}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Jami</p>
                <p className="font-semibold">{formatPrice(order.totalPrice)}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
