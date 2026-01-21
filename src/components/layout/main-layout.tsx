'use client';

import { usePathname } from 'next/navigation';
import { SocialSidebar } from '@/components/landing/social-sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <>
      {children}
      {!isAdminPage && <SocialSidebar />}
    </>
  );
}
