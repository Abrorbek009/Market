import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
  password: z.string().min(6),
  role: z.enum(["BUYER", "SELLER"])
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const productSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(20),
  price: z.coerce.number().positive(),
  images: z.array(z.string().url()).min(1),
  stock: z.coerce.number().int().min(0),
  categoryId: z.string().min(1),
  status: z.enum(["DRAFT", "PENDING", "APPROVED", "BLOCKED"]).default("PENDING")
});

export const orderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().min(1),
        price: z.number().positive()
      })
    )
    .min(1),
  totalPrice: z.number().positive(),
  address: z.string().min(10),
  paymentMethod: z.enum(["PAYME", "CLICK", "CASH"])
});

export const forgotPasswordSchema = z.object({
  email: z.string().email()
});
