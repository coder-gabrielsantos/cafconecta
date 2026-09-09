'use client';

import {
  Activity,
  CheckCircle2,
  CircleAlert,
  Clock3,
  ServerCog,
  ShieldCheck,
  Target,
  UserPlus,
  UserRoundCog,
} from 'lucide-react';
import { useState } from 'react';
import { adminUsers, technicalLogs } from '@/data/mock';
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
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SystemAdminDashboard() {
  const [feedback, setFeedback] = useState('');
  const [expiryDays, setExpiryDays] = useState(30);
  const [minimumStock, setMinimumStock] = useState(20);

  const inviteAction = (
    <Dialog>
      <DialogTrigger render={<Button size="sm" />}>
        <UserPlus />
        Convidar administrador
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Convidar administrador</DialogTitle>
          <DialogDescription>
            O convite será válido por 72 horas e permitirá a criação de uma
            senha pessoal.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="invite-name">Nome completo</Label>
            <Input id="invite-name" placeholder="Nome do administrador" />
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
                <SelectItem value="ADMIN_CAF">Administrador CAF</SelectItem>
                <SelectItem value="VISUALIZADOR">Visualizador</SelectItem>
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
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,.8fr)]">
        <DashboardHero
          eyebrow="Administração do sistema"
          title="Olá, Gabriel! O ambiente está saudável."
          description="Monitore acessos, eventos técnicos e parâmetros globais sem perder de vista a operação da rede."
          metric="99,9%"
          metricLabel="disponibilidade nos últimos 30 dias"
          icon={ServerCog}
          action={inviteAction}
        />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
          <GoalCard
            label="Administradores ativos"
            value="8 acessos"
            progress={80}
            note="2 perfis de gestão CAF"
            icon={Target}
          />
          <CoverageRing
            value={96}
            label="Saúde dos serviços"
            detail="Todos os serviços essenciais estão operacionais."
          />
        </div>
      </div>

      {feedback && (
        <output className="flex items-center gap-3 rounded-xl border border-[#bcefe4] bg-[#e8fbf7] px-4 py-3 text-sm font-semibold text-[#087b68]">
          <CheckCircle2 className="size-5" />
          {feedback}
        </output>
      )}

      <section
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Indicadores do sistema"
      >
        <KPICard
          label="Administradores ativos"
          value="8"
          note="2 perfis ADMIN_CAF"
          icon={UserRoundCog}
          tone="blue"
        />
        <KPICard
          label="Convites pendentes"
          value="1"
          note="Expira em 2 dias"
          icon={Clock3}
          tone="amber"
        />
        <KPICard
          label="Disponibilidade"
          value="99,9%"
          note="Últimos 30 dias"
          icon={Activity}
          tone="green"
        />
        <KPICard
          label="Alertas técnicos"
          value="1"
          note="Sem impacto na operação"
          icon={CircleAlert}
          tone="amber"
        />
      </section>

      <Tabs defaultValue="users" className="gap-5">
        <TabsList
          variant="line"
          className="h-auto w-full justify-start overflow-x-auto border-b border-[#e8eef5] bg-transparent p-0 sm:w-fit"
        >
          <TabsTrigger value="users" className="h-10 px-4">
            Usuários
          </TabsTrigger>
          <TabsTrigger value="logs" className="h-10 px-4">
            Logs técnicos
          </TabsTrigger>
          <TabsTrigger value="settings" className="h-10 px-4">
            Configurações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader className="border-b border-[#edf1f6] pb-5">
              <CardHeading
                title="Usuários administrativos"
                subtitle="Acessos de gestão e visualização do CAF Conecta"
              />
            </CardHeader>
            <CardContent className="px-0">
              <Table className="responsive-table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Perfil</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Criado em</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminUsers.map((user) => (
                    <TableRow key={user.email}>
                      <TableCell
                        data-label="Nome"
                        className="font-semibold text-[#2a3547]"
                      >
                        {user.name}
                      </TableCell>
                      <TableCell data-label="E-mail">{user.email}</TableCell>
                      <TableCell data-label="Perfil">
                        <span className="inline-flex items-center gap-2 text-[12px] font-medium text-[#4774ee]">
                          <span className="h-4 w-0.5 bg-[#5d87ff]" />
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell data-label="Status">
                        <StatusBadge status={user.status} />
                      </TableCell>
                      <TableCell data-label="Criado em">
                        {user.created}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader className="border-b border-[#edf1f6] pb-5">
              <CardHeading
                title="Logs técnicos recentes"
                subtitle="Eventos de acesso, sincronização e integridade"
              />
            </CardHeader>
            <CardContent className="grid gap-3 lg:grid-cols-3">
              {technicalLogs.map((log) => (
                <div
                  key={`${log.time}-${log.event}`}
                  className="flex items-start gap-3 rounded-xl border border-[#edf1f6] p-4"
                >
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-xl ${log.level === 'Sucesso' ? 'bg-[#e8fbf7] text-[#0aae91]' : log.level === 'Atenção' ? 'bg-[#fff6e5] text-[#e79500]' : 'bg-[#ecf2ff] text-[#5d87ff]'}`}
                  >
                    <ShieldCheck className="size-[18px]" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#2a3547]">{log.event}</p>
                    <p className="mt-1 text-[11px] text-[#7c8fac]">
                      {log.detail}
                    </p>
                    <p className="mt-2 text-[10px] font-semibold text-[#9aa9bd]">
                      {log.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="max-w-4xl">
            <CardHeader className="border-b border-[#edf1f6] pb-5">
              <CardHeading
                title="Parâmetros globais"
                subtitle="Regras dos alertas e do planejamento de estoque"
              />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="expiry-days">Alerta de vencimento</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="expiry-days"
                      type="number"
                      value={expiryDays}
                      onChange={(event) =>
                        setExpiryDays(Number(event.target.value))
                      }
                    />
                    <span className="text-sm text-[#7c8fac]">dias</span>
                  </div>
                  <p className="text-[11px] text-[#7c8fac]">
                    Antecedência para destacar lotes próximos da validade.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-stock">Estoque mínimo</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="min-stock"
                      type="number"
                      value={minimumStock}
                      onChange={(event) =>
                        setMinimumStock(Number(event.target.value))
                      }
                    />
                    <span className="text-sm text-[#7c8fac]">%</span>
                  </div>
                  <p className="text-[11px] text-[#7c8fac]">
                    Cobertura mínima antes de considerar o item crítico.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl border border-[#edf1f6] bg-[#f9fbfd] p-4">
                <div>
                  <p className="text-sm font-semibold text-[#2a3547]">
                    Alertas por notificação
                  </p>
                  <p className="mt-1 text-[11px] text-[#7c8fac]">
                    Avisar administradores sobre falhas críticas.
                  </p>
                </div>
                <Switch
                  defaultChecked
                  aria-label="Ativar alertas por notificação"
                />
              </div>
              <Button
                onClick={() =>
                  setFeedback(
                    `Configurações salvas: vencimento em ${expiryDays} dias e estoque mínimo em ${minimumStock}%.`,
                  )
                }
              >
                Salvar configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
