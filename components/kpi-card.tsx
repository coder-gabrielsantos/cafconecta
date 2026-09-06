import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function KPICard({ label, value, note, icon: Icon, tone = 'blue' }: {
  label: string; value: string; note: string; icon: LucideIcon; tone?: 'blue' | 'green' | 'amber' | 'red';
}) {
  const tones = {
    blue: 'bg-slate-100 text-[#173b74]', green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700', red: 'bg-red-50 text-red-700',
  };
  return (
    <Card className="min-w-0 border-slate-200/80 shadow-none ring-0">
      <CardContent className="flex items-start justify-between gap-4 px-5 py-0.5">
        <div className="min-w-0">
          <p className="text-[12px] font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-[26px] font-semibold leading-none tracking-[-0.035em] text-slate-950">{value}</p>
          <p className={cn('mt-2.5 text-[11px] leading-snug', tone === 'red' ? 'text-red-600' : tone === 'amber' ? 'text-amber-700' : tone === 'green' ? 'text-emerald-600' : 'text-slate-500')}>{note}</p>
        </div>
        <span className={cn('grid size-9 shrink-0 place-items-center rounded-lg', tones[tone])}><Icon className="size-[17px]" /></span>
      </CardContent>
    </Card>
  );
}
