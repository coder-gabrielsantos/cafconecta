import type { ReactNode } from 'react';

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        {eyebrow && (
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[.13em] text-[#5d87ff]">
            {eyebrow}
          </p>
        )}
        <h1 className="text-[25px] font-bold leading-tight tracking-[-0.025em] text-[#2a3547] sm:text-[28px]">
          {title}
        </h1>
        <p className="mt-1.5 max-w-3xl text-[13px] leading-relaxed text-[#7c8fac] sm:text-sm">
          {description}
        </p>
      </div>
      {actions && (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}
