'use client';

import Link from 'next/link';
import {
  Boxes,
  CalendarClock,
  ClipboardList,
  Hospital,
  PackageCheck,
  Plus,
  Target,
} from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { requests } from '@/data/mock';
import {
  CardHeading,
  CoverageRing,
  DashboardHero,
  GoalCard,
} from '@/components/dashboard-widgets';
import { KPICard } from '@/components/kpi-card';
import { StatusBadge } from '@/components/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const localRequests = requests.filter(
  (request) => request.unit === 'UBS Dr. Fernando Couto',
);
const stockTrend = [
  { week: '05/08', total: 3480 },
  { week: '12/08', total: 3210 },
  { week: '19/08', total: 3060 },
  { week: '26/08', total: 3650 },
  { week: '02/09', total: 3428 },
];

export default function UbsDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,.8fr)]">
        <DashboardHero
          eyebrow="UBS Dr. Fernando Couto"
          title="Bom dia, Ana! Sua unidade está abastecida."
          description="Revise os itens próximos do vencimento e acompanhe os pedidos enviados à Central de Abastecimento."
          metric="3.428 un."
          metricLabel="52 apresentações em estoque"
          icon={Hospital}
          action={
            <Button size="sm" render={<Link href="/ubs/solicitacoes/nova" />}>
              <Plus />
              Nova solicitação
            </Button>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
          <GoalCard
            label="Cobertura do estoque"
            value="41 dias"
            progress={82}
            note="Meta de 50 dias"
            icon={Target}
          />
          <CoverageRing
            value={92}
            label="Itens regulares"
            detail="48 de 52 apresentações estão em nível seguro."
          />
        </div>
      </div>

      <section
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Indicadores da unidade"
      >
        <KPICard
          label="Estoque disponível"
          value="3.428"
          note="52 apresentações cadastradas"
          icon={Boxes}
          tone="blue"
        />
        <KPICard
          label="Aguardando resposta"
          value="2"
          note="1 enviada há mais de 24h"
          icon={ClipboardList}
          tone="amber"
        />
        <KPICard
          label="Próximos do vencimento"
          value="5"
          note="Vencem nos próximos 30 dias"
          icon={CalendarClock}
          tone="red"
        />
        <KPICard
          label="Último recebimento"
          value="350"
          note="SOL-001 · 28/08/2026"
          icon={PackageCheck}
          tone="green"
        />
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(330px,.7fr)]">
        <Card>
          <CardHeader className="border-b border-[#edf1f6] pb-5">
            <CardHeading
              title="Solicitações recentes"
              subtitle="Pedidos enviados pela sua unidade"
              action={
                <Button
                  variant="outline"
                  size="sm"
                  render={<Link href="/ubs/solicitacoes" />}
                >
                  Ver todas
                </Button>
              }
            />
          </CardHeader>
          <CardContent className="px-0">
            <Table className="responsive-table">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Enviada em</TableHead>
                  <TableHead>Itens</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aprovada / solicitada</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {localRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell data-label="ID">
                      <Link
                        href={`/ubs/solicitacoes/${request.id}`}
                        className="font-bold text-[#5d87ff] hover:underline"
                      >
                        {request.id}
                      </Link>
                    </TableCell>
                    <TableCell data-label="Data">{request.date}</TableCell>
                    <TableCell data-label="Itens">{request.items}</TableCell>
                    <TableCell data-label="Status">
                      <StatusBadge status={request.status} />
                    </TableCell>
                    <TableCell
                      data-label="Aprovada / solicitada"
                      className="font-semibold text-[#2a3547]"
                    >
                      {request.approved}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-[#edf1f6] pb-5">
            <CardHeading
              title="Evolução do estoque"
              subtitle="Saldo das últimas cinco semanas"
              action={
                <span className="rounded-full bg-[#ecf2ff] px-2.5 py-1 text-[10px] font-bold text-[#5d87ff]">
                  Atualizado hoje
                </span>
              }
            />
            <p className="mt-3 text-[24px] font-bold tracking-[-0.035em] text-[#2a3547]">
              3.428{' '}
              <span className="text-xs font-normal text-[#7c8fac]">
                unidades
              </span>
            </p>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{ total: { label: 'Estoque', color: '#5d87ff' } }}
              className="min-h-[220px] w-full aspect-auto"
            >
              <AreaChart
                accessibilityLayer
                data={stockTrend}
                margin={{ left: -18, right: 8, top: 12 }}
              >
                <defs>
                  <linearGradient id="stockFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5d87ff" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#5d87ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#edf1f6" />
                <XAxis
                  dataKey="week"
                  tickLine={false}
                  axisLine={false}
                  fontSize={11}
                  tick={{ fill: '#7c8fac' }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  fontSize={11}
                  tick={{ fill: '#7c8fac' }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#5d87ff"
                  strokeWidth={2.5}
                  fill="url(#stockFill)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
