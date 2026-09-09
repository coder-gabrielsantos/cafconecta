'use client';

import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
} from 'recharts';
import { CheckCircle2, UserPlus } from 'lucide-react';
import { technicalLogs } from '@/data/mock';
import { CardHeading } from '@/components/dashboard-widgets';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

const activityData = [
  { day: '01', acessos: 28, eventos: 12 },
  { day: '02', acessos: 34, eventos: 16 },
  { day: '03', acessos: 31, eventos: 14 },
  { day: '04', acessos: 42, eventos: 19 },
  { day: '05', acessos: 38, eventos: 17 },
  { day: '06', acessos: 46, eventos: 21 },
  { day: '07', acessos: 40, eventos: 18 },
  { day: '08', acessos: 35, eventos: 15 },
  { day: '09', acessos: 48, eventos: 22 },
  { day: '10', acessos: 44, eventos: 20 },
  { day: '11', acessos: 51, eventos: 23 },
  { day: '12', acessos: 47, eventos: 19 },
];

const serviceStatusData = [
  { name: 'Operacional', value: 96, color: '#13b99a' },
  { name: 'Atenção', value: 3, color: '#ffae1f' },
  { name: 'Indisponível', value: 1, color: '#fa896b' },
];

const logTone: Record<string, string> = {
  Sucesso: 'text-emerald-700',
  Atenção: 'text-amber-700',
  Informação: 'text-[#4774ee]',
};

export default function SystemAdminDashboard() {
  const [feedback, setFeedback] = useState('');

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden py-0">
        <CardContent className="grid p-0 lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,.9fr)]">
          <section className="flex flex-col border-b border-[#edf1f6] p-5 sm:p-6 lg:border-b-0 lg:border-r">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-[16px] font-medium text-[#2a3547]">
                  Atividade do sistema
                </h2>
                <p className="mt-1 text-[12px] text-[#7c8fac]">
                  Acessos e eventos nos últimos 12 dias
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-[24px] font-medium tracking-[-0.03em] text-[#2a3547]">
                  326 eventos
                </p>
                <p className="mt-1 text-[12px] text-[#13a88d]">
                  ↑ 8,2% em relação ao período anterior
                </p>
              </div>
            </div>

            <ChartContainer
              config={{
                acessos: { label: 'Acessos', color: '#5d87ff' },
                eventos: { label: 'Eventos técnicos', color: '#dfe6f0' },
              }}
              className="mt-4 h-[180px] w-full aspect-auto"
            >
              <BarChart accessibilityLayer data={activityData} barGap={3}>
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
                  dataKey="acessos"
                  fill="var(--color-acessos)"
                  radius={[3, 3, 0, 0]}
                />
                <Bar
                  dataKey="eventos"
                  fill="var(--color-eventos)"
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ChartContainer>

            <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-3 text-[12px] text-[#7c8fac]">
              <span className="inline-flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#5d87ff]" />
                Acessos
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#dfe6f0]" />
                Eventos técnicos
              </span>
            </div>
          </section>

          <section className="flex flex-col p-5 sm:p-6">
            <div>
              <p className="text-[13px] text-[#7c8fac]">Saúde dos serviços</p>
              <p className="mt-1 text-[14px] text-[#2a3547]">
                Disponibilidade da plataforma
              </p>
            </div>

            <div className="relative mx-auto mt-4 h-[170px] w-full max-w-[240px] shrink-0">
              <ChartContainer
                config={{ servicos: { label: 'Serviços' } }}
                className="h-full w-full aspect-auto"
              >
                <PieChart accessibilityLayer>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={serviceStatusData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={48}
                    outerRadius={70}
                    paddingAngle={2}
                    strokeWidth={0}
                  >
                    {serviceStatusData.map((item) => (
                      <Cell key={item.name} fill={item.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
              <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
                <div>
                  <p className="text-[22px] font-medium text-[#2a3547]">
                    99,9%
                  </p>
                  <p className="text-[11px] text-[#7c8fac]">disponível</p>
                </div>
              </div>
            </div>

            <div className="mt-auto grid grid-cols-3 gap-2 pt-3 text-center">
              {serviceStatusData.map((item) => (
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

      {feedback && (
        <output className="flex items-center gap-3 rounded-lg border border-[#bcefe4] bg-[#e8fbf7] px-4 py-3 text-[14px] text-[#087b68]">
          <CheckCircle2 className="size-5" />
          {feedback}
        </output>
      )}

      <Card>
        <CardHeader className="border-b border-[#edf1f6] pb-5">
          <CardHeading
            title="Eventos recentes"
            subtitle="Últimas atividades registradas na plataforma"
            action={
              <Dialog>
                <DialogTrigger render={<Button size="sm" />}>
                  <UserPlus />
                  Convidar administrador
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Convidar administrador</DialogTitle>
                    <DialogDescription>
                      O convite será válido por 72 horas e permitirá a criação
                      de uma senha pessoal.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="invite-name">Nome completo</Label>
                      <Input
                        id="invite-name"
                        placeholder="Nome do administrador"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="invite-email">E-mail institucional</Label>
                      <Input
                        id="invite-email"
                        type="email"
                        placeholder="nome@coelhoneto.ma.gov.br"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Perfil de acesso</Label>
                      <Select defaultValue="ADMIN_CAF">
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ADMIN_CAF">
                            Administrador CAF
                          </SelectItem>
                          <SelectItem value="VISUALIZADOR">
                            Visualizador
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose render={<Button variant="outline" />}>
                      Cancelar
                    </DialogClose>
                    <DialogClose
                      render={
                        <Button
                          onClick={() =>
                            setFeedback(
                              'Convite gerado e pronto para envio. Validade: 72 horas.',
                            )
                          }
                        />
                      }
                    >
                      Gerar convite
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            }
          />
        </CardHeader>
        <CardContent className="px-0">
          <Table className="responsive-table">
            <TableHeader>
              <TableRow>
                <TableHead>Horário</TableHead>
                <TableHead>Evento</TableHead>
                <TableHead>Detalhes</TableHead>
                <TableHead>Nível</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {technicalLogs.map((log) => (
                <TableRow key={`${log.time}-${log.event}`}>
                  <TableCell data-label="Horário">{log.time}</TableCell>
                  <TableCell data-label="Evento" className="text-[#2a3547]">
                    {log.event}
                  </TableCell>
                  <TableCell data-label="Detalhes">{log.detail}</TableCell>
                  <TableCell data-label="Nível">
                    <span
                      className={cn(
                        'inline-flex items-center gap-2 text-[12px]',
                        logTone[log.level],
                      )}
                    >
                      <span className="size-1.5 rotate-45 bg-current opacity-75" />
                      {log.level}
                    </span>
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
