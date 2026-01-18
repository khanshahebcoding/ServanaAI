import Link from "next/link";
import { Logo } from "@/components/icons";

export function Footer() {
  return (
    <footer className="w-full bg-card">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <Logo className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold text-primary">ServanaAI</span>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ServanaAI. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground" prefetch={false}>
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
