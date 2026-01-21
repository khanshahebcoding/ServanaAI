'use client';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";

const explorerImage = PlaceHolderImages.find((p) => p.id === "product-explorer");

interface ProductExplorerContent {
  title: string;
}

export function ProductExplorer({ content }: { content?: ProductExplorerContent }) {
  const title = content?.title || "Explore SupportEngine in Action";

  return (
    <section id="documentation" className="w-full py-20 md:py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="container mx-auto px-4 md:px-6"
      >
        <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground">
          {explorerImage && (
            <Image
              src={explorerImage.imageUrl}
              alt={explorerImage.description}
              fill
              className="object-cover opacity-10"
              data-ai-hint={explorerImage.imageHint}
            />
          )}
          <div className="relative z-10 grid gap-8 p-8 md:p-16 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {title}
              </h2>
              <p className="max-w-[600px] text-lg text-primary-foreground/80 md:text-xl">
                Words can only say so much. See for yourself how SupportEngine can
                revolutionize your IT support. Schedule a personalized demo
                with one of our product experts today.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" variant="secondary">
                  Book a Demo
                </Button>
                <Button size="lg" variant="link" className="text-primary-foreground">
                  Read Documentation &rarr;
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
