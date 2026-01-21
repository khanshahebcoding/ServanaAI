'use client';
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Database, Recycle, Bell, Network } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const assetImage = PlaceHolderImages.find((p) => p.id === "asset-module");

const features = [
    {
        icon: Database,
        title: "Centralized Inventory Control",
        content: "Gain a single source of truth for all IT assets. Track stock in/out, current assignments, and full inventory history to eliminate ghost assets and optimize utilization."
    },
    {
        icon: Recycle,
        title: "Full Asset Lifecycle Data",
        content: "From procurement to retirement, SupportEngine captures every event. Access technical specs, associated spare parts, and visual documentation for informed decision-making."
    },
    {
        icon: Bell,
        title: "Automated Warranty Alerts",
        content: "Proactively manage your contracts. Receive automated notifications for expiring warranties, ensuring continuous coverage and minimizing downtime."
    },
    {
        icon: Network,
        title: "Organizational Hierarchy Mapping",
        content: "Map assets to branches (e.g., Banani, Farmgate), departments, and designations. Includes a vendor directory to manage hardware suppliers and procurement channels."
    }
]

interface AssetFeatureContent {
    title: string;
    subtitle: string;
}

export function AssetFeature({ content }: { content?: AssetFeatureContent }) {
  const title = content?.title || "Complete Visibility and Control Over Your IT Assets";
  const subtitle = content?.subtitle || "SupportEngine's Asset Module provides a holistic view of your entire IT landscape. Go beyond simple tracking to unlock strategic insights and operational efficiency.";

  return (
    <section id="assets" className="w-full py-20 md:py-24 lg:py-32 bg-card overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            {assetImage && (
              <Image
                src={assetImage.imageUrl}
                alt={assetImage.description}
                width={800}
                height={600}
                className="rounded-xl shadow-2xl"
                data-ai-hint={assetImage.imageHint}
              />
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="space-y-2">
                <Badge variant="outline">Asset Module</Badge>
              <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl">
                {title}
              </h2>
              <p className="text-lg text-foreground/80">
                {subtitle}
              </p>
            </div>
             <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                {features.map((feature, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-base font-semibold">
                            <div className="flex items-center gap-3">
                                <feature.icon className="h-5 w-5 text-accent"/>
                                {feature.title}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-muted-foreground">
                            {feature.content}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
