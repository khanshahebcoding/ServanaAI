'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import LifecycleRibbon from "./lifecycle-ribbon";
import { getGoogleDriveImageSrc } from '@/lib/utils';

const defaultSteps = [
  {
    id: 1,
    label: 'Stock In',
    title: 'Seamless Inventory Intake',
    description: 'Quickly add new hardware to your inventory using a streamlined form. Capture all essential details from day one, including purchase date, supplier, and initial value.',
    imageUrl: 'https://images.unsplash.com/photo-1636289799206-a77cd3a2044d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxhc3NldCUyMGludmVudG9yeSUyMGZvcm18ZW58MHx8fHwxNzY4NzM0MTg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    label: 'Assign',
    title: 'Intelligent Asset Assignment',
    description: 'Assign devices to employees or departments with full traceability. View the complete assignment history for every asset and ensure accountability.',
    imageUrl: 'https://images.unsplash.com/photo-1688287632190-071ae4b3a129?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhc3NpZ25lZCUyMGFzc2V0cyUyMGxpc3R8ZW58MHx8fHwxNzY4NzM0MTg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    label: 'Warranty Audit',
    title: 'Proactive Warranty Guardian',
    description: "SupportEngine's AI continuously monitors your assets' warranty status. Receive automated alerts and reports before coverage expires, allowing you to plan renewals and avoid service gaps.",
    imageUrl: 'https://images.unsplash.com/photo-1618359920180-0beecbac1ea4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8d2FycmFudHklMjBhdWRpdCUyMHJlcG9ydHxlbnwwfHx8fDE3Njg3MzQxODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  }
];

const defaultContent = {
  title: "Smart Asset Lifecycle Management",
  subtitle: "From procurement to retirement, gain full control over every asset. Click each stage to see how.",
  steps: defaultSteps,
};

interface AssetLifecycleContent {
  title: string;
  subtitle: string;
  steps: typeof defaultSteps;
}

export function AssetLifecycle({ content: contentFromProps }: { content?: AssetLifecycleContent }) {
    const [activeStatusId, setActiveStatusId] = useState(1);
    const content = contentFromProps || defaultContent;
    const { title, subtitle, steps } = content;
    
    const activeStep = steps.find(step => step.id === activeStatusId);

    return (
        <section className="w-full py-20 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-navy">{title}</h2>
                    <p className="mt-4 text-lg text-gray-600">{subtitle}</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-16"
                >
                    <LifecycleRibbon statuses={steps} currentStatusId={activeStatusId} setCurrentStatusId={setActiveStatusId} isInteractive={true} />
                </motion.div>
                
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
                                          {activeStep.imageUrl && (
                                              <Image
                                                  src={getGoogleDriveImageSrc(activeStep.imageUrl)}
                                                  alt={activeStep.title}
                                                  width={800}
                                                  height={600}
                                                  className="object-cover w-full h-full"
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
