import { Card, CardContent } from "@/components/ui/card";

export function StatsCard({ label, value, helper }: { label: string; value: string; helper: string }) {
  return (
    <Card className="border-white/60 bg-white/90 shadow-soft">
      <CardContent className="space-y-2 p-6">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm text-primary">{helper}</p>
      </CardContent>
    </Card>
  );
}
