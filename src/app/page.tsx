'use client';
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { TrustedBy } from "@/components/landing/trusted-by";
import { Footer } from "@/components/landing/footer";
import { Workflow } from "@/components/landing/workflow";
import { AssetFeature } from "@/components/landing/asset-feature";
import { Pricing } from "@/components/landing/pricing";
import { ProductExplorer } from "@/components/landing/product-explorer";
import { BottomNavbar } from "@/components/landing/bottom-navbar";
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const firestore = useFirestore();
  const contentDocRef = useMemoFirebase(() => firestore ? doc(firestore, 'content', 'home') : null, [firestore]);
  const { data: content, isLoading } = useDoc<any>(contentDocRef);

  if (isLoading) {
      return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />
            <main className="flex-1 space-y-4 pt-20">
                <Skeleton className="h-[80vh] w-full" />
                <Skeleton className="h-[20vh] w-full" />
                <Skeleton className="h-[60vh] w-full" />
            </main>
            <Footer />
        </div>
      )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">
        <Hero content={content?.hero} />
        <TrustedBy />
        <Workflow content={content?.workflow} />
        <AssetFeature content={content?.assetFeature} />
        <Pricing content={content?.pricing} />
        <ProductExplorer content={content?.productExplorer} />
      </main>
      <Footer />
      <BottomNavbar />
    </div>
  );
}
