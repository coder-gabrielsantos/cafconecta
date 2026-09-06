'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, CircleAlert, MapPin, UserRound } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { Timeline } from '@/components/timeline';
import { StatusBadge } from '@/components/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

const requestedItems = [
  { medicine: 'Soro Fisiológico 0,9% 500mL', requested: 50, available: 370, lot: 'SF2407 · 12/10/2026', suggested: 50 },
  { medicine: 'Insulina NPH 100UI/mL', requested: 20, available: 164, lot: 'IN8932 · 21/11/2026', suggested: 20 },
];

export default function RequestAnalysisPage() {
  const [quantities, setQuantities] = useState(requestedItems.map((item) => item.suggested));
  const [dialog, setDialog] = useState<'partial' | 'reject' | null>(null);
  const [feedback, setFeedback] = useState('');

  const finish = (message: string) => {
    setFeedback(message);
    setDialog(null);
  };

  return (
    <div className="space-y-6">
      <Link href="/caf/solicitacoes" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-700"><ArrowLeft className="size-4" />Voltar às solicitações</Link>
      <PageHeader eyebrow="Análise de solicitação" title="SOL-003" description="Revise as quantidades e selecione os lotes antes de tomar uma decisão." actions={<StatusBadge status="Em análise" />} />

      {feedback && <div role="status" className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"><CheckCircle2 className="size-5" />{feedback}</div>}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_360px]">
        <div className="space-y-6">
          <Card className="border-0 shadow-sm ring-1 ring-slate-200/90">
            <CardHeader className="border-b"><CardTitle className="text-lg">Dados da solicitação</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div><p className="text-xs text-slate-500">UBS de origem</p><p className="mt-1 flex items-center gap-2 font-medium"><MapPin className="size-4 text-blue-700" />UBS Zona Rural I</p></div>
              <div><p className="text-xs text-slate-500">Responsável</p><p className="mt-1 flex items-center gap-2 font-medium"><UserRound className="size-4 text-blue-700" />Juliana Sousa</p></div>
              <div><p className="text-xs text-slate-500">Data do envio</p><p className="mt-1 font-medium">02/09/2026 · 14:32</p></div>
              <div><p className="text-xs text-slate-500">Prioridade</p><p className="mt-1 font-medium text-amber-700">Reposição regular</p></div>
              <div className="sm:col-span-2 lg:col-span-4"><p className="text-xs text-slate-500">Observação</p><p className="mt-1 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">Aumento da demanda nas comunidades atendidas pela equipe rural durante a campanha de vacinação.</p></div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm ring-1 ring-slate-200/90">
            <CardHeader className="border-b"><CardTitle className="text-lg">Itens solicitados</CardTitle><p className="text-xs text-slate-500">Lotes sugeridos automaticamente pela regra FEFO.</p></CardHeader>
            <CardContent className="px-0">
              <Table className="responsive-table"><TableHeader><TableRow><TableHead>Medicamento</TableHead><TableHead>Solicitada</TableHead><TableHead>Disponível CAF</TableHead><TableHead className="w-32">A aprovar</TableHead><TableHead>Lote sugerido</TableHead></TableRow></TableHeader>
                <TableBody>{requestedItems.map((item, index) => <TableRow key={item.medicine}><TableCell data-label="Medicamento" className="font-medium">{item.medicine}</TableCell><TableCell data-label="Solicitada">{item.requested} un.</TableCell><TableCell data-label="Disponível"><span className="text-emerald-700">{item.available} un.</span></TableCell><TableCell data-label="A aprovar"><Input aria-label={`Quantidade a aprovar de ${item.medicine}`} type="number" min={0} max={item.available} value={quantities[index]} onChange={(event) => setQuantities((current) => current.map((value, itemIndex) => itemIndex === index ? Number(event.target.value) : value))} className="h-9 w-24" /></TableCell><TableCell data-label="Lote"><span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-800">{item.lot}</span></TableCell></TableRow>)}</TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3 rounded-xl border bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="font-semibold">Decisão da análise</p><p className="text-xs text-slate-500">A ação será registrada no histórico de auditoria.</p></div>
            <div className="flex flex-wrap gap-2"><Button variant="destructive" onClick={() => setDialog('reject')}>Recusar</Button><Button variant="outline" className="border-amber-300 text-amber-800" onClick={() => setDialog('partial')}>Aprovar parcialmente</Button><Button onClick={() => finish('Solicitação aprovada integralmente. A separação de lotes foi iniciada.')}>Aprovar integralmente</Button></div>
          </div>
        </div>

        <Card className="h-fit border-0 shadow-sm ring-1 ring-slate-200/90">
          <CardHeader className="border-b"><CardTitle className="text-lg">Histórico de status</CardTitle></CardHeader>
          <CardContent><Timeline items={[{ title: 'Solicitação enviada', detail: '02/09/2026, 14:32 · Juliana Sousa', done: true }, { title: 'Triagem automática concluída', detail: 'Estoque e lotes verificados', done: true }, { title: 'Em análise pela CAF', detail: 'Desde 03/09/2026, 08:10', current: true }, { title: 'Separação e expedição', detail: 'Aguardando decisão' }, { title: 'Recebimento pela UBS', detail: 'Etapa final' }]} /></CardContent>
        </Card>
      </div>

      <Dialog open={dialog !== null} onOpenChange={(open) => { if (!open) setDialog(null); }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>{dialog === 'reject' ? 'Recusar solicitação' : 'Aprovar parcialmente'}</DialogTitle><DialogDescription>{dialog === 'reject' ? 'Informe o motivo da recusa para orientar a UBS.' : 'Explique por que a quantidade será atendida parcialmente.'}</DialogDescription></DialogHeader>
          <div className="space-y-2"><Label htmlFor="justification">Justificativa obrigatória</Label><Textarea id="justification" placeholder="Descreva a justificativa de forma clara…" className="min-h-28" /></div>
          <DialogFooter><Button variant="outline" onClick={() => setDialog(null)}>Cancelar</Button><Button variant={dialog === 'reject' ? 'destructive' : 'default'} onClick={() => finish(dialog === 'reject' ? 'Solicitação recusada e UBS notificada.' : 'Aprovação parcial registrada e UBS notificada.')}>Confirmar decisão</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
