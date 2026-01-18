'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import LifecycleRibbon from "./lifecycle-ribbon";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const userSteps = [
  {
    id: 1,
    label: 'Add User',
    title: 'Streamlined User Onboarding',
    description: 'Quickly add new team members to SupportEngine. Capture essential details and prepare their account for role and branch assignment in a single step.',
    image: PlaceHolderImages.find(p => p.id === 'user-management-add-user'),
  },
  {
    id: 2,
    label: 'Role Definition',
    title: 'Granular Role-Based Access Control',
    description: "Define user permissions with precision. Assign roles like 'Admin', 'Technician', or 'User' to control access to sensitive modules and data, ensuring security and compliance.",
    image: PlaceHolderImages.find(p => p.id === 'user-management-role-definition'),
  },
  {
    id: 3,
    label: 'Branch Access',
    title: 'Location-Specific Data Scoping',
    description: "Restrict user access to specific branches, like 'Banani' or 'Farmgate'. This ensures that team members only see the incidents, assets, and data relevant to their location.",
    image: PlaceHolderImages.find(p => p.id === 'user-management-branch-access'),
  }
];

export function UserManagement() {
    const [activeStatusId, setActiveStatusId] = useState(1);
    const activeStep = userSteps.find(step => step.id === activeStatusId);

    return (
        <section className="w-full py-20 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-navy">Granular User Management</h2>
                    <p className="mt-4 text-lg text-gray-600">Control who sees what with powerful role and branch-based access. Click each stage to see how.</p>
                </div>
                
                <div className="mb-16">
                    <LifecycleRibbon statuses={userSteps} currentStatusId={activeStatusId} setCurrentStatusId={setActiveStatusId} isInteractive={true} />
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
