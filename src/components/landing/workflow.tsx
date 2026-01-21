"use client";

import {
  Ticket,
  BrainCircuit,
  Tag,
  Users,
  CircleCheckBig,
  Archive,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const lifecycleSteps = [
  {
    icon: Ticket,
    title: "New Ticket",
    description: "Incidents are created via email, portal, or API.",
  },
  {
    icon: BrainCircuit,
    title: "AI Triage",
    description: "SupportEngine analyzes and prioritizes the ticket.",
  },
  {
    icon: Tag,
    title: "Categorization",
    description: "Automatically tagged for better routing.",
    tags: ["Hardware", "Software", "Network", "Security"],
  },
  {
    icon: Users,
    title: "Assignment",
    description: "Routed to the best-suited agent or team.",
  },
  {
    icon: CircleCheckBig,
    title: "Resolution",
    description: "Agents solve the issue with AI-powered suggestions.",
  },
  {
    icon: Archive,
    title: "Closed",
    description: "Ticket is closed and knowledge base is updated.",
  },
];

interface WorkflowContent {
  title: string;
  subtitle: string;
}

export function Workflow({ content }: { content?: WorkflowContent }) {
  const title = content?.title || "A Glimpse Into the Ticket Lifecycle";
  const subtitle = content?.subtitle || "Follow an incident from creation to resolution, powered by intelligent automation at every step.";

  return (
    <section id="features" className="w-full py-20 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center space-y-4"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-foreground/80 md:text-xl">
            {subtitle}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {lifecycleSteps.map((step, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <div className="p-1 h-full">
                    <div
                      key={step.title}
                      className="flex flex-col items-center text-center h-full rounded-lg border p-6"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <step.icon className="h-8 w-8" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground flex-grow">
                        {step.description}
                      </p>
                      {step.tags && (
                        <div className="mt-2 flex flex-wrap justify-center gap-1">
                          {step.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
            <Link href="/features">
                <Button variant="outline">Show All Features</Button>
            </Link>
        </motion.div>
      </div>
    </section>
  );
}
