'use client';

import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProfile } from '@/components/profile-context';
import type { Profile } from '@/data/mock';

export const profileInfo = {
  ADMIN_CAF: { label: 'Administrador CAF', person: 'Helena Ribeiro', initials: 'HR', path: '/caf' },
  COORDENADOR_UBS: { label: 'Coord. UBS Fernando Couto', person: 'Ana Beatriz', initials: 'AB', path: '/ubs' },
  ADMIN_SISTEMA: { label: 'Administrador do Sistema', person: 'Gabriel Costa', initials: 'GC', path: '/admin-sistema' },
};

export function ProfileSwitcher({ onChange }: { onChange?: () => void }) {
  const router = useRouter();
  const { profile, setProfile } = useProfile();
  const current = profileInfo[profile];

  const changeProfile = (value: string | null) => {
    if (!value) return;
    const next = value as Profile;
    setProfile(next);
    router.push(profileInfo[next].path);
    onChange?.();
  };

  return (
    <Select value={profile} onValueChange={changeProfile}>
      <SelectTrigger aria-label="Alternar perfil de acesso" className="h-11 w-[184px] border-0 px-1 shadow-none sm:w-[238px]">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-blue-700 text-xs font-semibold text-white">{current.initials}</span>
        <span className="min-w-0 flex-1 text-left leading-tight"><span className="block truncate text-sm font-semibold text-slate-900">{current.person}</span><span className="block truncate text-[11px] text-slate-500">{current.label}</span></span>
        <SelectValue className="sr-only" />
      </SelectTrigger>
      <SelectContent align="end" alignItemWithTrigger={false} className="w-72 p-2">
        <div className="px-2 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Visualizar como</div>
        <SelectItem value="ADMIN_CAF" className="py-2.5">Administrador CAF</SelectItem>
        <SelectItem value="COORDENADOR_UBS" className="py-2.5">Coordenador UBS</SelectItem>
        <SelectItem value="ADMIN_SISTEMA" className="py-2.5">Administrador do Sistema</SelectItem>
      </SelectContent>
    </Select>
  );
}
