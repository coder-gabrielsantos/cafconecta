'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, PackageCheck, Truck } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { Timeline } from '@/components/timeline';
import { StatusBadge } from '@/components/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const deliveryItems = [
  { name: 'Azitromicina 500mg Comprimido', approved: 40, lot: 'AZ2406', validity: '18/01/2027' },
  { name: 'Paracetamol 500mg Comprimido', approved: 120, lot: 'PA1187', validity: '02/12/2026' },
];

export default function ReceivingPage() {
  const [checked, setChecked] = useState<boolean[]>([false, false]);
  const [received, setReceived] = useState<number[]>(deliveryItems.map((item) => item.approved));
  const [feedback, setFeedback] = useState('');
  const allChecked = checked.every(Boolean);
  const hasDifference = received.some((quantity, index) => quantity !== deliveryItems[index].approved);

  return (
    <div className="space-y-6">
      <Link href="/ubs/solicitacoes" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-700"><ArrowLeft className="size-4" />Voltar às solicitações</Link>
      <PageHeader eyebrow="Conferência de entrega" title="SOL-006" description="Confira cada item entregue antes de incorporar as quantidades ao estoque da UBS." actions={<StatusBadge status="Entregue" />} />
      {feedback && <div role="status" className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"><CheckCircle2 className="size-5" />{feedback}</div>}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_360px]">
        <div className="space-y-6">
          <Card className="border-0 shadow-sm ring-1 ring-slate-200/90">
            <CardHeader className="flex-row items-center justify-between border-b"><div><CardTitle className="text-lg">Itens entregues</CardTitle><p className="mt-1 text-xs text-slate-500">Marque cada item após conferir produto, lote, validade e quantidade.</p></div><span className="hidden rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-800 sm:inline-flex"><Truck className="mr-2 size-4" />Entregue hoje, 08:05</span></CardHeader>
            <CardContent className="space-y-3">
              {deliveryItems.map((item, index) => <div key={item.name} className={`rounded-xl border p-4 transition-colors ${checked[index] ? 'border-emerald-200 bg-emerald-50/50' : 'bg-white'}`}><div className="flex items-start gap-3"><Checkbox checked={checked[index]} onCheckedChange={(value) => setChecked((current) => current.map((state, itemIndex) => itemIndex === index ? Boolean(value) : state))} aria-label={`Conferir ${item.name}`} className="mt-1" /><div className="min-w-0 flex-1"><div className="flex flex-col justify-between gap-2 sm:flex-row"><div><p className="font-semibold text-slate-900">{item.name}</p><p className="mt-1 text-xs text-slate-500">Lote {item.lot} · Validade {item.validity}</p></div><span className="text-xs font-medium text-slate-500">Aprovado: <strong className="text-slate-800">{item.approved} un.</strong></span></div><div className="mt-4 flex items-center justify-between border-t pt-3"><Label htmlFor={`received-${index}`} className="text-xs">Quantidade recebida</Label><Input id={`received-${index}`} type="number" min={0} max={item.approved} value={received[index]} onChange={(event) => setReceived((current) => current.map((quantity, itemIndex) => itemIndex === index ? Number(event.target.value) : quantity))} className="h-9 w-24" /></div></div></div></div>)}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm ring-1 ring-slate-200/90">
            <CardHeader className="border-b"><CardTitle className="text-lg">Divergências ou avarias</CardTitle></CardHeader>
            <CardContent className="space-y-2"><Label htmlFor="damage">Registro da conferência {hasDifference && <span className="text-red-600">(obrigatório)</span>}</Label><Textarea id="damage" className="min-h-28" placeholder="Descreva embalagem avariada, quantidade divergente ou outra ocorrência. Se estiver tudo certo, deixe em branco." /></CardContent>
          </Card>

          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="font-semibold text-blue-950">Finalizar conferência</p><p className="mt-1 text-xs text-blue-800">Ao confirmar, {received.reduce((total, quantity) => total + quantity, 0)} unidades serão adicionadas ao estoque local.</p></div><Button size="lg" disabled={!allChecked} onClick={() => setFeedback('Recebimento confirmado. O estoque da UBS foi atualizado automaticamente.')}><PackageCheck />Confirmar recebimento</Button></div>{!allChecked && <p className="mt-3 text-xs font-medium text-amber-800">Confira todos os itens para habilitar a confirmação.</p>}</div>
        </div>

        <Card className="h-fit border-0 shadow-sm ring-1 ring-slate-200/90">
          <CardHeader className="border-b"><CardTitle className="text-lg">Histórico de status</CardTitle></CardHeader>
          <CardContent><Timeline items={[{ title: 'Solicitação enviada', detail: '18/08/2026 · Ana Beatriz', done: true }, { title: 'Aprovada pela CAF', detail: '19/08/2026 · Helena Ribeiro', done: true }, { title: 'Separada para expedição', detail: '20/08/2026 · Lotes conferidos', done: true }, { title: 'Entregue na UBS', detail: 'Hoje, 08:05 · Paulo Martins', done: true }, { title: 'Confirmar recebimento', detail: 'Aguardando sua conferência', current: true }]} /></CardContent>
        </Card>
      </div>
    </div>
  );
}
