'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Download,
  FileBarChart,
  PackagePlus,
  Pill,
  Plus,
  Search,
} from 'lucide-react';
import {
  adminUsers,
  medications,
  requests,
  technicalLogs,
  units,
} from '@/data/mock';
import { DataTable } from '@/components/data-table';
import { PageHeader } from '@/components/page-header';
import { StatusBadge } from '@/components/status-badge';
import { TableSelect } from '@/components/table-select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const requestStatusOptions = [
  { value: 'all', label: 'Todos os status' },
  { value: 'Pendente', label: 'Pendentes' },
  { value: 'Em análise', label: 'Em análise' },
  { value: 'Aprovada', label: 'Aprovadas' },
  { value: 'Recusada', label: 'Recusadas' },
];

export function CafRequestsPage() {
  const [filter, setFilter] = useState('all');
  const visible =
    filter === 'all'
      ? requests
      : requests.filter((request) => request.status === filter);
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Operação CAF"
        title="Solicitações"
        description="Analise e acompanhe as solicitações enviadas pelas sete UBS."
        actions={
          <Button variant="outline">
            <Download />
            Exportar
          </Button>
        }
      />
      <Card>
        <CardHeader className="flex flex-col gap-4 border-b border-[#edf1f6] pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-[16px]">Fila de solicitações</CardTitle>
            <p className="mt-1 text-[11px] text-[#7c8fac]">
              {visible.length} registros encontrados
            </p>
          </div>
          <TableSelect
            ariaLabel="Filtrar solicitações por status"
            options={requestStatusOptions}
            value={filter}
            onChange={setFilter}
          />
        </CardHeader>
        <CardContent className="px-0">
          <DataTable
            headers={[
              'ID',
              'UBS origem',
              'Responsável',
              'Itens',
              'Status',
              'Data',
            ]}
            rows={visible.map((request) => [
              <Link
                key="id"
                href={`/caf/solicitacoes/${request.id}`}
                className="font-bold text-[#5d87ff] hover:underline"
              >
                {request.id}
              </Link>,
              request.unit,
              request.owner,
              request.items,
              <StatusBadge key="status" status={request.status} />,
              request.date,
            ])}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export function UbsRequestsPage() {
  const local = requests.filter(
    (request) => request.unit === 'UBS Dr. Fernando Couto',
  );
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="UBS Dr. Fernando Couto"
        title="Minhas solicitações"
        description="Consulte pedidos enviados, acompanhe respostas e confirme entregas."
        actions={
          <Button render={<Link href="/ubs/solicitacoes/nova" />}>
            <Plus />
            Nova solicitação
          </Button>
        }
      />
      <Card>
        <CardContent className="px-0">
          <DataTable
            headers={[
              'ID',
              'Data de envio',
              'Itens',
              'Status',
              'Aprovada / Solicitada',
              'Ação',
            ]}
            rows={local.map((request) => [
              <span key="id" className="font-bold text-[#5d87ff]">
                {request.id}
              </span>,
              request.date,
              request.items,
              <StatusBadge key="status" status={request.status} />,
              request.approved,
              <Button
                key="action"
                variant="outline"
                size="sm"
                render={<Link href={`/ubs/solicitacoes/${request.id}`} />}
              >
                {request.status === 'Entregue'
                  ? 'Conferir entrega'
                  : 'Ver detalhes'}
              </Button>,
            ])}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export function InventoryPage({
  local = false,
  unitName,
}: {
  local?: boolean;
  unitName?: string;
}) {
  const [query, setQuery] = useState('');
  const isUnitStock = local || Boolean(unitName);
  const visible = medications.filter((medicine) =>
    medicine.name.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="space-y-6">
      {unitName && (
        <Link
          href="/caf/unidades"
          className="inline-flex items-center gap-2 text-[14px] text-[#7c8fac] transition-colors hover:text-[#5d87ff]"
        >
          <ArrowLeft className="size-4" />
          Voltar para unidades
        </Link>
      )}
      <PageHeader
        eyebrow={
          local
            ? 'UBS Dr. Fernando Couto'
            : unitName
              ? 'Estoque da unidade'
              : 'Central de Abastecimento Farmacêutico'
        }
        title={
          unitName
            ? `Estoque da ${unitName}`
            : local
              ? 'Estoque da minha UBS'
              : 'Estoque da CAF'
        }
        description={
          local
            ? 'Consulte os saldos exclusivos da sua unidade e identifique os itens que precisam de reposição.'
            : unitName
              ? 'Saldos exclusivos desta UBS. As quantidades armazenadas na CAF não estão incluídas.'
              : 'Medicamentos armazenados na CAF e disponíveis para abastecer as unidades da rede.'
        }
        actions={
          !isUnitStock && (
            <Button>
              <PackagePlus />
              Registrar entrada
            </Button>
          )
        }
      />
      <Card>
        <CardHeader className="flex flex-col gap-4 border-b border-[#edf1f6] pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-[11px] uppercase tracking-[0.12em] text-[#5d87ff]">
              {isUnitStock ? 'Saldo da UBS' : 'Saldo da CAF'}
            </p>
            <CardTitle className="text-[16px]">
              {isUnitStock
                ? 'Posição do estoque da unidade'
                : 'Posição do estoque central'}
            </CardTitle>
            <p className="mt-1 text-[11px] text-[#7c8fac]">
              Atualizado hoje às 08:17
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#9aa9bd]" />
            <Input
              aria-label="Buscar medicamento"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-11 rounded-lg border-[#dbe4ee] bg-white pl-10 shadow-none hover:border-[#b8c8dc] focus-visible:border-[#8fa9ff]"
              placeholder="Buscar medicamento…"
            />
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <DataTable
            headers={[
              'Medicamento',
              'Apresentação',
              'Estoque atual',
              'Estoque mínimo',
              'Cobertura',
              'Situação',
            ]}
            rows={visible.map((medicine) => {
              const stock = isUnitStock
                ? Math.max(12, Math.round(medicine.stock * 0.07))
                : medicine.stock;
              const min = isUnitStock
                ? Math.max(10, Math.round(medicine.min * 0.07))
                : medicine.min;
              const percentage = Math.min(100, Math.round((stock / min) * 55));
              return [
                <span key="med" className="font-semibold">
                  {medicine.name}
                </span>,
                medicine.form,
                `${stock.toLocaleString('pt-BR')} un.`,
                `${min.toLocaleString('pt-BR')} un.`,
                <div key="progress" className="min-w-28 space-y-1">
                  <Progress value={percentage} />
                  <span className="text-[10px] text-slate-500">
                    {percentage}% da cobertura
                  </span>
                </div>,
                <StatusBadge
                  key="status"
                  status={stock < min ? 'Pendente' : 'Ativo'}
                />,
              ];
            })}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export function MedicationsPage() {
  const [feedback, setFeedback] = useState('');
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Catálogo REMUME"
        title="Medicamentos"
        description="Mantenha o cadastro padronizado de apresentações disponíveis na rede."
        actions={
          <Dialog>
            <DialogTrigger render={<Button />}>
              <Plus />
              Cadastrar medicamento
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Novo medicamento</DialogTitle>
                <DialogDescription>
                  Cadastre o princípio ativo e a apresentação usada na rede
                  municipal.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="med-name">
                    Princípio ativo e concentração
                  </Label>
                  <Input id="med-name" placeholder="Ex.: Enalapril 10mg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="med-form">Apresentação</Label>
                  <Input id="med-form" placeholder="Ex.: Comprimido" />
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
                          'Medicamento cadastrado no catálogo REMUME.',
                        )
                      }
                    />
                  }
                >
                  Salvar cadastro
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      {feedback && (
        <output className="flex items-center gap-2 rounded-xl border border-[#bcefe4] bg-[#e8fbf7] p-3 text-sm font-semibold text-[#087b68]">
          <CheckCircle2 className="size-5" />
          {feedback}
        </output>
      )}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {medications.map((medicine) => (
          <Card
            key={medicine.name}
            className="transition-transform hover:-translate-y-0.5"
          >
            <CardContent className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#ecf2ff] text-[#5d87ff]">
                <Pill className="size-5" />
              </span>
              <div>
                <h2 className="font-semibold text-[#2a3547]">
                  {medicine.name}
                </h2>
                <p className="mt-1 text-[11px] text-[#7c8fac]">
                  {medicine.form} · {medicine.category}
                </p>
                <p className="mt-3 text-[11px] font-semibold text-[#5f6f88]">
                  Código REMUME · RM-
                  {String(medications.indexOf(medicine) + 1).padStart(4, '0')}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function UnitsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Rede municipal"
        title="Unidades Básicas de Saúde"
        description="Acompanhe a situação de abastecimento e sincronização das sete unidades."
        actions={
          <Button>
            <Plus />
            Cadastrar UBS
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {units.map((unit, index) => (
          <Card
            key={unit}
            className="transition-transform hover:-translate-y-0.5"
          >
            <CardContent>
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-[#ecf2ff] text-[#5d87ff]">
                  <Building2 className="size-5" />
                </span>
                <StatusBadge status="Ativo" />
              </div>
              <h2 className="mt-4 text-base font-bold text-[#2a3547]">
                {unit}
              </h2>
              <p className="mt-1 text-[11px] text-[#7c8fac]">
                Responsável:{' '}
                {
                  [
                    '---',
                    'Marcos Almeida',
                    'Camila Rocha',
                    'Juliana Sousa',
                    'Roberto Freire',
                    'Paulo Santos',
                    'Renata Lima',
                  ][index]
                }
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-[#f7f9fc] p-3 text-[11px]">
                <div>
                  <span className="text-[#7c8fac]">Itens críticos</span>
                  <strong className="mt-1 block text-amber-700">
                    {index % 3}
                  </strong>
                </div>
                <div>
                  <span className="text-[#7c8fac]">Última atualização</span>
                  <strong className="mt-1 block text-[#5f6f88]">
                    Hoje, 08:{17 + index}
                  </strong>
                </div>
              </div>
              <Button
                variant="outline"
                className="mt-4 w-full"
                render={
                  <Link
                    href={`/caf/estoque/ubs/${unit.toLowerCase().replaceAll(' ', '-')}`}
                  />
                }
              >
                Ver estoque
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function ReportsPage() {
  const [feedback, setFeedback] = useState('');
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Inteligência da operação"
        title="Relatórios consolidados"
        description="Analise distribuição, consumo e cobertura de estoque em toda a rede."
        actions={
          <Button
            onClick={() =>
              setFeedback('Relatório mensal preparado para download.')
            }
          >
            <Download />
            Exportar PDF
          </Button>
        }
      />
      {feedback && (
        <output className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-800">
          {feedback}
        </output>
      )}
      <Tabs defaultValue="distribution">
        <TabsList>
          <TabsTrigger value="distribution">Distribuição</TabsTrigger>
          <TabsTrigger value="stock">Estoque</TabsTrigger>
          <TabsTrigger value="expiry">Validade</TabsTrigger>
        </TabsList>
        <TabsContent
          value="distribution"
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {[
            'Distribuição por UBS',
            'Consumo por categoria',
            'Tempo médio de atendimento',
          ].map((title, index) => (
            <ReportCard
              key={title}
              title={title}
              value={['4.410 unidades', 'Analgésicos · 31%', '1,8 dias'][index]}
            />
          ))}
        </TabsContent>
        <TabsContent value="stock">
          <ReportCard title="Cobertura total da rede" value="42 dias" />
        </TabsContent>
        <TabsContent value="expiry">
          <ReportCard title="Lotes em atenção" value="18 lotes" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ReportCard({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardContent>
        <span className="grid size-11 place-items-center rounded-xl bg-[#ecf2ff] text-[#5d87ff]">
          <FileBarChart className="size-5" />
        </span>
        <p className="mt-5 text-sm font-semibold text-[#7c8fac]">{title}</p>
        <p className="mt-2 text-2xl font-bold text-[#2a3547]">{value}</p>
        <div className="mt-5 flex h-20 items-end gap-2">
          {[42, 68, 51, 79, 63, 88, 72].map((height, index) => (
            <span
              key={index}
              className="flex-1 rounded-t bg-[#5d87ff]/80"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function AuditPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Rastreabilidade"
        title="Auditoria"
        description="Consulte decisões, movimentações e acessos registrados na plataforma."
      />
      <Card>
        <CardContent className="px-0">
          <DataTable
            headers={[
              'Data e hora',
              'Evento',
              'Responsável',
              'Origem',
              'Resultado',
            ]}
            rows={technicalLogs
              .concat([
                {
                  time: '30/08, 10:11',
                  event: 'Solicitação recusada',
                  detail: 'Paulo Santos · SOL-005',
                  level: 'Atenção',
                },
              ])
              .map((log) => [
                log.time,
                <span key="event" className="font-semibold text-[#2a3547]">
                  {log.event}
                </span>,
                log.detail.split(' · ')[0],
                log.detail.split(' · ')[1] ?? 'Sistema',
                log.level,
              ])}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export function UsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Acessos da operação"
        title="Usuários"
        description="Usuários administrativos com acesso às funções farmacêuticas."
      />
      <Card>
        <CardContent className="px-0">
          <DataTable
            headers={['Nome', 'E-mail', 'Perfil', 'Status', 'Criado em']}
            rows={adminUsers.map((user) => [
              user.name,
              user.email,
              user.role,
              <StatusBadge key="status" status={user.status} />,
              user.created,
            ])}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export function SystemLogsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Monitoramento do sistema"
        title="Logs técnicos"
        description="Consulte eventos de acesso, sincronização e integridade da plataforma."
      />
      <Card>
        <CardContent className="px-0">
          <DataTable
            headers={['Data e hora', 'Evento', 'Detalhes', 'Nível']}
            rows={technicalLogs.map((log) => [
              log.time,
              <span key="event" className="text-[#2a3547]">
                {log.event}
              </span>,
              log.detail,
              log.level,
            ])}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export function SystemSettingsPage() {
  const [expiryDays, setExpiryDays] = useState(30);
  const [minimumStock, setMinimumStock] = useState(20);
  const [feedback, setFeedback] = useState('');

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Administração do sistema"
        title="Configurações"
        description="Defina regras globais para alertas e planejamento de estoque."
      />
      {feedback && (
        <output className="flex items-center gap-2 rounded-lg border border-[#bcefe4] bg-[#e8fbf7] p-3 text-[14px] text-[#087b68]">
          <CheckCircle2 className="size-5" />
          {feedback}
        </output>
      )}
      <Card className="max-w-4xl">
        <CardHeader className="border-b border-[#edf1f6] pb-5">
          <CardTitle className="text-[16px]">Parâmetros globais</CardTitle>
          <p className="mt-1 text-[12px] text-[#7c8fac]">
            Regras aplicadas em toda a rede
          </p>
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
                <span className="text-[14px] text-[#7c8fac]">dias</span>
              </div>
              <p className="text-[12px] text-[#7c8fac]">
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
                <span className="text-[14px] text-[#7c8fac]">%</span>
              </div>
              <p className="text-[12px] text-[#7c8fac]">
                Cobertura mínima antes de considerar um item crítico.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-[#edf1f6] pt-5">
            <div>
              <p className="text-[14px] text-[#2a3547]">
                Alertas por notificação
              </p>
              <p className="mt-1 text-[12px] text-[#7c8fac]">
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
    </div>
  );
}

export function HistoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="UBS Dr. Fernando Couto"
        title="Histórico de movimentações"
        description="Entradas e saídas registradas no estoque da sua unidade."
      />
      <Card>
        <CardContent className="px-0">
          <DataTable
            headers={[
              'Data',
              'Movimentação',
              'Medicamento',
              'Quantidade',
              'Referência',
            ]}
            rows={[
              [
                '28/08/2026',
                'Entrada',
                'Paracetamol 500mg',
                '+200 un.',
                'SOL-001',
              ],
              [
                '28/08/2026',
                'Entrada',
                'Dipirona 500mg',
                '+150 un.',
                'SOL-001',
              ],
              [
                '27/08/2026',
                'Dispensação',
                'Losartana 50mg',
                '-46 un.',
                'Atendimento UBS',
              ],
              [
                '26/08/2026',
                'Ajuste',
                'Insulina NPH',
                '-2 un.',
                'Avaria registrada',
              ],
            ].map((row) => row.map((cell) => cell))}
          />
        </CardContent>
      </Card>
    </div>
  );
}
