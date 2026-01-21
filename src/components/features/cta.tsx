'use client';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

interface CtaContent {
  title: string;
  subtitle: string;
}

export function Cta({ content }: { content?: CtaContent }) {
  const title = content?.title || "Ready to Revolutionize Your IT?";
  const subtitle = content?.subtitle || "Schedule a personalized demo to see how SupportEngine can empower your IT infrastructure.";

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full py-20 md:py-24 lg:py-32 bg-gradient-to-r from-navy to-primary"
    >
      <div className="container mx-auto px-4 md:px-6 text-center text-primary-foreground">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {title}
        </h2>
        <p className="mt-4 mx-auto max-w-xl text-lg text-primary-foreground/80">
          {subtitle}
        </p>
        <div className="mt-8">
          <Button size="lg" variant="secondary">
            Request a Demo
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
