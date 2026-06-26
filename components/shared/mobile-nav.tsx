"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const links = [
  { href: "", label: "Bosh sahifa" },
  { href: "/products", label: "Mahsulotlar" },
  { href: "/cart", label: "Savatcha" },
  { href: "/seller/dashboard", label: "Seller" },
  { href: "/admin/dashboard", label: "Admin" }
];

export function MobileNav({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button size="icon" variant="outline" onClick={() => setOpen((value) => !value)} aria-label="Open menu">
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
      {open ? (
        <div className="absolute left-4 right-4 top-20 rounded-[2rem] border border-white/60 bg-white/95 p-4 shadow-soft">
          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium hover:bg-secondary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
