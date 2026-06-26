import { Badge } from "@/components/ui/badge";

export function RoleBadge({ role }: { role: "BUYER" | "SELLER" | "ADMIN" }) {
  const variant = role === "ADMIN" ? "accent" : role === "SELLER" ? "secondary" : "default";
  return <Badge variant={variant}>{role}</Badge>;
}
