'use client';

import Link from 'next/link';
import {
  AlertTriangle,
  Building2,
  CalendarClock,
  ClipboardList,
  PackageCheck,
  Target,
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { requests, volumeByUnit } from '@/data/mock';
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

export default function CafDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,.8fr)]">
        <DashboardHero
          eyebrow="Central de Abastecimento Farmacêutico"
          title="Olá, Helena! A rede está sob controle."
          description="Acompanhe solicitações, cobertura e itens críticos das sete unidades em uma única visão operacional."
          metric="12 pendentes"
          metricLabel="4 precisam de análise hoje"
          icon={Building2}
          action={
            <Button size="sm" render={<Link href="/caf/solicitacoes" />}>
              Analisar solicitações
            </Button>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
          <GoalCard
            label="Distribuído no mês"
            value="4.410 un."
            progress={73}
            note="Meta de 6 mil unidades"
            icon={Target}
          />
          <CoverageRing
            value={86}
            label="Cobertura da rede"
            detail="6 das 7 UBS estão acima do estoque mínimo."
          />
        </div>
      </div>

      <section
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Indicadores principais"
      >
        <KPICard
          label="Solicitações pendentes"
          value="12"
          note="4 aguardam há mais de 24h"
          icon={ClipboardList}
          tone="amber"
        />
        <KPICard
          label="Estoque crítico"
          value="7"
          note="3 itens estão sem cobertura"
          icon={AlertTriangle}
          tone="red"
        />
        <KPICard
          label="Vencimento em 30 dias"
          value="18"
          note="6 lotes precisam de atenção"
          icon={CalendarClock}
          tone="amber"
        />
        <KPICard
          label="Distribuído no mês"
          value="4.410"
          note="+8,2% em relação a agosto"
          icon={PackageCheck}
          tone="green"
        />
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(330px,.75fr)]">
        <Card>
          <CardHeader className="border-b border-[#edf1f6] pb-5">
            <CardHeading
              title="Solicitações recentes"
              subtitle="Ordenadas pela atividade mais recente"
              action={
                <Button
                  variant="outline"
                  size="sm"
                  render={<Link href="/caf/solicitacoes" />}
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
                  <TableHead>UBS origem</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Itens</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.slice(0, 5).map((request) => (
                  <TableRow key={request.id}>
                    <TableCell data-label="ID">
                      <Link
                        className="font-bold text-[#5d87ff] hover:underline"
                        href={`/caf/solicitacoes/${request.id}`}
                      >
                        {request.id}
                      </Link>
                    </TableCell>
                    <TableCell
                      data-label="UBS"
                      className="font-semibold text-[#2a3547]"
                    >
                      {request.unit.replace('UBS ', '')}
                    </TableCell>
                    <TableCell data-label="Responsável">
                      {request.owner}
                    </TableCell>
                    <TableCell data-label="Itens">{request.items}</TableCell>
                    <TableCell data-label="Status">
                      <StatusBadge status={request.status} />
                    </TableCell>
                    <TableCell data-label="Data">{request.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-[#edf1f6] pb-5">
            <CardHeading
              title="Distribuição por UBS"
              subtitle="Volume entregue em setembro"
              action={
                <span className="rounded-full bg-[#e8fbf7] px-2.5 py-1 text-[10px] font-bold text-[#0aae91]">
                  +8,2%
                </span>
              }
            />
            <p className="mt-3 text-[24px] font-bold tracking-[-0.035em] text-[#2a3547]">
              4.410{' '}
              <span className="text-xs font-normal text-[#7c8fac]">
                unidades
              </span>
            </p>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{ volume: { label: 'Unidades', color: '#5d87ff' } }}
              className="min-h-[245px] w-full aspect-auto"
            >
              <BarChart
                accessibilityLayer
                data={volumeByUnit.slice(0, 5)}
                layout="vertical"
                margin={{ left: 0, right: 12, top: 4, bottom: 4 }}
              >
                <CartesianGrid horizontal={false} stroke="#edf1f6" />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="unit"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  width={96}
                  fontSize={11}
                  tick={{ fill: '#7c8fac' }}
                />
                <ChartTooltip
                  cursor={{ fill: '#f6f9fc' }}
                  content={<ChartTooltipContent />}
                />
                <Bar
                  dataKey="volume"
                  fill="var(--color-volume)"
                  radius={[0, 6, 6, 0]}
                  barSize={12}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
