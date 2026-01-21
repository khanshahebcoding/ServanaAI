'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import LifecycleRibbon from "./lifecycle-ribbon";

const defaultSteps = [
  { id: 1, label: 'Created', title: 'Submit a Ticket with Ease', description: 'Users can create new incidents through multiple channels, including a user-friendly web portal, email integration, or API. All details are captured in a structured format.', imageUrl: 'https://images.unsplash.com/photo-1652018440238-1aeb20a803a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx0aWNrZXQlMjBjcmVhdGlvbiUyMGZvcm18ZW58MHx8fHwxNzY4NzMzMDg0fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 2, label: 'Acknowledged', title: 'AI-Powered Triage & Acknowledgment', description: 'As soon as a ticket is created, SupportEngine\'s AI analyzes its content, categorizes it (e.g., Hardware, Software), and sends an automated acknowledgment to the user.', imageUrl: 'https://images.unsplash.com/photo-1643190919327-135c901c7385?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjB0aWNrZXQlMjBhY2tub3dsZWRnZWR8ZW58MHx8fHwxNzY4NzMzMDgzfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 3, label: 'Assigned', title: 'Intelligent Agent Assignment', description: 'The system automatically routes the ticket to the best-suited support agent or team based on skill set, current workload, and issue category, ensuring a fast and effective response.', imageUrl: 'https://images.unsplash.com/photo-1703960525294-53f01e3546eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx0aWNrZXQlMjBhc3NpZ25tZW50JTIwc2NyZWVufGVufDB8fHx8MTc2ODczMzA4NHww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 4, label: 'In Progress', title: 'Collaborative Resolution', description: 'Agents work on the ticket with a full suite of tools, including a real-time activity log, AI-powered suggestions, and integrated knowledge base access.', imageUrl: 'https://images.unsplash.com/photo-1638517304679-4fbf9341c33c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8dGlja2V0JTIwYWN0aXZpdHklMjBsb2d8ZW58MHx8fHwxNzY4NzMzMDg0fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 5, label: 'Resolved', title: 'Effective & Verified Solutions', description: 'Once the agent resolves the issue, the solution is logged, and the ticket is marked as resolved. The user is notified and can see a full summary of the actions taken.', imageUrl: 'https://images.unsplash.com/photo-1731781275959-199c6705a9a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxyZXNvbHZlZCUyMHRpY2tldCUyMHZpZXd8ZW58MHx8fHwxNzY4NzMzMDg0fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 6, label: 'Pending Closure', title: 'Automated User Confirmation', description: 'To ensure user satisfaction, the system waits for a confirmation from the user that the issue is truly resolved before final closure, preventing premature ticket closing.', imageUrl: 'https://images.unsplash.com/photo-1703960525294-53f01e3546eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx0aWNrZXQlMjBjbG9zdXJlJTIwY29uZmlybWF0aW9ufGVufDB8fHx8MTc2ODczMzA4NHww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 7, label: 'Closed', title: 'Archived for Knowledge & Analytics', description: 'The fully resolved ticket is closed and archived. Its data contributes to the knowledge base and provides valuable insights for analytics and future AI improvements.', imageUrl: 'https://images.unsplash.com/photo-1757932520543-1806e2911cd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8YXJjaGl2ZWQlMjB0aWNrZXQlMjBrbm93bGVkZ2ViYXNlfGVufDB8fHx8MTc2ODczMzA4NHww&ixlib=rb-4.1.0&q=80&w=1080' },
];

const defaultContent = {
  title: "Intelligent Incident Management",
  subtitle: "Follow a ticket's journey, powered by AI at every step. Click each stage to see it in action.",
  steps: defaultSteps
};

interface IncidentManagementContent {
    title: string;
    subtitle: string;
    steps: typeof defaultSteps;
}

export function IncidentManagement({ content: contentFromProps }: { content?: IncidentManagementContent }) {
    const [activeStatusId, setActiveStatusId] = useState(1);
    const content = contentFromProps || defaultContent;
    const { title, subtitle, steps } = content;

    const activeStep = steps.find(step => step.id === activeStatusId);

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
