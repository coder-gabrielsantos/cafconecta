import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function KPICard({
  label,
  value,
  note,
  icon: Icon,
  tone = 'blue',
}: {
  label: string;
  value: string;
  note: string;
  icon: LucideIcon;
  tone?: 'blue' | 'green' | 'amber' | 'red';
}) {
  const tones = {
    blue: 'bg-[#ecf2ff] text-[#5d87ff]',
    green: 'bg-[#e8fbf7] text-[#0aae91]',
    amber: 'bg-[#fff6e5] text-[#e79500]',
    red: 'bg-[#fff0ec] text-[#e96b4d]',
  };
  const notes = {
    blue: 'text-[#5d87ff]',
    green: 'text-[#0aae91]',
    amber: 'text-[#d88d00]',
    red: 'text-[#e06043]',
  };
  return (
    <Card className="min-w-0 transition-transform duration-200 hover:-translate-y-0.5">
      <CardContent className="flex min-h-[128px] items-start justify-between gap-4 px-5 py-1.5 sm:px-6">
        <div className="min-w-0">
          <p className="text-[12px] font-semibold text-[#7c8fac]">{label}</p>
          <p className="mt-2.5 text-[28px] font-bold leading-none tracking-[-0.035em] text-[#2a3547]">
            {value}
          </p>
          <p
            className={cn(
              'mt-3 text-[11px] font-semibold leading-snug',
              notes[tone],
            )}
          >
            {note}
          </p>
        </div>
        <span
          className={cn(
            'grid size-11 shrink-0 place-items-center rounded-xl',
            tones[tone],
          )}
        >
          <Icon className="size-5" strokeWidth={1.9} />
        </span>
      </CardContent>
    </Card>
  );
}
