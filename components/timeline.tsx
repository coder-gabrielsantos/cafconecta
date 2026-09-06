import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Timeline({ items }: { items: { title: string; detail: string; done?: boolean; current?: boolean }[] }) {
  return (
    <ol className="space-y-0" aria-label="Histórico da solicitação">
      {items.map((item, index) => (
        <li key={item.title} className="relative flex gap-3 pb-5 last:pb-0">
          {index < items.length - 1 && <span className="absolute left-[13px] top-7 h-[calc(100%-1.25rem)] w-px bg-slate-200" />}
          <span className={cn('relative z-10 grid size-7 shrink-0 place-items-center rounded-full border-2 bg-white', item.done ? 'border-emerald-500 bg-emerald-500 text-white' : item.current ? 'border-blue-700 text-blue-700' : 'border-slate-200 text-slate-400')}>
            {item.done ? <Check className="size-3.5" /> : <span className="size-1.5 rounded-full bg-current" />}
          </span>
          <div className="pt-0.5"><p className="text-sm font-semibold text-slate-800">{item.title}</p><p className="mt-0.5 text-xs text-slate-500">{item.detail}</p></div>
        </li>
      ))}
    </ol>
  );
}
