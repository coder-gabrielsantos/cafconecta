'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Building2, CheckCircle2, Download, FileBarChart, Filter, PackagePlus, Pill, Plus, Search, Warehouse } from 'lucide-react';
import { adminUsers, medications, requests, technicalLogs, units } from '@/data/mock';
import { DataTable } from '@/components/data-table';
import { PageHeader } from '@/components/page-header';
import { StatusBadge } from '@/components/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function CafRequestsPage() {
  const [filter, setFilter] = useState('all');
  const visible = filter === 'all' ? requests : requests.filter((request) => request.status === filter);
  return <div className="space-y-6"><PageHeader eyebrow="Operação CAF" title="Solicitações" description="Analise e acompanhe as solicitações enviadas pelas sete UBS." actions={<Button variant="outline"><Download />Exportar</Button>} /><Card className="border-0 shadow-sm ring-1 ring-slate-200/90"><CardHeader className="flex-col gap-3 border-b sm:flex-row sm:items-center sm:justify-between"><div><CardTitle className="text-lg">Fila de solicitações</CardTitle><p className="mt-1 text-xs text-slate-500">{visible.length} registros encontrados</p></div><Select value={filter} onValueChange={(value) => value && setFilter(value)}><SelectTrigger className="w-full sm:w-48"><Filter /><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Todos os status</SelectItem><SelectItem value="Pendente">Pendentes</SelectItem><SelectItem value="Em análise">Em análise</SelectItem><SelectItem value="Aprovada">Aprovadas</SelectItem><SelectItem value="Recusada">Recusadas</SelectItem></SelectContent></Select></CardHeader><CardContent className="px-0"><DataTable headers={['ID', 'UBS origem', 'Responsável', 'Itens', 'Status', 'Data']} rows={visible.map((request) => [<Link key="id" href={`/caf/solicitacoes/${request.id}`} className="font-semibold text-blue-700 hover:underline">{request.id}</Link>, request.unit, request.owner, request.items, <StatusBadge key="status" status={request.status} />, request.date])} /></CardContent></Card></div>;
}

export function UbsRequestsPage() {
  const local = requests.filter((request) => request.unit === 'UBS Dr. Fernando Couto');
  return <div className="space-y-6"><PageHeader eyebrow="UBS Dr. Fernando Couto" title="Minhas solicitações" description="Consulte pedidos enviados, acompanhe respostas e confirme entregas." actions={<Button render={<Link href="/ubs/solicitacoes/nova" />}><Plus />Nova solicitação</Button>} /><Card className="border-0 shadow-sm ring-1 ring-slate-200/90"><CardContent className="px-0"><DataTable headers={['ID', 'Data de envio', 'Itens', 'Status', 'Aprovada / Solicitada', 'Ação']} rows={local.map((request) => [request.id, request.date, request.items, <StatusBadge key="status" status={request.status} />, request.approved, <Button key="action" variant="outline" size="sm" render={<Link href={`/ubs/solicitacoes/${request.id}`} />}>{request.status === 'Entregue' ? 'Conferir entrega' : 'Ver detalhes'}</Button>])} /></CardContent></Card></div>;
}

export function InventoryPage({ local = false, unitName }: { local?: boolean; unitName?: string }) {
  const [query, setQuery] = useState('');
  const visible = medications.filter((medicine) => medicine.name.toLowerCase().includes(query.toLowerCase()));
  return <div className="space-y-6"><PageHeader eyebrow={local ? 'UBS Dr. Fernando Couto' : unitName ? 'Estoque por UBS' : 'Central de Abastecimento'} title={unitName ? unitName : local ? 'Meu estoque' : 'Estoque central'} description={local ? 'Consulte saldos, cobertura mínima e itens que precisam de reposição.' : 'Monitore lotes, validade e disponibilidade dos medicamentos da rede.'} actions={!local && <Button><PackagePlus />Registrar entrada</Button>} /><Card className="border-0 shadow-sm ring-1 ring-slate-200/90"><CardHeader className="flex-col gap-3 border-b sm:flex-row sm:items-center sm:justify-between"><div><CardTitle className="text-lg">Posição de estoque</CardTitle><p className="mt-1 text-xs text-slate-500">Atualizado hoje às 08:17</p></div><div className="relative w-full sm:w-72"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" /><Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-9" placeholder="Buscar medicamento…" /></div></CardHeader><CardContent className="px-0"><DataTable headers={['Medicamento', 'Apresentação', 'Estoque atual', 'Estoque mínimo', 'Cobertura', 'Situação']} rows={visible.map((medicine) => {
    const stock = local ? Math.max(12, Math.round(medicine.stock * .07)) : medicine.stock;
    const min = local ? Math.max(10, Math.round(medicine.min * .07)) : medicine.min;
    const percentage = Math.min(100, Math.round((stock / min) * 55));
    return [<span key="med" className="font-semibold">{medicine.name}</span>, medicine.form, `${stock.toLocaleString('pt-BR')} un.`, `${min.toLocaleString('pt-BR')} un.`, <div key="progress" className="min-w-28 space-y-1"><Progress value={percentage} /><span className="text-[10px] text-slate-500">{percentage}% da cobertura</span></div>, <StatusBadge key="status" status={stock < min ? 'Pendente' : 'Ativo'} />];
  })} /></CardContent></Card></div>;
}

export function MedicationsPage() {
  const [feedback, setFeedback] = useState('');
  return <div className="space-y-6"><PageHeader eyebrow="Catálogo REMUME" title="Medicamentos" description="Mantenha o cadastro padronizado de apresentações disponíveis na rede." actions={<Dialog><DialogTrigger render={<Button />}><Plus />Cadastrar medicamento</DialogTrigger><DialogContent className="sm:max-w-lg"><DialogHeader><DialogTitle>Novo medicamento</DialogTitle><DialogDescription>Cadastre o princípio ativo e a apresentação usada na rede municipal.</DialogDescription></DialogHeader><div className="grid gap-4"><div className="space-y-2"><Label htmlFor="med-name">Princípio ativo e concentração</Label><Input id="med-name" placeholder="Ex.: Enalapril 10mg" /></div><div className="space-y-2"><Label htmlFor="med-form">Apresentação</Label><Input id="med-form" placeholder="Ex.: Comprimido" /></div></div><DialogFooter><DialogClose render={<Button variant="outline" />}>Cancelar</DialogClose><DialogClose render={<Button onClick={() => setFeedback('Medicamento cadastrado no catálogo REMUME.')} />}>Salvar cadastro</DialogClose></DialogFooter></DialogContent></Dialog>} />{feedback && <div role="status" className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-800"><CheckCircle2 className="size-5" />{feedback}</div>}<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{medications.map((medicine) => <Card key={medicine.name} className="border-0 shadow-sm ring-1 ring-slate-200/90"><CardContent className="flex items-start gap-4"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700"><Pill className="size-5" /></span><div><h2 className="font-semibold text-slate-900">{medicine.name}</h2><p className="mt-1 text-xs text-slate-500">{medicine.form} · {medicine.category}</p><p className="mt-3 text-xs font-medium text-slate-700">Código REMUME · RM-{String(medications.indexOf(medicine) + 1).padStart(4, '0')}</p></div></CardContent></Card>)}</div></div>;
}

export function UnitsPage() {
  return <div className="space-y-6"><PageHeader eyebrow="Rede municipal" title="Unidades Básicas de Saúde" description="Acompanhe a situação de abastecimento e sincronização das sete unidades." actions={<Button><Plus />Cadastrar UBS</Button>} /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{units.map((unit, index) => <Card key={unit} className="border-0 shadow-sm ring-1 ring-slate-200/90"><CardContent><div className="flex items-start justify-between"><span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-700"><Building2 className="size-5" /></span><StatusBadge status="Ativo" /></div><h2 className="mt-4 text-base font-semibold">{unit}</h2><p className="mt-1 text-xs text-slate-500">Responsável: {['Ana Beatriz Silva', 'Marcos Almeida', 'Camila Rocha', 'Juliana Sousa', 'Roberto Freire', 'Paulo Santos', 'Renata Lima'][index]}</p><div className="mt-4 grid grid-cols-2 gap-2 rounded-lg bg-slate-50 p-3 text-xs"><div><span className="text-slate-500">Itens críticos</span><strong className="mt-1 block text-amber-700">{index % 3}</strong></div><div><span className="text-slate-500">Última atualização</span><strong className="mt-1 block text-slate-700">Hoje, 08:{17 + index}</strong></div></div><Button variant="outline" className="mt-4 w-full" render={<Link href={`/caf/estoque/ubs/${unit.toLowerCase().replaceAll(' ', '-')}`} />}>Ver estoque</Button></CardContent></Card>)}</div></div>;
}

export function ReportsPage() {
  const [feedback, setFeedback] = useState('');
  return <div className="space-y-6"><PageHeader eyebrow="Inteligência da operação" title="Relatórios consolidados" description="Analise distribuição, consumo e cobertura de estoque em toda a rede." actions={<Button onClick={() => setFeedback('Relatório mensal preparado para download.')}><Download />Exportar PDF</Button>} />{feedback && <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-800">{feedback}</div>}<Tabs defaultValue="distribution"><TabsList><TabsTrigger value="distribution">Distribuição</TabsTrigger><TabsTrigger value="stock">Estoque</TabsTrigger><TabsTrigger value="expiry">Validade</TabsTrigger></TabsList><TabsContent value="distribution" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{['Distribuição por UBS', 'Consumo por categoria', 'Tempo médio de atendimento'].map((title, index) => <ReportCard key={title} title={title} value={['4.410 unidades', 'Analgésicos · 31%', '1,8 dias'][index]} />)}</TabsContent><TabsContent value="stock"><ReportCard title="Cobertura total da rede" value="42 dias" /></TabsContent><TabsContent value="expiry"><ReportCard title="Lotes em atenção" value="18 lotes" /></TabsContent></Tabs></div>;
}

function ReportCard({ title, value }: { title: string; value: string }) {
  return <Card className="border-0 shadow-sm ring-1 ring-slate-200/90"><CardContent><span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-700"><FileBarChart className="size-5" /></span><p className="mt-5 text-sm font-medium text-slate-500">{title}</p><p className="mt-2 text-2xl font-bold text-slate-950">{value}</p><div className="mt-5 flex h-20 items-end gap-2">{[42, 68, 51, 79, 63, 88, 72].map((height, index) => <span key={index} className="flex-1 rounded-t bg-blue-600/80" style={{ height: `${height}%` }} />)}</div></CardContent></Card>;
}

export function AuditPage() {
  return <div className="space-y-6"><PageHeader eyebrow="Rastreabilidade" title="Auditoria" description="Consulte decisões, movimentações e acessos registrados na plataforma." /><Card className="border-0 shadow-sm ring-1 ring-slate-200/90"><CardContent className="px-0"><DataTable headers={['Data e hora', 'Evento', 'Responsável', 'Origem', 'Resultado']} rows={technicalLogs.concat([{ time: '30/08, 10:11', event: 'Solicitação recusada', detail: 'Paulo Santos · SOL-005', level: 'Atenção' }]).map((log) => [log.time, <span key="event" className="font-semibold">{log.event}</span>, log.detail.split(' · ')[0], log.detail.split(' · ')[1] ?? 'Sistema', log.level])} /></CardContent></Card></div>;
}

export function UsersPage() {
  return <div className="space-y-6"><PageHeader eyebrow="Acessos da operação" title="Usuários" description="Usuários administrativos com acesso às funções farmacêuticas." /><Card className="border-0 shadow-sm ring-1 ring-slate-200/90"><CardContent className="px-0"><DataTable headers={['Nome', 'E-mail', 'Perfil', 'Status', 'Criado em']} rows={adminUsers.map((user) => [user.name, user.email, user.role, <StatusBadge key="status" status={user.status} />, user.created])} /></CardContent></Card></div>;
}

export function HistoryPage() {
  return <div className="space-y-6"><PageHeader eyebrow="UBS Dr. Fernando Couto" title="Histórico de movimentações" description="Entradas e saídas registradas no estoque da sua unidade." /><Card className="border-0 shadow-sm ring-1 ring-slate-200/90"><CardContent className="px-0"><DataTable headers={['Data', 'Movimentação', 'Medicamento', 'Quantidade', 'Referência']} rows={[[ '28/08/2026', 'Entrada', 'Paracetamol 500mg', '+200 un.', 'SOL-001' ], [ '28/08/2026', 'Entrada', 'Dipirona 500mg', '+150 un.', 'SOL-001' ], [ '27/08/2026', 'Dispensação', 'Losartana 50mg', '-46 un.', 'Atendimento UBS' ], [ '26/08/2026', 'Ajuste', 'Insulina NPH', '-2 un.', 'Avaria registrada' ]].map((row) => row.map((cell) => cell))} /></CardContent></Card></div>;
}
