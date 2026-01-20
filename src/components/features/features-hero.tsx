'use client';
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import LifecycleRibbon from "./lifecycle-ribbon";
import { Card } from "@/components/ui/card";

const heroImage = PlaceHolderImages.find((p) => p.id === "user-dashboard");

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
          <div className="mt-12 md:mt-20 w-full max-w-5xl space-y-8">
            <LifecycleRibbon currentStatusId={3} />
            <Card className="relative mx-auto rounded-xl shadow-2xl p-2 bg-background/50 backdrop-blur-sm">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={1200}
                  height={780}
                  className="rounded-lg object-cover"
                  data-ai-hint={heroImage.imageHint}
                  priority
                />
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
