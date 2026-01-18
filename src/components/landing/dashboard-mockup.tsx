"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card } from "@/components/ui/card";

const dashboardImage = PlaceHolderImages.find(p => p.id === 'dashboard-mockup');

export function DashboardMockup() {
  return (
    <Card className="relative mx-auto rounded-xl shadow-2xl p-2 bg-background/50 backdrop-blur-sm">
      {dashboardImage && (
           <Image
              src={dashboardImage.imageUrl}
              alt={dashboardImage.description}
              width={1200}
              height={780}
              className="rounded-lg object-cover"
              data-ai-hint={dashboardImage.imageHint}
              priority
            />
      )}
    </Card>
  );
}
