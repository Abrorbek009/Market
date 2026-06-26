export type ProductCardItem = {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  seller: {
    id: string;
    name: string;
  };
  status: "DRAFT" | "PENDING" | "APPROVED" | "BLOCKED";
};
