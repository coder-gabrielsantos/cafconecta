'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Activity, Bell, Boxes, Building2, ClipboardClock, ClipboardList, FileBarChart,
  History, LayoutDashboard, Menu, PackagePlus, Pill, ScrollText, Search,
  ShieldCheck, SlidersHorizontal, UserRoundCog, Users, X,
} from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useProfile } from '@/components/profile-context';
import { ProfileSwitcher, profileInfo } from '@/components/profile-switcher';
import { cn } from '@/lib/utils';

const menus = {
  ADMIN_CAF: [
    ['Dashboard', '/caf', LayoutDashboard], ['Solicitações', '/caf/solicitacoes', ClipboardList],
    ['Estoque Central', '/caf/estoque', Boxes], ['Estoque UBS', '/caf/estoque/ubs/ubs-centro', Building2],
    ['Medicamentos', '/caf/medicamentos', Pill], ['Unidades (UBS)', '/caf/unidades', Building2],
    ['Usuários', '/caf/usuarios', Users], ['Relatórios', '/caf/relatorios', FileBarChart],
    ['Auditoria', '/caf/auditoria', ScrollText],
  ],
  COORDENADOR_UBS: [
    ['Dashboard', '/ubs', LayoutDashboard], ['Minhas solicitações', '/ubs/solicitacoes', ClipboardList],
    ['Meu estoque', '/ubs/estoque', Boxes], ['Histórico', '/ubs/historico', History],
    ['Nova solicitação', '/ubs/solicitacoes/nova', PackagePlus],
  ],
  ADMIN_SISTEMA: [
    ['Visão geral', '/admin-sistema', Activity], ['Usuários administrativos', '/admin-sistema/usuarios', UserRoundCog],
    ['Logs técnicos', '/admin-sistema/logs', ClipboardClock], ['Configurações globais', '/admin-sistema/configuracoes', SlidersHorizontal],
  ],
} as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { profile } = useProfile();
  const [mobileOpen, setMobileOpen] = useState(false);
  const current = profileInfo[profile];

  return (
    <div className="min-h-screen bg-slate-50/80">
      <header className="fixed inset-x-0 top-0 z-40 flex h-[72px] items-center border-b bg-white px-4 md:pl-[268px] md:pr-7">
        <Button variant="ghost" size="icon" className="mr-2 md:hidden" aria-label="Abrir menu" onClick={() => setMobileOpen(true)}><Menu /></Button>
        <div className="relative hidden max-w-[560px] flex-1 sm:block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input aria-label="Busca global" className="h-10 border-slate-200 bg-slate-50 pl-10" placeholder="Buscar solicitações, medicamentos, unidades…" />
        </div>
        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" className="relative" aria-label="Notificações"><Bell className="size-5" /><span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-red-500 ring-2 ring-white" /></Button>
          <ProfileSwitcher onChange={() => setMobileOpen(false)} />
        </div>
      </header>

      {mobileOpen && <button className="fixed inset-0 z-40 bg-slate-950/30 md:hidden" aria-label="Fechar menu" onClick={() => setMobileOpen(false)} />}
      <aside className={cn('fixed inset-y-0 left-0 z-50 flex w-[240px] flex-col border-r bg-white transition-transform md:translate-x-0', mobileOpen ? 'translate-x-0' : '-translate-x-full')}>
        <div className="flex h-[72px] items-center gap-3 border-b px-5">
          <span className="grid size-10 place-items-center rounded-xl bg-blue-800 text-white shadow-sm"><ShieldCheck className="size-6" /></span>
          <div><p className="text-[17px] font-bold tracking-tight text-slate-950">CAF Conecta</p><p className="text-[10px] font-medium uppercase tracking-[.14em] text-slate-500">Coelho Neto · MA</p></div>
          <Button variant="ghost" size="icon-sm" className="ml-auto md:hidden" aria-label="Fechar menu" onClick={() => setMobileOpen(false)}><X /></Button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-5" aria-label="Navegação principal">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[.16em] text-slate-400">Menu principal</p>
          <div className="space-y-1">
            {menus[profile].map(([label, href, Icon]) => {
              const active = href === current.path ? pathname === href : pathname.startsWith(href);
              return <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={cn('flex min-h-10 items-center gap-3 rounded-lg px-3 text-[13px] font-medium transition-colors', active ? 'bg-blue-50 text-blue-800' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950')}><Icon className="size-[18px]" />{label}</Link>;
            })}
          </div>
        </nav>
        <div className="border-t p-4">
          <div className="rounded-xl bg-slate-50 p-3"><div className="flex items-center gap-2 text-xs font-medium text-emerald-700"><span className="size-2 rounded-full bg-emerald-500" />Sistema operacional</div><p className="mt-1.5 text-[10px] text-slate-500">Dados atualizados hoje, 08:17</p></div>
        </div>
      </aside>

      <main className="min-h-screen pt-[72px] md:pl-[240px]">
        <div className="mx-auto w-full max-w-[1520px] p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
