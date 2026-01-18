import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CheckCircle, AlertTriangle, Link } from "lucide-react";

const assetDetailsImage = PlaceHolderImages.find((p) => p.id === "asset-details-mockup");

export function AssetLifecycle() {
  return (
    <section className="w-full py-20 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
            <div className="order-last lg:order-first">
                 {assetDetailsImage && (
                    <Image
                        src={assetDetailsImage.imageUrl}
                        alt={assetDetailsImage.description}
                        width={800}
                        height={600}
                        className="rounded-3xl shadow-2xl"
                        data-ai-hint={assetDetailsImage.imageHint}
                    />
                 )}
            </div>
            <div className="space-y-8">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter text-navy sm:text-4xl">Smart Asset Lifecycle</h2>
                    <p className="text-lg text-gray-600">From procurement to retirement, gain full control over every asset.</p>
                </div>
                <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                        <CheckCircle className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold text-lg">Inventory Flow</h3>
                            <p className="text-gray-600">Effortlessly manage your stock with smart 'Stock In', 'Stock Out', and 'Assign Asset' workflows.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <AlertTriangle className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold text-lg">AI Warranty Guardian</h3>
                            <p className="text-gray-600">Receive proactive alerts from the Warranty Expiration Report before hardware coverage ends.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <Link className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold text-lg">Smart Linking</h3>
                            <p className="text-gray-600">Automatically associate spare parts and peripherals with their parent hardware, like a battery to a specific HP Zbook.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
      </div>
    </section>
  );
}
