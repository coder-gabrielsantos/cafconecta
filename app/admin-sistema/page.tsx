'use client';

import { useState } from 'react';
import { Activity, CheckCircle2, CircleAlert, Clock3, Plus, ShieldCheck, UserRoundCog } from 'lucide-react';
import { adminUsers, technicalLogs } from '@/data/mock';
import { KPICard } from '@/components/kpi-card';
import { PageHeader } from '@/components/page-header';
import { StatusBadge } from '@/components/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SystemAdminDashboard() {
  const [feedback, setFeedback] = useState('');
  const [expiryDays, setExpiryDays] = useState(30);
  const [minimumStock, setMinimumStock] = useState(20);

  return (
    <div className="space-y-7">
      <PageHeader eyebrow="Administração do sistema" title="Painel técnico" description="Gerencie acessos administrativos, monitore eventos e ajuste parâmetros globais." actions={
        <Dialog><DialogTrigger render={<Button size="lg" />}><Plus />Convidar administrador</DialogTrigger><DialogContent className="sm:max-w-lg"><DialogHeader><DialogTitle>Convidar administrador</DialogTitle><DialogDescription>O convite será válido por 72 horas e permitirá a criação de uma senha pessoal.</DialogDescription></DialogHeader><div className="grid gap-4"><div className="space-y-2"><Label htmlFor="invite-name">Nome completo</Label><Input id="invite-name" placeholder="Nome do administrador" /></div><div className="space-y-2"><Label htmlFor="invite-email">E-mail institucional</Label><Input id="invite-email" type="email" placeholder="nome@coelhoneto.ma.gov.br" /></div><div className="space-y-2"><Label>Perfil de acesso</Label><Select defaultValue="ADMIN_CAF"><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="ADMIN_CAF">Administrador CAF</SelectItem><SelectItem value="VISUALIZADOR">Visualizador</SelectItem></SelectContent></Select></div></div><DialogFooter><DialogClose render={<Button variant="outline" />}>Cancelar</DialogClose><DialogClose render={<Button onClick={() => setFeedback('Convite gerado e pronto para envio. Validade: 72 horas.')} />}>Gerar convite</DialogClose></DialogFooter></DialogContent></Dialog>
      } />
      {feedback && <div role="status" className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"><CheckCircle2 className="size-5" />{feedback}</div>}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KPICard label="Administradores ativos" value="8" note="2 perfis ADMIN_CAF" icon={UserRoundCog} tone="blue" />
        <KPICard label="Convites pendentes" value="1" note="Expira em 2 dias" icon={Clock3} tone="amber" />
        <KPICard label="Disponibilidade" value="99,9%" note="Últimos 30 dias" icon={Activity} tone="green" />
        <KPICard label="Alertas técnicos" value="1" note="Sem impacto na operação" icon={CircleAlert} tone="amber" />
      </section>

      <Tabs defaultValue="users" className="gap-5">
        <TabsList variant="line" className="h-auto w-full justify-start overflow-x-auto border-b border-slate-200 bg-transparent p-0 sm:w-fit">
          <TabsTrigger value="users" className="h-9 px-4">Usuários</TabsTrigger><TabsTrigger value="logs" className="h-9 px-4">Logs técnicos</TabsTrigger><TabsTrigger value="settings" className="h-9 px-4">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="users"><Card className="border-0 shadow-sm ring-1 ring-slate-200/90"><CardHeader className="border-b"><CardTitle className="text-lg">Usuários administrativos</CardTitle><p className="text-xs text-slate-500">Acessos de gestão e visualização do CAF Conecta.</p></CardHeader><CardContent className="px-0"><Table className="responsive-table"><TableHeader><TableRow><TableHead>Nome</TableHead><TableHead>E-mail</TableHead><TableHead>Perfil</TableHead><TableHead>Status</TableHead><TableHead>Criado em</TableHead></TableRow></TableHeader><TableBody>{adminUsers.map((user) => <TableRow key={user.email}><TableCell data-label="Nome" className="font-semibold">{user.name}</TableCell><TableCell data-label="E-mail" className="text-slate-600">{user.email}</TableCell><TableCell data-label="Perfil"><span className="text-xs font-medium text-blue-800">{user.role}</span></TableCell><TableCell data-label="Status"><StatusBadge status={user.status} /></TableCell><TableCell data-label="Criado em" className="text-slate-500">{user.created}</TableCell></TableRow>)}</TableBody></Table></CardContent></Card></TabsContent>

        <TabsContent value="logs"><Card className="border-0 shadow-sm ring-1 ring-slate-200/90"><CardHeader className="border-b"><CardTitle className="text-lg">Logs técnicos recentes</CardTitle><p className="text-xs text-slate-500">Eventos de acesso, sincronização e integridade do sistema.</p></CardHeader><CardContent className="space-y-3">{technicalLogs.map((log) => <div key={`${log.time}-${log.event}`} className="flex items-start gap-3 rounded-xl border p-4"><span className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg ${log.level === 'Sucesso' ? 'bg-emerald-50 text-emerald-700' : log.level === 'Atenção' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}`}><ShieldCheck className="size-4" /></span><div className="flex-1"><div className="flex flex-col justify-between gap-1 sm:flex-row"><p className="font-semibold">{log.event}</p><span className="text-xs text-slate-500">{log.time}</span></div><p className="mt-1 text-xs text-slate-500">{log.detail}</p></div></div>)}</CardContent></Card></TabsContent>

        <TabsContent value="settings"><Card className="max-w-3xl border-0 shadow-sm ring-1 ring-slate-200/90"><CardHeader className="border-b"><CardTitle className="text-lg">Parâmetros globais</CardTitle><p className="text-xs text-slate-500">Regras aplicadas às telas de alerta e planejamento de estoque.</p></CardHeader><CardContent className="space-y-6"><div className="grid gap-5 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="expiry-days">Alerta de vencimento</Label><div className="flex items-center gap-2"><Input id="expiry-days" type="number" value={expiryDays} onChange={(event) => setExpiryDays(Number(event.target.value))} /><span className="text-sm text-slate-500">dias</span></div><p className="text-xs text-slate-500">Antecedência para destacar lotes próximos da validade.</p></div><div className="space-y-2"><Label htmlFor="min-stock">Estoque mínimo</Label><div className="flex items-center gap-2"><Input id="min-stock" type="number" value={minimumStock} onChange={(event) => setMinimumStock(Number(event.target.value))} /><span className="text-sm text-slate-500">%</span></div><p className="text-xs text-slate-500">Percentual de cobertura para considerar o item crítico.</p></div></div><div className="flex items-center justify-between rounded-xl border p-4"><div><p className="text-sm font-semibold">Alertas por notificação</p><p className="mt-1 text-xs text-slate-500">Avisar administradores sobre falhas críticas.</p></div><Switch defaultChecked aria-label="Ativar alertas por notificação" /></div><Button onClick={() => setFeedback(`Configurações salvas: vencimento em ${expiryDays} dias e estoque mínimo em ${minimumStock}%.`)}>Salvar configurações</Button></CardContent></Card></TabsContent>
      </Tabs>
    </div>
  );
}
