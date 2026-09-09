import { cn } from '@/lib/utils';

const statusStyles: Record<string, string> = {
  Pendente: 'text-amber-700',
  'Em análise': 'text-[#4774ee]',
  Aprovada: 'text-emerald-700',
  Parcial: 'text-orange-700',
  Recusada: 'text-red-700',
  Entregue: 'text-cyan-700',
  Recebida: 'text-emerald-700',
  Ativo: 'text-emerald-700',
  'Convite pendente': 'text-amber-700',
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 whitespace-nowrap text-[12px] font-medium',
        statusStyles[status],
      )}
    >
      <span className="size-1.5 rotate-45 bg-current opacity-75" />
      {status}
    </span>
  );
}
