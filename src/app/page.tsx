import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Workflow } from "@/components/landing/workflow";
import { AssetFeature } from "@/components/landing/asset-feature";
import { Pricing } from "@/components/landing/pricing";
import { ProductExplorer } from "@/components/landing/product-explorer";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Workflow />
        <AssetFeature />
        <Pricing />
        <ProductExplorer />
      </main>
      <Footer />
    </div>
  );
}
