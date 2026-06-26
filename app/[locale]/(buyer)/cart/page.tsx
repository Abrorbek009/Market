import { CartClient } from "@/components/buyer/cart-client";

export default function CartPage({
  params
}: {
  params: { locale: string };
}) {
  return (
    <div className="container py-10">
      <CartClient locale={params.locale} />
    </div>
  );
}
