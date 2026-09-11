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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000');

export const metadata: Metadata = {
  title: 'CAF Conecta | Gestão Farmacêutica Municipal',
  description:
    'Gestão integrada de estoque e abastecimento farmacêutico de Coelho Neto–MA.',
  metadataBase: new URL(siteUrl),
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
