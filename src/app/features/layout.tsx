import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { BottomNavbar } from "@/components/landing/bottom-navbar";

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <BottomNavbar />
    </div>
  );
}
