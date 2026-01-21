"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card } from "@/components/ui/card";

const defaultDashboardImage = PlaceHolderImages.find(p => p.id === 'dashboard-mockup');

export function DashboardMockup({ imageUrl }: { imageUrl?: string }) {
  const imageToDisplay = imageUrl || defaultDashboardImage?.imageUrl;
  const description = defaultDashboardImage?.description || "Dashboard mockup";
  const imageHint = defaultDashboardImage?.imageHint || "dashboard mockup";

  return (
    <Card className="relative mx-auto overflow-hidden rounded-xl shadow-2xl bg-background/50 backdrop-blur-sm">
      {imageToDisplay && (
           <Image
              src={imageToDisplay}
              alt={description}
              width={1200}
              height={780}
              className="object-cover w-full h-auto"
              data-ai-hint={imageHint}
              priority
            />
      )}
    </Card>
  );
}
