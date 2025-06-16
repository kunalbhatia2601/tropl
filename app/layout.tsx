import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { RootLayoutWrapper } from '@/components/layout/RootLayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'tropl.ai - AI Hiring Platform',
  description: 'Streamlining Smart Hiring with AI - Professional recruitment platform for consulting companies',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootLayoutWrapper>
          {children}
        </RootLayoutWrapper>
      </body>
    </html>
  );
}