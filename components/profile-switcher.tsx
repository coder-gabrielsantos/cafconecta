'use client';

import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useProfile } from '@/components/profile-context';
import type { Profile } from '@/data/mock';
import { cn } from '@/lib/utils';

export const profileInfo = {
  ADMIN_CAF: {
    label: 'Administrador CAF',
    person: 'Helena Ribeiro',
    initials: 'HR',
    path: '/caf',
  },
  COORDENADOR_UBS: {
    label: 'Coord. UBS Fernando Couto',
    person: 'Ana Beatriz',
    initials: 'AB',
    path: '/ubs',
  },
  ADMIN_SISTEMA: {
    label: 'Administrador do Sistema',
    person: 'Gabriel Costa',
    initials: 'GC',
    path: '/admin-sistema',
  },
};

export function ProfileSwitcher({
  onChange,
  compact = false,
}: {
  onChange?: () => void;
  compact?: boolean;
}) {
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
      <SelectTrigger
        aria-label="Alternar perfil de acesso"
        className={cn(
          'border-0 bg-transparent shadow-none hover:bg-[#f5f8fd]',
          compact
            ? 'h-11 w-auto gap-2 rounded-full px-1.5 pr-2.5'
            : 'h-[58px] w-full px-2',
        )}
      >
        <span
          className={cn(
            'grid shrink-0 place-items-center rounded-full bg-[#ecf2ff] font-bold text-[#4e78ee]',
            compact ? 'size-9 text-[11px]' : 'size-10 text-xs',
          )}
        >
          {current.initials}
        </span>
        <span
          className={cn(
            'min-w-0 flex-1 text-left leading-tight',
            compact ? 'hidden lg:block' : 'block',
          )}
        >
          <span className="block truncate text-[13px] font-semibold text-[#2a3547]">
            {current.person}
          </span>
          <span className="mt-0.5 block truncate text-[10px] font-medium text-[#7c8fac]">
            {current.label}
          </span>
        </span>
        <SelectValue className="sr-only" />
      </SelectTrigger>
      <SelectContent
        align="end"
        alignItemWithTrigger={false}
        className="w-72 p-2"
      >
        <div className="px-2 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Visualizar como
        </div>
        <SelectItem value="ADMIN_CAF" className="py-2.5">
          Administrador CAF
        </SelectItem>
        <SelectItem value="COORDENADOR_UBS" className="py-2.5">
          Coordenador UBS
        </SelectItem>
        <SelectItem value="ADMIN_SISTEMA" className="py-2.5">
          Administrador do Sistema
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
