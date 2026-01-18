import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import LifecycleRibbon from "./lifecycle-ribbon";

const heroImage = PlaceHolderImages.find((p) => p.id === "incident-pipeline-mockup");

export function FeaturesHero() {
  return (
    <section className="w-full pt-24 md:pt-32 lg:pt-40 pb-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tighter text-navy sm:text-5xl md:text-6xl lg:text-7xl">
              AI-Driven ITSM: Empowering Your IT Infrastructure with SupportEngine.
            </h1>
            <p className="mx-auto max-w-[800px] text-lg text-gray-600 md:text-xl">
              From automated incident resolution to intelligent asset lifecycle tracking, experience the future of service management.
            </p>
          </div>
          <div className="relative mt-12 md:mt-20 w-full max-w-5xl">
            {heroImage && (
                 <div className="absolute inset-0 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg p-8">
                     <LifecycleRibbon currentStatusId={3} />
                 </div>
            )}
            <div className="relative bg-white/30 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg p-8 invisible">
                 <LifecycleRibbon currentStatusId={3} />
             </div>

          </div>
        </div>
      </div>
    </section>
  );
}
