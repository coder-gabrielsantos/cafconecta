'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Activity,
  Bell,
  Boxes,
  Building2,
  ClipboardClock,
  ClipboardList,
  History,
  LayoutDashboard,
  Menu,
  PackagePlus,
  Pill,
  Search,
  SlidersHorizontal,
  UserRoundCog,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProfile } from '@/components/profile-context';
import { ProfileSwitcher } from '@/components/profile-switcher';
import { cn } from '@/lib/utils';

const menuGroups = {
  ADMIN_CAF: [
    {
      label: 'OPERAÇÃO',
      items: [
        ['Visão geral', '/caf', LayoutDashboard],
        ['Solicitações', '/caf/solicitacoes', ClipboardList],
        ['Estoque central', '/caf/estoque', Boxes],
      ],
    },
    {
      label: 'CADASTROS',
      items: [
        ['Medicamentos', '/caf/medicamentos', Pill],
        ['Unidades', '/caf/unidades', Building2],
      ],
    },
  ],
  COORDENADOR_UBS: [
    {
      label: 'MINHA UNIDADE',
      items: [
        ['Visão geral', '/ubs', LayoutDashboard],
        ['Solicitações', '/ubs/solicitacoes', ClipboardList],
        ['Meu estoque', '/ubs/estoque', Boxes],
        ['Histórico', '/ubs/historico', History],
        ['Nova solicitação', '/ubs/solicitacoes/nova', PackagePlus],
      ],
    },
  ],
  ADMIN_SISTEMA: [
    {
      label: 'ADMINISTRAÇÃO',
      items: [
        ['Visão geral', '/admin-sistema', Activity],
        ['Usuários', '/admin-sistema/usuarios', UserRoundCog],
        ['Logs técnicos', '/admin-sistema/logs', ClipboardClock],
        ['Configurações', '/admin-sistema/configuracoes', SlidersHorizontal],
      ],
    },
  ],
} as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { profile } = useProfile();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState('');
  const groups = menuGroups[profile];
  const flatItems = groups.flatMap((group) =>
    group.items.map((item) => ({ group: group.label, item })),
  );
  const isUnitInventory = pathname.startsWith('/caf/estoque/ubs/');
  const activeEntry = isUnitInventory
    ? undefined
    : flatItems
        .filter(
          ({ item: [, href] }) =>
            pathname === href || pathname.startsWith(`${href}/`),
        )
        .sort((a, b) => b.item[1].length - a.item[1].length)[0];
  const activeHref = activeEntry?.item[1];
  const searchResults =
    search.trim().length > 1
      ? flatItems
          .filter(({ item: [label] }) =>
            label.toLowerCase().includes(search.trim().toLowerCase()),
          )
          .slice(0, 5)
      : [];

  const openResult = (href: string) => {
    setSearch('');
    setMobileOpen(false);
    router.push(href);
  };

  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 flex h-[72px] items-center border-b border-[#edf1f6] bg-white/95 px-4 backdrop-blur-xl transition-[left] duration-200 md:px-6 lg:px-8',
          collapsed ? 'md:left-[86px]' : 'md:left-[252px]',
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="mr-3 md:hidden"
          aria-label="Abrir menu"
          onClick={() => setMobileOpen(true)}
        >
          <Menu />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="mr-4 hidden text-[#7c8fac] md:inline-flex"
          aria-label={
            collapsed ? 'Expandir menu lateral' : 'Recolher menu lateral'
          }
          onClick={() => setCollapsed((value) => !value)}
        >
          <Menu className="size-[19px]" />
        </Button>

        <div className="relative hidden w-full max-w-[390px] sm:block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-[17px] -translate-y-1/2 text-[#9aa9bd]" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && searchResults[0])
                openResult(searchResults[0].item[1]);
              if (event.key === 'Escape') setSearch('');
            }}
            aria-label="Buscar uma tela"
            placeholder="Buscar no CAF Conecta"
            className="h-10 border-transparent bg-[#f7f9fc] pl-10 pr-14 focus-visible:border-[#cbd9ff] focus-visible:bg-white"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-[#e3eaf2] bg-white px-1.5 py-0.5 text-[9px] font-bold text-[#9aa9bd] lg:block">
            ENTER
          </span>
          {searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-xl border border-[#e8eef5] bg-white p-1.5 shadow-[0_16px_40px_rgb(37_48_83/0.14)]">
              {searchResults.map(({ group, item: [label, href, Icon] }) => (
                <button
                  key={href}
                  type="button"
                  onClick={() => openResult(href)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-[#f3f7ff]"
                >
                  <span className="grid size-8 place-items-center rounded-lg bg-[#ecf2ff] text-[#5d87ff]">
                    <Icon className="size-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-[#2a3547]">
                      {label}
                    </span>
                    <span className="block text-[11px] text-[#7c8fac]">
                      {group.charAt(0) + group.slice(1).toLowerCase()}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full text-[#7c8fac]"
            aria-label="Notificações"
          >
            <Bell className="size-[19px]" />
            <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-white bg-[#fa896b]" />
          </Button>
          <ProfileSwitcher compact onChange={() => setMobileOpen(false)} />
        </div>
      </header>

      {mobileOpen && (
        <button
          className="fixed inset-0 z-40 bg-[#2a3547]/35 backdrop-blur-[2px] md:hidden"
          aria-label="Fechar menu"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[252px] flex-col border-r border-[#edf1f6] bg-white transition-[width,transform] duration-200 md:translate-x-0',
          collapsed && 'md:w-[86px]',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div
          className={cn(
            'relative flex h-[72px] shrink-0 items-center justify-center border-b border-[#edf1f6] px-12',
            collapsed && 'md:px-2',
          )}
        >
          <p
            className={cn(
              'truncate text-center text-[20px] font-medium tracking-[-0.025em] text-[#2a3547]',
              collapsed && 'md:hidden',
            )}
          >
            CAF Conecta
          </p>
          <Button
            variant="ghost"
            size="icon-sm"
            className="absolute right-3 md:hidden"
            aria-label="Fechar menu"
            onClick={() => setMobileOpen(false)}
          >
            <X />
          </Button>
        </div>

        <nav
          className="soft-scrollbar flex-1 overflow-y-auto px-3 py-4"
          aria-label="Navegação principal"
        >
          <div className="space-y-5">
            {groups.map((group) => (
              <div key={group.label}>
                <p
                  className={cn(
                    'mb-2 px-3 text-[10px] font-bold uppercase tracking-[.14em] text-[#97a6bb]',
                    collapsed && 'md:hidden',
                  )}
                >
                  {group.label}
                </p>
                <div className="space-y-1">
                  {group.items.map(([label, href, Icon]) => {
                    const active = href === activeHref;
                    return (
                      <Link
                        key={href}
                        href={href}
                        title={collapsed ? label : undefined}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          'relative flex min-h-[44px] items-center gap-3 rounded-[9px] px-3 text-[14px] font-semibold transition-all',
                          collapsed && 'md:justify-center md:px-0',
                          active
                            ? 'bg-[#5d87ff] text-white shadow-[0_7px_16px_rgb(93_135_255/0.23)]'
                            : 'text-[#5f6f88] hover:bg-[#ecf2ff] hover:text-[#3765e5]',
                        )}
                      >
                        <Icon
                          className={cn(
                            'size-[18px] shrink-0',
                            active ? 'text-white' : 'text-[#7c8fac]',
                          )}
                          strokeWidth={1.9}
                        />
                        <span className={cn(collapsed && 'md:hidden')}>
                          {label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>

        <div className={cn('p-4 pt-2', collapsed && 'md:px-3')}>
          <div className="border-t border-[#edf1f6] pt-4 text-center">
            <p
              className={cn(
                'text-[12px] text-[#8b9bb3]',
                collapsed && 'md:hidden',
              )}
            >
              Versão 1.0.0
            </p>
            <p
              className={cn(
                'hidden text-[11px] text-[#8b9bb3]',
                collapsed && 'md:block',
              )}
            >
              v1.0
            </p>
          </div>
        </div>
      </aside>

      <main
        className={cn(
          'min-h-screen pt-[72px] transition-[padding] duration-200',
          collapsed ? 'md:pl-[86px]' : 'md:pl-[252px]',
        )}
      >
        <div className="page-enter mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-9 xl:px-10">
          {children}
        </div>
      </main>
    </div>
  );
}
