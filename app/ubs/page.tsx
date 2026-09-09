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

const localRequests = requests.filter(
  (request) => request.unit === 'UBS Dr. Fernando Couto',
);

const movementData = [
  { day: '01', entradas: 18, saidas: 12 },
  { day: '02', entradas: 14, saidas: 20 },
  { day: '03', entradas: 22, saidas: 17 },
  { day: '04', entradas: 12, saidas: 15 },
  { day: '05', entradas: 26, saidas: 18 },
  { day: '06', entradas: 20, saidas: 24 },
  { day: '07', entradas: 28, saidas: 19 },
  { day: '08', entradas: 16, saidas: 21 },
  { day: '09', entradas: 24, saidas: 18 },
  { day: '10', entradas: 17, saidas: 14 },
  { day: '11', entradas: 29, saidas: 22 },
  { day: '12', entradas: 25, saidas: 20 },
];

const stockStatusData = [
  { name: 'Regular', value: 92, color: '#13b99a' },
  { name: 'Atenção', value: 6, color: '#ffae1f' },
  { name: 'Crítico', value: 2, color: '#fa896b' },
];

export default function UbsDashboard() {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden py-0">
        <CardContent className="grid p-0 lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,.9fr)]">
          <section className="flex flex-col border-b border-[#edf1f6] p-5 sm:p-6 lg:border-b-0 lg:border-r">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-[16px] font-medium text-[#2a3547]">
                  Movimentações da unidade
                </h2>
                <p className="mt-1 text-[12px] text-[#7c8fac]">
                  Entradas e saídas nos últimos 12 dias
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-[24px] font-medium tracking-[-0.03em] text-[#2a3547]">
                  684 un.
                </p>
                <p className="mt-1 text-[12px] text-[#13a88d]">
                  ↑ 5,4% em relação ao período anterior
                </p>
              </div>
            </div>

            <ChartContainer
              config={{
                entradas: { label: 'Entradas', color: '#5d87ff' },
                saidas: { label: 'Saídas', color: '#dfe6f0' },
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
                  dataKey="entradas"
                  fill="var(--color-entradas)"
                  radius={[3, 3, 0, 0]}
                />
                <Bar
                  dataKey="saidas"
                  fill="var(--color-saidas)"
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ChartContainer>

            <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-3 text-[12px] text-[#7c8fac]">
              <span className="inline-flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#5d87ff]" />
                Entradas
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#dfe6f0]" />
                Saídas
              </span>
            </div>
          </section>

          <section className="flex flex-col p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[13px] text-[#7c8fac]">Saúde do estoque</p>
                <p className="mt-1 text-[14px] text-[#2a3547]">
                  Situação dos itens da UBS
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                render={<Link href="/ubs/estoque" />}
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
                  <p className="text-[22px] font-medium text-[#2a3547]">92%</p>
                  <p className="text-[11px] text-[#7c8fac]">regular</p>
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
            subtitle="Últimos pedidos enviados pela unidade"
            action={
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  render={<Link href="/ubs/solicitacoes" />}
                >
                  Ver todas
                </Button>
                <Button
                  size="sm"
                  render={<Link href="/ubs/solicitacoes/nova" />}
                >
                  Nova solicitação
                </Button>
              </div>
            }
          />
        </CardHeader>
        <CardContent className="px-0">
          <Table className="responsive-table">
            <TableHeader>
              <TableRow>
                <TableHead>Solicitação</TableHead>
                <TableHead>Enviada em</TableHead>
                <TableHead>Itens</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {localRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell data-label="Solicitação">
                    <Link
                      href={`/ubs/solicitacoes/${request.id}`}
                      className="font-medium text-[#5d87ff] hover:underline"
                    >
                      {request.id}
                    </Link>
                  </TableCell>
                  <TableCell data-label="Enviada em">{request.date}</TableCell>
                  <TableCell data-label="Itens">{request.items}</TableCell>
                  <TableCell data-label="Status">
                    <StatusBadge status={request.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
