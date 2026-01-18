import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { TrustedBy } from "@/components/landing/trusted-by";
import { Footer } from "@/components/landing/footer";
import { Workflow } from "@/components/landing/workflow";
import { AssetFeature } from "@/components/landing/asset-feature";
import { Pricing } from "@/components/landing/pricing";
import { ProductExplorer } from "@/components/landing/product-explorer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustedBy />
        <Workflow />
        <AssetFeature />
        <Pricing />
        <ProductExplorer />
      </main>
      <Footer />
    </div>
  );
}
