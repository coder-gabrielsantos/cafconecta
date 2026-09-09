'use client';

import Link from 'next/link';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
} from 'recharts';
import { requests } from '@/data/mock';
import { CardHeading } from '@/components/dashboard-widgets';
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

const movementData = [
  { day: '01', atual: 44, anterior: 25 },
  { day: '02', atual: 36, anterior: 47 },
  { day: '03', atual: 39, anterior: 29 },
  { day: '04', atual: 31, anterior: 40 },
  { day: '05', atual: 49, anterior: 34 },
  { day: '06', atual: 53, anterior: 27 },
  { day: '07', atual: 44, anterior: 24 },
  { day: '08', atual: 36, anterior: 44 },
  { day: '09', atual: 41, anterior: 30 },
  { day: '10', atual: 31, anterior: 40 },
  { day: '11', atual: 49, anterior: 35 },
  { day: '12', atual: 54, anterior: 26 },
];

const stockStatusData = [
  { name: 'Regular', value: 72, color: '#13b99a' },
  { name: 'Atenção', value: 18, color: '#ffae1f' },
  { name: 'Crítico', value: 10, color: '#fa896b' },
];

export default function CafDashboard() {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden py-0">
        <CardContent className="grid p-0 lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,.9fr)]">
          <section className="flex flex-col border-b border-[#edf1f6] p-5 sm:p-6 lg:border-b-0 lg:border-r">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-[16px] font-medium text-[#2a3547]">
                  Movimentações
                </h2>
                <p className="mt-1 text-[12px] text-[#7c8fac]">
                  Comparativo dos últimos 12 dias
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="mt-1 text-[24px] font-medium tracking-[-0.03em] text-[#2a3547]">
                  7.852 un.
                </p>
                <p className="mt-1 text-[12px] text-[#13a88d]">
                  ↑ 2,1% em relação à semana anterior
                </p>
              </div>
            </div>

            <ChartContainer
              config={{
                atual: { label: 'Últimos 6 dias', color: '#5d87ff' },
                anterior: { label: 'Semana anterior', color: '#e5eaf1' },
              }}
              className="mt-4 h-[180px] w-full aspect-auto"
            >
              <BarChart accessibilityLayer data={movementData} barGap={3}>
                <CartesianGrid
                  vertical={false}
                  stroke="#edf1f6"
                  strokeDasharray="3 3"
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  fontSize={11}
                />
                <ChartTooltip
                  cursor={{ fill: '#f6f9fc' }}
                  content={<ChartTooltipContent />}
                />
                <Bar
                  dataKey="atual"
                  fill="var(--color-atual)"
                  radius={[3, 3, 0, 0]}
                />
                <Bar
                  dataKey="anterior"
                  fill="var(--color-anterior)"
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ChartContainer>

            <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-3 text-[12px] text-[#7c8fac]">
              <span className="inline-flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#5d87ff]" />
                Últimos 6 dias
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#e5eaf1]" />
                Semana anterior
              </span>
            </div>
          </section>

          <section className="flex flex-col p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[13px] text-[#7c8fac]">Saúde do estoque</p>
                <p className="mt-1 text-[14px] text-[#2a3547]">
                  Situação dos itens na rede
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                render={<Link href="/caf/estoque" />}
              >
                Ver estoque
              </Button>
            </div>

            <div className="relative mx-auto mt-4 h-[170px] w-full max-w-[240px] shrink-0">
              <ChartContainer
                config={{ estoque: { label: 'Itens em estoque' } }}
                className="h-full w-full aspect-auto"
              >
                <PieChart accessibilityLayer>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={stockStatusData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={48}
                    outerRadius={70}
                    paddingAngle={2}
                    strokeWidth={0}
                  >
                    {stockStatusData.map((item) => (
                      <Cell key={item.name} fill={item.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
              <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
                <div>
                  <p className="text-[22px] font-medium text-[#2a3547]">86%</p>
                  <p className="text-[11px] text-[#7c8fac]">cobertura</p>
                </div>
              </div>
            </div>

            <div className="mt-auto grid grid-cols-3 gap-2 pt-3 text-center">
              {stockStatusData.map((item) => (
                <div key={item.name}>
                  <p className="flex items-center justify-center gap-1.5 text-[12px] text-[#2a3547]">
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.name}
                  </p>
                  <p className="mt-1 text-[11px] text-[#7c8fac]">
                    {item.value}%
                  </p>
                </div>
              ))}
            </div>
          </section>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b border-[#edf1f6] pb-5">
          <CardHeading
            title="Solicitações recentes"
            subtitle="Últimas movimentações da rede"
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
                <TableHead>Solicitação</TableHead>
                <TableHead>UBS</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.slice(0, 4).map((request) => (
                <TableRow key={request.id}>
                  <TableCell data-label="Solicitação">
                    <Link
                      className="font-medium text-[#5d87ff] hover:underline"
                      href={`/caf/solicitacoes/${request.id}`}
                    >
                      {request.id}
                    </Link>
                  </TableCell>
                  <TableCell data-label="UBS" className="text-[#2a3547]">
                    {request.unit.replace('UBS ', '')}
                  </TableCell>
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
    </div>
  );
}
