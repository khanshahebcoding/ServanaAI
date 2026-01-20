'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Package, BadgeDollarSign, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const leftLinks = [
  { href: '#features', label: 'Features', icon: LayoutGrid },
  { href: '#assets', label: 'Assets', icon: Package },
];

const rightLinks = [
    { href: '#pricing', label: 'Pricing', icon: BadgeDollarSign },
    { href: '#documentation',label: 'Documentation', icon: FileText },
];


export function BottomNavbar() {
  const pathname = usePathname();

  const getHref = (href: string) => {
      if (pathname === '/features') {
          return `/${href}`;
      }
      return href;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/80 backdrop-blur-sm md:hidden">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left Links */}
        <div className="flex w-2/5 items-center justify-around">
            {leftLinks.map((link) => {
                const Icon = link.icon;
                return (
                    <Link
                    key={link.label}
                    href={getHref(link.href)}
                    className={cn(
                        'flex flex-col items-center justify-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary'
                    )}
                    >
                        <Icon className="h-5 w-5" />
                        <span>{link.label}</span>
                    </Link>
                )
            })}
        </div>

        {/* Middle Home Button */}
        <div className="relative">
            <Link
                href="/"
                className="relative -top-6 flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-full bg-primary text-primary-foreground shadow-lg"
            >
                <Home className="h-6 w-6" />
                <span className="text-xs font-bold">Home</span>
            </Link>
        </div>

        {/* Right Links */}
        <div className="flex w-2/5 items-center justify-around">
            {rightLinks.map((link) => {
                const Icon = link.icon;
                return (
                    <Link
                    key={link.label}
                    href={getHref(link.href)}
                    className={cn(
                        'flex flex-col items-center justify-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary'
                    )}
                    >
                        <Icon className="h-5 w-5" />
                        <span>{link.label}</span>
                    </Link>
                )
            })}
        </div>
      </div>
    </nav>
  );
}
