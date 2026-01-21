'use client';
import { Button } from "@/components/ui/button";
import { DashboardMockup } from "./dashboard-mockup";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState } from "react";
import { ContactSalesDialog } from "./contact-sales-dialog";

interface HeroContent {
  title: string;
  subtitle: string;
}

export function Hero({ content }: { content?: HeroContent }) {
  const [isContactSalesOpen, setIsContactSalesOpen] = useState(false);
  const title = content?.title || "Revolutionize Your IT Support with SupportEngine";
  const subtitle = content?.subtitle || "SupportEngine integrates intelligent automation to manage incidents, assets, and analytics seamlessly, empowering your support teams to deliver exceptional service.";
  
  return (
    <>
      <section id="home" className="relative w-full pt-24 md:pt-32 lg:pt-40 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at top left, hsl(238 100% 70% / 0.5), transparent 40%), radial-gradient(circle at bottom right, hsl(262 84% 59% / 0.5), transparent 40%)",
          }}
        />
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-6 text-center"
          >
            <div className="space-y-4">
              <Badge variant="secondary" className="rounded-full px-4 py-1 text-sm font-medium">
                Powered By ServanaAI
              </Badge>
              <h1 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                {title}
              </h1>
              <p className="mx-auto max-w-[700px] text-lg text-foreground/80 md:text-xl">
                {subtitle}
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="sm:w-auto" onClick={() => setIsContactSalesOpen(true)}>
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="sm:w-auto bg-white" onClick={() => setIsContactSalesOpen(true)}>
                Book a Demo
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mt-12 md:mt-20"
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </section>
      <ContactSalesDialog open={isContactSalesOpen} onOpenChange={setIsContactSalesOpen} />
    </>
  );
}
