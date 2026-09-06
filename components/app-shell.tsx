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

const menuGroups = {
  ADMIN_CAF: [
    { label: 'Operação', items: [['Visão geral', '/caf', LayoutDashboard], ['Solicitações', '/caf/solicitacoes', ClipboardList], ['Estoque central', '/caf/estoque', Boxes], ['Estoque das UBS', '/caf/estoque/ubs/ubs-centro', Building2]] },
    { label: 'Cadastros', items: [['Medicamentos', '/caf/medicamentos', Pill], ['Unidades', '/caf/unidades', Building2]] },
    { label: 'Gestão', items: [['Usuários', '/caf/usuarios', Users], ['Relatórios', '/caf/relatorios', FileBarChart], ['Auditoria', '/caf/auditoria', ScrollText]] },
  ],
  COORDENADOR_UBS: [
    { label: 'Minha unidade', items: [['Visão geral', '/ubs', LayoutDashboard], ['Solicitações', '/ubs/solicitacoes', ClipboardList], ['Meu estoque', '/ubs/estoque', Boxes], ['Histórico', '/ubs/historico', History], ['Nova solicitação', '/ubs/solicitacoes/nova', PackagePlus]] },
  ],
  ADMIN_SISTEMA: [
    { label: 'Administração', items: [['Visão geral', '/admin-sistema', Activity], ['Usuários', '/admin-sistema/usuarios', UserRoundCog], ['Logs técnicos', '/admin-sistema/logs', ClipboardClock], ['Configurações', '/admin-sistema/configuracoes', SlidersHorizontal]] },
  ],
} as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { profile } = useProfile();
  const [mobileOpen, setMobileOpen] = useState(false);
  const current = profileInfo[profile];

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur md:pl-[248px] md:pr-8">
        <Button variant="ghost" size="icon" className="mr-2 md:hidden" aria-label="Abrir menu" onClick={() => setMobileOpen(true)}><Menu /></Button>
        <div className="relative hidden max-w-[480px] flex-1 sm:block">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input aria-label="Busca global" className="h-9 rounded-lg border-transparent bg-slate-100/75 pl-10 shadow-none placeholder:text-slate-400 focus-visible:border-slate-300 focus-visible:bg-white" placeholder="Buscar no CAF Conecta" />
        </div>
        <div className="ml-auto flex items-center gap-1 sm:gap-3">
          <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-900" aria-label="Notificações"><Bell className="size-[18px]" /><span className="absolute right-2 top-1.5 size-1.5 rounded-full bg-red-500 ring-2 ring-white" /></Button>
          <ProfileSwitcher onChange={() => setMobileOpen(false)} />
        </div>
      </header>

      {mobileOpen && <button className="fixed inset-0 z-40 bg-slate-950/30 md:hidden" aria-label="Fechar menu" onClick={() => setMobileOpen(false)} />}
      <aside className={cn('fixed inset-y-0 left-0 z-50 flex w-[224px] flex-col border-r border-slate-200/80 bg-white transition-transform md:translate-x-0', mobileOpen ? 'translate-x-0' : '-translate-x-full')}>
        <div className="flex h-16 items-center gap-3 border-b border-slate-200/80 px-4">
          <span className="grid size-9 place-items-center rounded-lg bg-[#173b74] text-white"><ShieldCheck className="size-5" /></span>
          <div><p className="text-[15px] font-bold tracking-[-0.02em] text-slate-950">CAF Conecta</p><p className="text-[9px] font-semibold uppercase tracking-[.12em] text-slate-400">Coelho Neto · MA</p></div>
          <Button variant="ghost" size="icon-sm" className="ml-auto md:hidden" aria-label="Fechar menu" onClick={() => setMobileOpen(false)}><X /></Button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Navegação principal">
          <div className="space-y-5">
            {menuGroups[profile].map((group) => (
              <div key={group.label}>
                <p className="mb-1.5 px-2.5 text-[9px] font-semibold uppercase tracking-[.12em] text-slate-400">{group.label}</p>
                <div className="space-y-0.5">
                  {group.items.map(([label, href, Icon]) => {
                    const active = href === current.path ? pathname === href : pathname.startsWith(href);
                    return <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={cn('flex min-h-9 items-center gap-3 rounded-md px-2.5 text-[12px] font-medium transition-colors', active ? 'bg-slate-100 text-slate-950' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900')}><Icon className={cn('size-4', active ? 'text-[#173b74]' : 'text-slate-400')} />{label}</Link>;
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>
        <div className="border-t border-slate-200/80 px-5 py-4">
          <div className="flex items-center gap-2 text-[11px] text-slate-500"><span className="size-1.5 rounded-full bg-emerald-500" />Dados sincronizados · 08:17</div>
        </div>
      </aside>

      <main className="min-h-screen pt-16 md:pl-[224px]">
        <div className="mx-auto w-full max-w-[1380px] p-4 sm:p-7 lg:px-10 lg:py-8">{children}</div>
      </main>
    </div>
  );
}
