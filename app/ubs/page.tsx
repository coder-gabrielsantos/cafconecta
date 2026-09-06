'use client';

import Link from 'next/link';
import { Boxes, CalendarClock, ClipboardList, PackageCheck, Plus } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { requests } from '@/data/mock';
import { KPICard } from '@/components/kpi-card';
import { PageHeader } from '@/components/page-header';
import { StatusBadge } from '@/components/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const localRequests = requests.filter((request) => request.unit === 'UBS Dr. Fernando Couto');
const stockTrend = [
  { week: '05/08', total: 3480 }, { week: '12/08', total: 3210 }, { week: '19/08', total: 3060 },
  { week: '26/08', total: 3650 }, { week: '02/09', total: 3428 },
];

export default function UbsDashboard() {
  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="UBS Dr. Fernando Couto"
        title="Visão da unidade"
        description="Estoque, solicitações e recebimentos que precisam da sua atenção."
        actions={<Button render={<Link href="/ubs/solicitacoes/nova" />}><Plus />Nova solicitação</Button>}
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Indicadores da unidade">
        <KPICard label="Estoque disponível" value="3.428" note="52 apresentações em estoque" icon={Boxes} tone="blue" />
        <KPICard label="Aguardando resposta" value="2" note="1 enviada há mais de 24h" icon={ClipboardList} tone="amber" />
        <KPICard label="Próximos do vencimento" value="5" note="Vencem nos próximos 30 dias" icon={CalendarClock} tone="amber" />
        <KPICard label="Último recebimento" value="350" note="SOL-001 · 28/08/2026" icon={PackageCheck} tone="green" />
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(330px,.7fr)]">
        <Card className="border-slate-200/80 shadow-none ring-0">
          <CardHeader className="flex-row items-center justify-between border-b border-slate-100">
            <div><CardTitle className="text-[15px]">Solicitações recentes</CardTitle><p className="mt-1 text-[11px] text-slate-500">Pedidos enviados pela sua unidade</p></div>
            <Button variant="outline" size="sm" render={<Link href="/ubs/solicitacoes" />}>Ver todas</Button>
          </CardHeader>
          <CardContent className="px-0">
            <Table className="responsive-table">
              <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Enviada em</TableHead><TableHead>Itens</TableHead><TableHead>Status</TableHead><TableHead>Aprovada / solicitada</TableHead></TableRow></TableHeader>
              <TableBody>
                {localRequests.map((request) => (
                  <TableRow key={request.id} className="hover:bg-slate-50/70">
                    <TableCell data-label="ID"><Link href={`/ubs/solicitacoes/${request.id}`} className="font-semibold text-[#173b74] hover:underline">{request.id}</Link></TableCell>
                    <TableCell data-label="Data" className="text-slate-500">{request.date}</TableCell>
                    <TableCell data-label="Itens">{request.items}</TableCell>
                    <TableCell data-label="Status"><StatusBadge status={request.status} /></TableCell>
                    <TableCell data-label="Aprovada / solicitada" className="font-medium">{request.approved}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 shadow-none ring-0">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-[15px]">Evolução do estoque</CardTitle>
            <div className="mt-3 flex items-end justify-between"><div><p className="text-[11px] text-slate-500">Saldo atual</p><p className="mt-1 text-2xl font-semibold tracking-[-0.035em]">3.428 <span className="text-xs font-normal text-slate-500">unidades</span></p></div><span className="text-[11px] text-slate-500">Últimas 5 semanas</span></div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ total: { label: 'Estoque', color: '#315f9c' } }} className="min-h-[220px] w-full aspect-auto">
              <AreaChart accessibilityLayer data={stockTrend} margin={{ left: -18, right: 8, top: 12 }}>
                <defs><linearGradient id="stockFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#315f9c" stopOpacity={0.16} /><stop offset="95%" stopColor="#315f9c" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="week" tickLine={false} axisLine={false} fontSize={10} />
                <YAxis tickLine={false} axisLine={false} fontSize={10} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="total" stroke="#315f9c" strokeWidth={2} fill="url(#stockFill)" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
