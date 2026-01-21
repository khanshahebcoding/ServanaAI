'use client';
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import LifecycleRibbon from "./lifecycle-ribbon";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const heroImage = PlaceHolderImages.find((p) => p.id === "user-dashboard");

interface FeaturesHeroContent {
  title: string;
  subtitle: string;
}

export function FeaturesHero({ content }: { content?: FeaturesHeroContent }) {
  const title = content?.title || "AI-Driven ITSM: Empowering Your IT Infrastructure with SupportEngine.";
  const subtitle = content?.subtitle || "From automated incident resolution to intelligent asset lifecycle tracking, experience the future of service management.";
  
  return (
    <section className="w-full pt-24 md:pt-32 lg:pt-40 pb-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-6 text-center"
        >
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tighter text-navy sm:text-5xl md:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="mx-auto max-w-[800px] text-lg text-gray-600 md:text-xl">
              {subtitle}
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 md:mt-20 w-full max-w-5xl space-y-8"
          >
            <LifecycleRibbon currentStatusId={3} />
            <Card className="relative mx-auto rounded-xl shadow-2xl overflow-hidden bg-background/50 backdrop-blur-sm">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={1200}
                  height={780}
                  className="rounded-lg object-cover w-full h-auto"
                  data-ai-hint={heroImage.imageHint}
                  priority
                />
              )}
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
