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

const assetImage = PlaceHolderImages.find((p) => p.id === "asset-module");

const features = [
    {
        icon: Database,
        title: "Centralized Inventory Control",
        content: "Gain a single source of truth for all your hardware, software, and cloud assets. Track ownership, status, and location in real-time to eliminate ghost assets and optimize utilization."
    },
    {
        icon: Recycle,
        title: "Full Asset Lifecycle Data",
        content: "From procurement and deployment to maintenance and retirement, SupportEngine captures every event. Make informed decisions on refresh cycles and budget planning with complete historical data."
    },
    {
        icon: Bell,
        title: "Automated Warranty & License Alerts",
        content: "Proactively manage your contracts. Receive automated notifications for expiring warranties and software licenses, ensuring continuous coverage and compliance while avoiding unnecessary costs."
    },
    {
        icon: Network,
        title: "Organizational Hierarchy Mapping",
        content: "Map assets to specific users, departments, and physical locations. This contextual data is crucial for rapid incident resolution, accurate cost allocation, and effective change management."
    }
]

export function AssetFeature() {
  return (
    <section id="assets" className="w-full py-20 md:py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
          <div className="relative">
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
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
                <Badge variant="outline">Asset Module</Badge>
              <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl">
                Complete Visibility and Control Over Your IT Assets
              </h2>
              <p className="text-lg text-foreground/80">
                SupportEngine's Asset Module transforms how you manage your IT landscape. 
                Go beyond simple tracking and unlock strategic insights.
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
          </div>
        </div>
      </div>
    </section>
  );
}
