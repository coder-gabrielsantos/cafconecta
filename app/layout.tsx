import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { AppShell } from '@/components/app-shell';
import { ProfileProvider } from '@/components/profile-context';
import './globals.css';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CAF Conecta | Gestão Farmacêutica Municipal',
  description:
    'Gestão integrada de estoque e abastecimento farmacêutico de Coelho Neto–MA.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      'https://caf-conecta-coelho-neto.maxcrowleyadz.chatgpt.site',
  ),
  openGraph: {
    title: 'CAF Conecta',
    description: 'Gestão farmacêutica municipal integrada',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'CAF Conecta — gestão farmacêutica municipal integrada',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CAF Conecta',
    description: 'Gestão farmacêutica municipal integrada',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${manrope.variable} antialiased`}>
        <ProfileProvider>
          <AppShell>{children}</AppShell>
        </ProfileProvider>
      </body>
    </html>
  );
}
