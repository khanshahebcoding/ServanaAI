"use client";

import {
  Ticket,
  BrainCircuit,
  Tag,
  Users,
  CircleCheckBig,
  Archive,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

export function Workflow() {
  return (
    <section id="features" className="w-full py-20 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            A Glimpse Into the Ticket Lifecycle
          </h2>
          <p className="mt-4 text-foreground/80 md:text-xl">
            Follow an incident from creation to resolution, powered by
            intelligent automation at every step.
          </p>
        </div>
        <div className="mt-12 overflow-x-auto pb-4">
          <div className="relative flex w-max items-start gap-4 md:w-full md:grid md:grid-cols-6 md:gap-8">
            {lifecycleSteps.map((step, index) => (
              <div
                key={step.title}
                className="flex w-48 flex-col items-center text-center md:w-auto relative"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
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
                {index < lifecycleSteps.length - 1 && (
                  <ArrowRight className="absolute top-8 left-full ml-4 hidden h-8 w-8 text-muted-foreground/50 md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
