import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight, CheckCircle2, Pill, Warehouse } from 'lucide-react';
import type { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export function DashboardHero({
  eyebrow,
  title,
  description,
  metric,
  metricLabel,
  action,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  action: ReactNode;
  icon: LucideIcon;
}) {
  return (
    <section
      className="relative min-h-[220px] overflow-hidden rounded-[10px] bg-[#ecf2ff] px-6 py-7 sm:px-8"
      aria-labelledby="dashboard-welcome"
    >
      <div className="relative z-10 max-w-[58%] sm:max-w-[62%] lg:max-w-[54%]">
        <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#5d87ff]">
          {eyebrow}
        </p>
        <h1
          id="dashboard-welcome"
          className="mt-2 text-[24px] font-bold leading-[1.16] tracking-[-0.035em] text-[#2a3547] sm:text-[27px]"
        >
          {title}
        </h1>
        <p className="mt-3 max-w-lg text-[12px] leading-relaxed text-[#7c8fac] sm:text-[13px]">
          {description}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <div>
            <p className="text-[22px] font-bold tracking-[-0.03em] text-[#2a3547]">
              {metric}
            </p>
            <p className="text-[10px] font-semibold text-[#7c8fac]">
              {metricLabel}
            </p>
          </div>
          <div className="mx-1 hidden h-9 w-px bg-[#d9e4fb] sm:block" />
          {action}
        </div>
      </div>

      <div className="absolute -bottom-7 -right-8 size-48 rounded-full bg-[#dbe7ff] sm:right-2 sm:size-56" />
      <div className="absolute bottom-0 right-1 grid h-[190px] w-[43%] place-items-center sm:right-5 sm:w-[38%]">
        <div className="relative grid size-24 place-items-center rounded-[12px] bg-[#5d87ff] text-white shadow-[0_18px_45px_rgb(93_135_255/0.3)] sm:size-28">
          <Icon className="size-11 sm:size-12" strokeWidth={1.65} />
          <span className="absolute -right-3 -top-3 grid size-9 place-items-center rounded-xl bg-white text-[#13b99a] shadow-lg">
            <CheckCircle2 className="size-[18px]" />
          </span>
          <span className="absolute -bottom-3 -left-5 grid size-10 -rotate-12 place-items-center rounded-xl bg-white text-[#49beff] shadow-lg">
            <Pill className="size-5" />
          </span>
          <span className="absolute -right-7 bottom-3 grid size-10 rotate-6 place-items-center rounded-xl bg-[#fff6e5] text-[#e79500] shadow-lg">
            <Warehouse className="size-5" />
          </span>
        </div>
      </div>
    </section>
  );
}

export function GoalCard({
  label,
  value,
  progress,
  note,
  icon: Icon,
}: {
  label: string;
  value: string;
  progress: number;
  note: string;
  icon: LucideIcon;
}) {
  return (
    <Card className="border-0 bg-[#5d87ff] text-white shadow-[0_12px_28px_rgb(93_135_255/0.22)]!">
      <CardContent className="flex min-h-[128px] flex-col justify-between px-6 py-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[25px] font-bold tracking-[-0.03em]">{value}</p>
            <p className="mt-0.5 text-xs font-semibold text-white/75">
              {label}
            </p>
          </div>
          <span className="grid size-10 place-items-center rounded-xl bg-white/12">
            <Icon className="size-5" />
          </span>
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between text-[10px] font-semibold text-white/80">
            <span>{note}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CoverageRing({
  value,
  label,
  detail,
}: {
  value: number;
  label: string;
  detail: string;
}) {
  return (
    <Card>
      <CardContent className="flex min-h-[128px] items-center gap-5 px-5 py-1">
        <div
          className="relative grid size-[86px] shrink-0 place-items-center rounded-full"
          style={{
            background: `conic-gradient(#5d87ff 0 ${value * 0.62}%, #49beff ${value * 0.62}% ${value * 0.84}%, #13deb9 ${value * 0.84}% ${value}%, #edf2f7 ${value}% 100%)`,
          }}
        >
          <div className="grid size-[67px] place-items-center rounded-full bg-white">
            <span className="text-lg font-bold tracking-[-0.03em] text-[#2a3547]">
              {value}%
            </span>
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-[#2a3547]">{label}</p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-[#7c8fac]">
            {detail}
          </p>
          <p className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-[#0aae91]">
            <ArrowUpRight className="size-3" /> dentro da meta
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function CardHeading({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex min-w-0 items-start justify-between gap-4">
      <div className="min-w-0">
        <h2 className="text-[16px] font-bold text-[#2a3547]">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-[11px] text-[#7c8fac]">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}
