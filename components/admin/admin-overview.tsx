"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { StatsCard } from "@/components/shared/stats-card";
import { dashboardStats } from "@/lib/mock-data";

const adminData = [
  { name: "1-hafta", volume: 28 },
  { name: "2-hafta", volume: 32 },
  { name: "3-hafta", volume: 41 },
  { name: "4-hafta", volume: 48 }
];

export function AdminOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin dashboard</h1>
        <p className="mt-2 text-muted-foreground">Platforma statistikasi va moderatsiya jarayonlarini boshqaring.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {dashboardStats.admin.map((item) => (
          <StatsCard key={item.label} {...item} />
        ))}
      </div>
      <div className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-soft">
        <h2 className="text-2xl font-bold">Oylik o&apos;sish</h2>
        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={adminData}>
              <defs>
                <linearGradient id="growth" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#eb6d2f" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#eb6d2f" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="volume" stroke="#eb6d2f" fill="url(#growth)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
