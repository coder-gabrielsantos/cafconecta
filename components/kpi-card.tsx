import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function KPICard({ label, value, note, icon: Icon, tone = 'blue' }: {
  label: string; value: string; note: string; icon: LucideIcon; tone?: 'blue' | 'green' | 'amber' | 'red';
}) {
  const tones = {
    blue: 'bg-blue-50 text-blue-700', green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700', red: 'bg-red-50 text-red-700',
  };
  return (
    <Card className="min-w-0 border-0 shadow-[0_1px_2px_rgb(15_23_42/5%),0_8px_24px_rgb(15_23_42/4%)] ring-1 ring-slate-200/90">
      <CardContent className="flex items-start justify-between gap-3 px-5 py-1">
        <div className="min-w-0">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{value}</p>
          <p className={cn('mt-2 text-xs font-medium', tone === 'red' ? 'text-red-600' : tone === 'amber' ? 'text-amber-700' : 'text-emerald-600')}>{note}</p>
        </div>
        <span className={cn('grid size-11 shrink-0 place-items-center rounded-xl', tones[tone])}><Icon className="size-5" /></span>
      </CardContent>
    </Card>
  );
}
