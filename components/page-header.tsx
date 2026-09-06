import type { ReactNode } from 'react';

export function PageHeader({ eyebrow, title, description, actions }: {
  eyebrow?: string; title: string; description: string; actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        {eyebrow && <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[.1em] text-slate-500">{eyebrow}</p>}
        <h1 className="text-[26px] font-semibold leading-tight tracking-[-0.035em] text-slate-950 sm:text-[30px]">{title}</h1>
        <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-slate-500">{description}</p>
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}
