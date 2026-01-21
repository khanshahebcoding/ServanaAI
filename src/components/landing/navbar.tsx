"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons";
import { useUser, useAuth, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { signOut } from "firebase/auth";
import { doc } from "firebase/firestore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ContactSalesDialog } from "./contact-sales-dialog";

const navLinksData = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#assets", label: "Assets" },
  { href: "#pricing", label: "Pricing" },
  { href: "#documentation", label: "Documentation" },
];

const ADMIN_UID = 'y4poDUkAStdmtsyUArHKXziEANn1';

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [isContactSalesOpen, setIsContactSalesOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isFeaturesPage = pathname === '/features';
  
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(() => (user ? doc(firestore, 'users', user.uid) : null), [user, firestore]);
  const { data: userProfile } = useDoc<{firstName: string}>(userDocRef);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  
  const handleDashboardClick = () => {
    if (user && user.uid === ADMIN_UID) {
      router.push('/admin/dashboard');
    } else {
      router.push('/dashboard');
    }
  };

  const navLinks = navLinksData.map(link => {
    let newHref = link.href;
    if (isFeaturesPage) {
      if (link.href === '#home') {
        newHref = '/';
      } else {
        newHref = `/${link.href}`;
      }
    }
    return { ...link, href: newHref };
  });

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-background/80 shadow-md backdrop-blur-sm" : "bg-transparent"
        )}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <div className="bg-primary text-primary-foreground rounded-full p-2">
              <Logo className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-foreground">ServanaAI</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                prefetch={false}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            {isUserLoading ? (
              <Skeleton className="h-10 w-24 rounded-md" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? ''} />
                      <AvatarFallback>
                        {user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userProfile?.firstName || user.email}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleDashboardClick}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost">
                  <Link href="/login">Login</Link>
                </Button>
                <Button onClick={() => setIsContactSalesOpen(true)}>Get Started</Button>
              </div>
            )}
          </div>
        </div>
      </header>
      <ContactSalesDialog open={isContactSalesOpen} onOpenChange={setIsContactSalesOpen} />
    </>
  );
}
