'use client';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import LifecycleRibbon from "./lifecycle-ribbon";
import { GitBranch, ShieldAlert, History } from "lucide-react";

const features = [
    {
        icon: <GitBranch className="h-8 w-8 text-primary" />,
        title: "Smart Categorization",
        description: "Automatically sort tickets into Hardware, Software, or Network issues."
    },
    {
        icon: <ShieldAlert className="h-8 w-8 text-status-resolved" />,
        title: "Urgency-Based Prioritization",
        description: "Visual indicators for Critical vs. High-priority tickets to ensure SLAs are met."
    },
    {
        icon: <History className="h-8 w-8 text-status-assigned" />,
        title: "Activity Logging",
        description: "A real-time timeline of every action taken on an incident for full transparency."
    }
]

export function IncidentManagement() {
    return (
        <section className="w-full py-20 md:py-24 lg:py-32 bg-slate-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-navy">Intelligent Incident Management</h2>
                    <p className="mt-4 text-lg text-gray-600">Streamline your support with AI-powered incident resolution.</p>
                </div>
                
                <div className="mb-16">
                    <LifecycleRibbon currentStatusId={4} />
                </div>
                
                <div className="grid gap-8 md:grid-cols-3">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                        >
                            <Card className="h-full rounded-3xl shadow-lg border-white/20 bg-white/50 backdrop-blur-lg p-6 hover:shadow-xl transition-shadow duration-300">
                                <CardHeader className="flex flex-col items-center text-center p-0">
                                    <div className="mb-4">{feature.icon}</div>
                                    <CardTitle>{feature.title}</CardTitle>
                                    <CardDescription className="mt-2">{feature.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
