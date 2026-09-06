'use client';

import Link from 'next/link';
import { AlertTriangle, Building2, CalendarClock, ClipboardList, PackageCheck } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { requests, volumeByUnit } from '@/data/mock';
import { KPICard } from '@/components/kpi-card';
import { StatusBadge } from '@/components/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function CafDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[.14em] text-blue-700">Central de Abastecimento Farmacêutico</p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Visão geral da operação</h1>
          <p className="mt-1 text-sm text-slate-500">Acompanhe solicitações, estoques e distribuição das 7 UBS.</p>
        </div>
        <Button size="lg" render={<Link href="/caf/relatorios" />}>Gerar relatório</Button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5" aria-label="Indicadores principais">
        <KPICard label="Solicitações pendentes" value="12" note="4 aguardam há mais de 24h" icon={ClipboardList} tone="amber" />
        <KPICard label="Vencimento em 30 dias" value="18" note="6 lotes precisam de atenção" icon={CalendarClock} tone="amber" />
        <KPICard label="Estoque crítico" value="7" note="3 itens sem cobertura" icon={AlertTriangle} tone="red" />
        <KPICard label="UBS ativas" value="7/7" note="Todas sincronizadas" icon={Building2} tone="green" />
        <KPICard label="Distribuído no mês" value="4.410" note="+8,2% vs. agosto" icon={PackageCheck} tone="blue" />
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(340px,.8fr)]">
        <Card className="border-0 shadow-sm ring-1 ring-slate-200/90">
          <CardHeader className="flex-row items-center justify-between border-b px-5 pb-4">
            <div><CardTitle className="text-lg font-semibold">Solicitações recentes</CardTitle><p className="mt-1 text-xs text-slate-500">Últimas movimentações entre UBS e CAF</p></div>
            <Button variant="outline" size="sm" render={<Link href="/caf/solicitacoes" />}>Ver todas</Button>
          </CardHeader>
          <CardContent className="px-0">
            <Table className="responsive-table">
              <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>UBS origem</TableHead><TableHead>Responsável</TableHead><TableHead>Itens</TableHead><TableHead>Status</TableHead><TableHead>Data</TableHead></TableRow></TableHeader>
              <TableBody>{requests.slice(0, 6).map((request) => <TableRow key={request.id} className="hover:bg-slate-50/80"><TableCell data-label="ID"><Link className="font-semibold text-blue-700 hover:underline" href={`/caf/solicitacoes/${request.id}`}>{request.id}</Link></TableCell><TableCell data-label="UBS" className="font-medium text-slate-700">{request.unit.replace('UBS ', '')}</TableCell><TableCell data-label="Responsável" className="text-slate-600">{request.owner}</TableCell><TableCell data-label="Itens">{request.items}</TableCell><TableCell data-label="Status"><StatusBadge status={request.status} /></TableCell><TableCell data-label="Data" className="text-slate-500">{request.date}</TableCell></TableRow>)}</TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm ring-1 ring-slate-200/90">
          <CardHeader className="border-b"><CardTitle className="text-lg font-semibold">Volume por UBS</CardTitle><p className="text-xs text-slate-500">Unidades distribuídas em setembro</p></CardHeader>
          <CardContent>
            <ChartContainer config={{ volume: { label: 'Unidades', color: '#1e40af' } }} className="mt-3 min-h-[285px] w-full aspect-auto">
              <BarChart accessibilityLayer data={volumeByUnit} margin={{ left: -18, right: 4, top: 8 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="unit" tickLine={false} axisLine={false} interval={0} angle={-28} textAnchor="end" height={70} fontSize={10} />
                <YAxis tickLine={false} axisLine={false} fontSize={10} />
                <ChartTooltip cursor={{ fill: '#eff6ff' }} content={<ChartTooltipContent />} />
                <Bar dataKey="volume" fill="var(--color-volume)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ChartContainer>
            <div className="mt-2 flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2.5 text-xs"><span className="text-blue-800">Total no período</span><strong className="text-blue-950">4.410 unidades</strong></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
