'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import LifecycleRibbon from "./lifecycle-ribbon";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const assetSteps = [
  {
    id: 1,
    label: 'Stock In',
    title: 'Seamless Inventory Intake',
    description: 'Quickly add new hardware to your inventory using a streamlined form. Capture all essential details from day one, including purchase date, supplier, and initial value.',
    image: PlaceHolderImages.find(p => p.id === 'asset-stock-in'),
  },
  {
    id: 2,
    label: 'Assign',
    title: 'Intelligent Asset Assignment',
    description: 'Assign devices to employees or departments with full traceability. View the complete assignment history for every asset and ensure accountability.',
    image: PlaceHolderImages.find(p => p.id === 'asset-assigned'),
  },
  {
    id: 3,
    label: 'Warranty Audit',
    title: 'Proactive Warranty Guardian',
    description: "SupportEngine's AI continuously monitors your assets' warranty status. Receive automated alerts and reports before coverage expires, allowing you to plan renewals and avoid service gaps.",
    image: PlaceHolderImages.find(p => p.id === 'asset-warranty-audit'),
  }
];

export function AssetLifecycle() {
    const [activeStatusId, setActiveStatusId] = useState(1);
    const activeStep = assetSteps.find(step => step.id === activeStatusId);

    return (
        <section className="w-full py-20 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-navy">Smart Asset Lifecycle Management</h2>
                    <p className="mt-4 text-lg text-gray-600">From procurement to retirement, gain full control over every asset. Click each stage to see how.</p>
                </div>
                
                <div className="mb-16">
                    <LifecycleRibbon statuses={assetSteps} currentStatusId={activeStatusId} setCurrentStatusId={setActiveStatusId} isInteractive={true} />
                </div>
                
                <div className="relative min-h-[500px] md:min-h-[400px] lg:min-h-[450px]">
                    <AnimatePresence mode="wait">
                        {activeStep && (
                            <motion.div
                                key={activeStatusId}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center"
                            >
                                <div className="space-y-4 text-center lg:text-left order-2 lg:order-1">
                                    <h3 className="text-2xl font-bold text-navy">{activeStep.title}</h3>
                                    <p className="text-gray-600 lg:text-lg">{activeStep.description}</p>
                                </div>
                                <div className="order-1 lg:order-2">
                                  <Card className="rounded-2xl shadow-2xl overflow-hidden bg-white/50 backdrop-blur-lg border-white/20">
                                      <CardContent className="p-0">
                                          {activeStep.image && (
                                              <Image
                                                  src={activeStep.image.imageUrl}
                                                  alt={activeStep.image.description}
                                                  width={800}
                                                  height={600}
                                                  className="object-cover w-full h-full"
                                                  data-ai-hint={activeStep.image.imageHint}
                                              />
                                          )}
                                      </CardContent>
                                  </Card>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
