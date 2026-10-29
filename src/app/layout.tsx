import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ObjectionLab — Simulador de Focus Group Sintético & Auditor de CRO',
  description:
    'Audite a eficácia e objeções da sua Landing Page ou Anúncio com agentes sintéticos paralelos antes de gastar dinheiro com tráfego pago.',
  keywords: [
    'Focus Group Sintético',
    'CRO',
    'Copywriting',
    'Landing Page Auditor',
    'Inteligência Artificial',
    'Vercel AI SDK',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
