'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import LifecycleRibbon from "./lifecycle-ribbon";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const incidentSteps = [
  {
    id: 1,
    label: 'Created',
    title: 'Submit a Ticket with Ease',
    description: 'Users can create new incidents through multiple channels, including a user-friendly web portal, email integration, or API. All details are captured in a structured format.',
    image: PlaceHolderImages.find(p => p.id === 'incident-created'),
  },
  {
    id: 2,
    label: 'Acknowledged',
    title: 'AI-Powered Triage & Acknowledgment',
    description: 'As soon as a ticket is created, SupportEngine\'s AI analyzes its content, categorizes it (e.g., Hardware, Software), and sends an automated acknowledgment to the user.',
    image: PlaceHolderImages.find(p => p.id === 'incident-acknowledged'),
  },
  {
    id: 3,
    label: 'Assigned',
    title: 'Intelligent Agent Assignment',
    description: 'The system automatically routes the ticket to the best-suited support agent or team based on skill set, current workload, and issue category, ensuring a fast and effective response.',
    image: PlaceHolderImages.find(p => p.id === 'incident-assigned'),
  },
  {
    id: 4,
    label: 'In Progress',
    title: 'Collaborative Resolution',
    description: 'Agents work on the ticket with a full suite of tools, including a real-time activity log, AI-powered suggestions, and integrated knowledge base access.',
    image: PlaceHolderImages.find(p => p.id === 'incident-in-progress'),
  },
  {
    id: 5,
    label: 'Resolved',
    title: 'Effective & Verified Solutions',
    description: 'Once the agent resolves the issue, the solution is logged, and the ticket is marked as resolved. The user is notified and can see a full summary of the actions taken.',
    image: PlaceHolderImages.find(p => p.id === 'incident-resolved'),
  },
  {
    id: 6,
    label: 'Pending Closure',
    title: 'Automated User Confirmation',
    description: 'To ensure user satisfaction, the system waits for a confirmation from the user that the issue is truly resolved before final closure, preventing premature ticket closing.',
    image: PlaceHolderImages.find(p => p.id === 'incident-pending-closure'),
  },
  {
    id: 7,
    label: 'Closed',
    title: 'Archived for Knowledge & Analytics',
    description: 'The fully resolved ticket is closed and archived. Its data contributes to the knowledge base and provides valuable insights for analytics and future AI improvements.',
    image: PlaceHolderImages.find(p => p.id === 'incident-closed'),
  },
];

export function IncidentManagement() {
    const [activeStatusId, setActiveStatusId] = useState(1);
    const activeStep = incidentSteps.find(step => step.id === activeStatusId);

    return (
        <section className="w-full py-20 md:py-24 lg:py-32 bg-slate-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-navy">Intelligent Incident Management</h2>
                    <p className="mt-4 text-lg text-gray-600">Follow a ticket's journey, powered by AI at every step. Click each stage to see it in action.</p>
                </div>
                
                <div className="mb-16">
                    <LifecycleRibbon statuses={incidentSteps} currentStatusId={activeStatusId} setCurrentStatusId={setActiveStatusId} isInteractive={true} />
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
