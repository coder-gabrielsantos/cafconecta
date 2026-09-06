'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/components/profile-context';

export default function Home() {
  const router = useRouter();
  const { profile } = useProfile();

  useEffect(() => {
    router.replace(
      profile === 'ADMIN_SISTEMA'
        ? '/admin-sistema'
        : profile === 'COORDENADOR_UBS'
          ? '/ubs'
          : '/caf',
    );
  }, [profile, router]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center text-sm text-muted-foreground">
      Preparando seu painel…
    </div>
  );
}
