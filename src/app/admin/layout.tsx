'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter
} from '@/components/ui/sidebar';
import { LayoutDashboard, Users, FileText, PencilRuler, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from '@/components/icons';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };
  
  useEffect(() => {
    // A simple client-side check to redirect if not admin.
    // Proper security is enforced by Firestore rules.
    if (!isUserLoading && (!user || user.uid !== 'y4poDUkAStdmtsyUArHKXziEANn1')) {
        router.push('/');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user || user.uid !== 'y4poDUkAStdmtsyUArHKXziEANn1') {
      return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <p>Loading...</p>
        </div>
      );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
            <div className="flex items-center gap-2">
                <div className="bg-primary text-primary-foreground rounded-full p-2">
                    <Logo className="h-6 w-6" />
                </div>
                <span className="text-xl font-bold text-foreground">ServanaAI</span>
            </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/admin/dashboard'}>
                <Link href="/admin/dashboard">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/content')}>
                <Link href="/admin/content">
                  <PencilRuler />
                  Content
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/users')}>
                <Link href="/admin/users">
                  <Users />
                  Users
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/submissions')}>
                <Link href="/admin/submissions">
                  <FileText />
                  Submissions
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <div className="flex items-center gap-3 p-2">
                <Avatar>
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-semibold text-sm">Admin</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
            </div>
            <Button variant="ghost" onClick={handleLogout} className="w-full justify-start">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="p-4 md:p-8">
            <header className="flex items-center justify-between mb-8">
                <SidebarTrigger className="md:hidden"/>
                <div className="flex-1" />
                <h1 className="text-2xl font-bold text-center">Admin Dashboard</h1>
                 <div className="flex-1" />
            </header>
            <main>{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
