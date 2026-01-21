'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import LifecycleRibbon from "./lifecycle-ribbon";

const defaultSteps = [
  {
    id: 1,
    label: 'Add User',
    title: 'Streamlined User Onboarding',
    description: 'Quickly add new team members to SupportEngine. Capture essential details and prepare their account for role and branch assignment in a single step.',
    imageUrl: 'https://images.unsplash.com/photo-1762340277682-abb579ffa03c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHx1c2VyJTIwY3JlYXRpb24lMjBmb3JtfGVufDB8fHx8MTc2ODczNDE4OHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    label: 'Role Definition',
    title: 'Granular Role-Based Access Control',
    description: "Define user permissions with precision. Assign roles like 'Admin', 'Technician', or 'User' to control access to sensitive modules and data, ensuring security and compliance.",
    imageUrl: 'https://picsum.photos/seed/um2/800/600',
  },
  {
    id: 3,
    label: 'Branch Access',
    title: 'Location-Specific Data Scoping',
    description: "Restrict user access to specific branches, like 'Banani' or 'Farmgate'. This ensures that team members only see the incidents, assets, and data relevant to their location.",
    imageUrl: 'https://images.unsplash.com/photo-1616367157213-d7ee3548263d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8YnJhbmNoJTIwYWNjZXNzJTIwZGFzaGJvYXJkfGVufDB8fHx8MTc2ODczNDE4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
  }
];

const defaultContent = {
  title: "Granular User Management",
  subtitle: "Control who sees what with powerful role and branch-based access. Click each stage to see how.",
  steps: defaultSteps,
};

interface UserManagementContent {
  title: string;
  subtitle: string;
  steps: typeof defaultSteps;
}

export function UserManagement({ content: contentFromProps }: { content?: UserManagementContent }) {
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
                                                  src={activeStep.imageUrl}
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
