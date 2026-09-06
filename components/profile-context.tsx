'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { Profile } from '@/data/mock';

type ProfileContextValue = { profile: Profile; setProfile: (profile: Profile) => void };
const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<Profile>('ADMIN_CAF');

  useEffect(() => {
    const saved = window.localStorage.getItem('caf-conecta-profile') as Profile | null;
    if (saved && ['ADMIN_SISTEMA', 'ADMIN_CAF', 'COORDENADOR_UBS'].includes(saved)) setProfileState(saved);
  }, []);

  const setProfile = (next: Profile) => {
    setProfileState(next);
    window.localStorage.setItem('caf-conecta-profile', next);
  };

  return <ProfileContext.Provider value={{ profile, setProfile }}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const value = useContext(ProfileContext);
  if (!value) throw new Error('useProfile deve ser usado dentro de ProfileProvider');
  return value;
}
