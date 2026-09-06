'use client';

import Link from 'next/link';
import { AlertTriangle, CalendarClock, ClipboardList, FileBarChart, PackageCheck } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { requests, volumeByUnit } from '@/data/mock';
import { KPICard } from '@/components/kpi-card';
import { PageHeader } from '@/components/page-header';
import { StatusBadge } from '@/components/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function CafDashboard() {
  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Central de Abastecimento Farmacêutico"
        title="Visão geral"
        description="O que precisa da sua atenção hoje na operação da rede."
        actions={
          <>
            <div className="hidden items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 lg:flex">
              <span className="size-1.5 rounded-full bg-emerald-500" />7 UBS conectadas
            </div>
            <Button variant="outline" render={<Link href="/caf/relatorios" />}><FileBarChart />Relatórios</Button>
          </>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Indicadores principais">
        <KPICard label="Solicitações pendentes" value="12" note="4 aguardam há mais de 24h" icon={ClipboardList} tone="amber" />
        <KPICard label="Estoque crítico" value="7" note="3 itens sem cobertura" icon={AlertTriangle} tone="red" />
        <KPICard label="Vencimento em 30 dias" value="18" note="6 lotes precisam de atenção" icon={CalendarClock} tone="amber" />
        <KPICard label="Distribuído no mês" value="4.410" note="+8,2% em relação a agosto" icon={PackageCheck} tone="blue" />
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(330px,.75fr)]">
        <Card className="border-slate-200/80 shadow-none ring-0">
          <CardHeader className="flex-row items-center justify-between border-b border-slate-100 px-5 pb-4">
            <div>
              <CardTitle className="text-[15px] font-semibold">Solicitações recentes</CardTitle>
              <p className="mt-1 text-[11px] text-slate-500">Ordenadas pela atividade mais recente</p>
            </div>
            <Button variant="outline" size="sm" render={<Link href="/caf/solicitacoes" />}>Ver todas</Button>
          </CardHeader>
          <CardContent className="px-0">
            <Table className="responsive-table">
              <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>UBS origem</TableHead><TableHead>Responsável</TableHead><TableHead>Itens</TableHead><TableHead>Status</TableHead><TableHead>Data</TableHead></TableRow></TableHeader>
              <TableBody>
                {requests.slice(0, 5).map((request) => (
                  <TableRow key={request.id} className="hover:bg-slate-50/70">
                    <TableCell data-label="ID"><Link className="font-semibold text-[#173b74] hover:underline" href={`/caf/solicitacoes/${request.id}`}>{request.id}</Link></TableCell>
                    <TableCell data-label="UBS" className="font-medium text-slate-700">{request.unit.replace('UBS ', '')}</TableCell>
                    <TableCell data-label="Responsável" className="text-slate-500">{request.owner}</TableCell>
                    <TableCell data-label="Itens">{request.items}</TableCell>
                    <TableCell data-label="Status"><StatusBadge status={request.status} /></TableCell>
                    <TableCell data-label="Data" className="text-slate-500">{request.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 shadow-none ring-0">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-[15px] font-semibold">Distribuição por UBS</CardTitle>
            <div className="mt-3 flex items-end justify-between">
              <div><p className="text-[11px] text-slate-500">Total em setembro</p><p className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-slate-950">4.410 <span className="text-xs font-normal text-slate-500">unidades</span></p></div>
              <span className="text-[11px] font-medium text-emerald-700">+8,2%</span>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ volume: { label: 'Unidades', color: '#315f9c' } }} className="min-h-[245px] w-full aspect-auto">
              <BarChart accessibilityLayer data={volumeByUnit.slice(0, 5)} layout="vertical" margin={{ left: 0, right: 12, top: 4, bottom: 4 }}>
                <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                <XAxis type="number" hide />
                <YAxis dataKey="unit" type="category" tickLine={false} axisLine={false} width={88} fontSize={10} />
                <ChartTooltip cursor={{ fill: '#f1f5f9' }} content={<ChartTooltipContent />} />
                <Bar dataKey="volume" fill="var(--color-volume)" radius={[0, 5, 5, 0]} barSize={12} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
