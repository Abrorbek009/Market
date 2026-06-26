"use client";

import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { StatsCard } from "@/components/shared/stats-card";
import { dashboardStats } from "@/lib/mock-data";

const salesData = [
  { name: "Du", sales: 4 },
  { name: "Se", sales: 7 },
  { name: "Cho", sales: 6 },
  { name: "Pa", sales: 9 },
  { name: "Ju", sales: 8 },
  { name: "Sha", sales: 12 },
  { name: "Ya", sales: 10 }
];

export function SellerOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Seller dashboard</h1>
        <p className="mt-2 text-muted-foreground">Savdo, daromad va buyurtmalar oqimini bir joyda kuzating.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {dashboardStats.seller.map((item) => (
          <StatsCard key={item.label} {...item} />
        ))}
      </div>
      <div className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-soft">
        <h2 className="text-2xl font-bold">Haftalik sotuvlar</h2>
        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#eb6d2f" radius={[16, 16, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
