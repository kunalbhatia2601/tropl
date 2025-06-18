'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';

export function RootLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isRecruiterRoute = pathname?.startsWith('/recruiter');
  const isRecruiterLogin = pathname === '/recruiter/login';

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        {(!isRecruiterRoute || isRecruiterLogin) && <Navbar />}
        <main className="flex-1">
          {children}
        </main>
        {!isRecruiterRoute && <Footer />}
      </div>
    </AuthProvider>
  );
}