import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const statusStyles: Record<string, string> = {
  Pendente: 'border-amber-200 bg-amber-50 text-amber-800',
  'Em análise': 'border-[#ccd9ff] bg-[#ecf2ff] text-[#4774ee]',
  Aprovada: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  Parcial: 'border-orange-200 bg-orange-50 text-orange-800',
  Recusada: 'border-red-200 bg-red-50 text-red-700',
  Entregue: 'border-cyan-200 bg-cyan-50 text-cyan-800',
  Recebida: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  Ativo: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  'Convite pendente': 'border-amber-200 bg-amber-50 text-amber-800',
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold',
        statusStyles[status],
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {status}
    </Badge>
  );
}
