import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Ticket,
  BrainCircuit,
  Tag,
  Users,
  CheckCircle,
  Archive,
} from "lucide-react";

const workflowSteps = [
  {
    icon: Ticket,
    title: "New Ticket",
    description: "Incidents are created via email, portal, or API.",
  },
  {
    icon: BrainCircuit,
    title: "AI Triage",
    description: "ServanaAI analyzes and prioritizes the ticket.",
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
    icon: CheckCircle,
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
    <section id="features" className="w-full py-20 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl">
            A Glimpse Into the Ticket Lifecycle
          </h2>
          <p className="mt-4 text-foreground/80 md:text-xl">
            Follow an incident from creation to resolution, powered by intelligent automation at every step.
          </p>
        </div>
        <div className="mt-12 overflow-x-auto pb-4">
          <div className="flex w-max items-start gap-4 md:w-full md:grid md:grid-cols-6 md:gap-8">
            {workflowSteps.map((step, index) => (
              <div key={index} className="flex w-48 flex-col items-center text-center md:w-auto">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                {step.tags && (
                  <div className="mt-2 flex flex-wrap justify-center gap-1">
                    {step.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                )}
                {index < workflowSteps.length - 1 && (
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
