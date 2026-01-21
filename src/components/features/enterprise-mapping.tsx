'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import LifecycleRibbon from "./lifecycle-ribbon";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const orgSteps = [
  {
    id: 1,
    label: 'Branch Setup',
    title: 'Centralized Branch Management',
    description: 'Easily set up and manage all your office locations, like Banani and Farmgate, from a single, unified dashboard. Define branch-specific settings and users.',
    image: PlaceHolderImages.find(p => p.id === 'org-branch-setup'),
  },
  {
    id: 2,
    label: 'Dept. Mapping',
    title: 'Intuitive Department Structuring',
    description: 'Map departments like HR, IT, and Sales to specific branches. Assign employees and assets to departments for granular control and reporting.',
    image: PlaceHolderImages.find(p => p.id === 'org-dept-mapping'),
  },
  {
    id: 3,
    label: 'Vendor Sync',
    title: 'Integrated Vendor Ecosystem',
    description: "Maintain a live directory of your trusted suppliers and vendors, such as 'Computer Source'. Streamline procurement, repairs, and vendor-related communication.",
    image: PlaceHolderImages.find(p => p.id === 'org-vendor-sync'),
  }
];

export function EnterpriseMapping() {
    const [activeStatusId, setActiveStatusId] = useState(1);
    const activeStep = orgSteps.find(step => step.id === activeStatusId);

    return (
        <section className="w-full py-20 md:py-24 lg:py-32 bg-slate-50">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-navy">Organizational Intelligence</h2>
                    <p className="mt-4 text-lg text-gray-600">Map your entire enterprise with precision and clarity. Click each stage to see how.</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-16"
                >
                    <LifecycleRibbon statuses={orgSteps} currentStatusId={activeStatusId} setCurrentStatusId={setActiveStatusId} isInteractive={true} />
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
