import { Sidebar } from '@/components/dashboard/Sidebar';

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-gray-100">
      
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
} 