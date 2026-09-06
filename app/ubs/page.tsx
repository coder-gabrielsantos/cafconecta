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
    <div className="space-y-6">
      <PageHeader eyebrow="UBS Dr. Fernando Couto" title="Bom dia, Ana Beatriz" description="Acompanhe o estoque e as solicitações da sua unidade." actions={<Button size="lg" render={<Link href="/ubs/solicitacoes/nova" />}><Plus />Nova solicitação</Button>} />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Indicadores da unidade">
        <KPICard label="Meu estoque total" value="3.428" note="52 apresentações disponíveis" icon={Boxes} tone="blue" />
        <KPICard label="Pendentes de resposta" value="2" note="1 enviada há mais de 24h" icon={ClipboardList} tone="amber" />
        <KPICard label="Próximos do vencimento" value="5" note="Vencem nos próximos 30 dias" icon={CalendarClock} tone="amber" />
        <KPICard label="Último recebimento" value="350" note="SOL-001 · 28/08/2026" icon={PackageCheck} tone="green" />
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(340px,.75fr)]">
        <Card className="border-0 shadow-sm ring-1 ring-slate-200/90">
          <CardHeader className="flex-row items-center justify-between border-b"><div><CardTitle className="text-lg">Minhas solicitações</CardTitle><p className="mt-1 text-xs text-slate-500">Movimentações recentes da sua UBS</p></div><Button variant="outline" size="sm" render={<Link href="/ubs/solicitacoes" />}>Ver todas</Button></CardHeader>
          <CardContent className="px-0">
            <Table className="responsive-table"><TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Data de envio</TableHead><TableHead>Itens</TableHead><TableHead>Status</TableHead><TableHead>Aprovada / Solicitada</TableHead></TableRow></TableHeader>
              <TableBody>{localRequests.map((request) => <TableRow key={request.id}><TableCell data-label="ID"><Link href={`/ubs/solicitacoes/${request.id}`} className="font-semibold text-blue-700 hover:underline">{request.id}</Link></TableCell><TableCell data-label="Data">{request.date}</TableCell><TableCell data-label="Itens">{request.items}</TableCell><TableCell data-label="Status"><StatusBadge status={request.status} /></TableCell><TableCell data-label="Aprovada / Solicitada" className="font-medium">{request.approved}</TableCell></TableRow>)}</TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm ring-1 ring-slate-200/90">
          <CardHeader className="border-b"><CardTitle className="text-lg">Evolução do estoque</CardTitle><p className="text-xs text-slate-500">Total de unidades nas últimas semanas</p></CardHeader>
          <CardContent><ChartContainer config={{ total: { label: 'Estoque', color: '#1e40af' } }} className="mt-4 min-h-[260px] w-full aspect-auto"><AreaChart accessibilityLayer data={stockTrend} margin={{ left: -15, right: 8 }}><defs><linearGradient id="stockFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#1e40af" stopOpacity={0.25} /><stop offset="95%" stopColor="#1e40af" stopOpacity={0.02} /></linearGradient></defs><CartesianGrid vertical={false} strokeDasharray="3 3" /><XAxis dataKey="week" tickLine={false} axisLine={false} fontSize={10} /><YAxis tickLine={false} axisLine={false} fontSize={10} /><ChartTooltip content={<ChartTooltipContent />} /><Area type="monotone" dataKey="total" stroke="#1e40af" strokeWidth={2.5} fill="url(#stockFill)" /></AreaChart></ChartContainer></CardContent>
        </Card>
      </div>
    </div>
  );
}
