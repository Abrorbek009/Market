import type { ProductCardItem } from "@/lib/types";

export const categories = [
  {
    id: "cat-tech",
    name: "Elektronika",
    slug: "elektronika",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "cat-fashion",
    name: "Moda",
    slug: "moda",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "cat-home",
    name: "Uy uchun",
    slug: "uy-uchun",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
  }
] as const;

export const featuredProducts: ProductCardItem[] = [
  {
    id: "prod-1",
    title: "Wireless Headphones Pro",
    description: "Shovqinni bekor qiluvchi premium quloqchin, 30 soat batareya.",
    price: 899000,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80"
    ],
    stock: 12,
    rating: 4.8,
    reviewCount: 128,
    category: {
      id: "cat-tech",
      name: "Elektronika",
      slug: "elektronika"
    },
    seller: {
      id: "seller-1",
      name: "Audio Mart"
    },
    status: "APPROVED"
  },
  {
    id: "prod-2",
    title: "Minimal Leather Bag",
    description: "Kundalik foydalanish uchun ixcham va mustahkam charm sumka.",
    price: 549000,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80"
    ],
    stock: 7,
    rating: 4.6,
    reviewCount: 54,
    category: {
      id: "cat-fashion",
      name: "Moda",
      slug: "moda"
    },
    seller: {
      id: "seller-2",
      name: "Style Point"
    },
    status: "APPROVED"
  },
  {
    id: "prod-3",
    title: "Nordic Lamp Set",
    description: "Skandinaviya uslubidagi yorug'lik to'plami, zamonaviy interyer uchun.",
    price: 729000,
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
    ],
    stock: 15,
    rating: 4.9,
    reviewCount: 77,
    category: {
      id: "cat-home",
      name: "Uy uchun",
      slug: "uy-uchun"
    },
    seller: {
      id: "seller-3",
      name: "Home Atmos"
    },
    status: "APPROVED"
  }
];

export const dashboardStats = {
  seller: [
    { label: "Bugungi savdo", value: "12", helper: "+18% kechagidan" },
    { label: "Daromad", value: "7.2 mln", helper: "To'lovlar kelmoqda" },
    { label: "Kutilayotgan buyurtma", value: "9", helper: "Tezkor qayta ishlash" }
  ],
  admin: [
    { label: "Faol foydalanuvchi", value: "2,431", helper: "So'nggi 30 kun" },
    { label: "Tasdiqlanadigan mahsulot", value: "16", helper: "Moderatsiya navbati" },
    { label: "Aylanish", value: "128 mln", helper: "Ushbu oy" }
  ]
};

export const orderHistory = [
  {
    id: "order-1",
    status: "SHIPPED",
    totalPrice: 1448000,
    paymentMethod: "PAYME",
    address: "Toshkent sh., Chilonzor tumani, 15-kvartal",
    createdAt: "2026-06-20"
  },
  {
    id: "order-2",
    status: "PROCESSING",
    totalPrice: 549000,
    paymentMethod: "CLICK",
    address: "Samarqand sh., Universitet ko'chasi, 22",
    createdAt: "2026-06-24"
  }
];
