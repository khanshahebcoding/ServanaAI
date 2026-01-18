import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "/month",
    description: "For individuals and small teams getting started.",
    features: [
      "AI-Powered Ticket Triage",
      "Basic Asset Tracking",
      "Standard Reporting",
      "Community Support",
    ],
    cta: "Get Started Free",
    isPopular: false,
  },
  {
    name: "Professional",
    price: "$49",
    period: "/user/month",
    description: "For growing businesses that need advanced features.",
    features: [
      "All Starter features",
      "Advanced Asset Lifecycle Mgmt",
      "Automated Workflows",
      "CSAT & Performance Analytics",
      "Email & Chat Support",
    ],
    cta: "Start 14-day Trial",
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with complex needs.",
    features: [
      "All Professional features",
      "Organizational Hierarchy",
      "On-premise Deployment Option",
      "Dedicated Account Manager",
      "24/7 Priority Support",
    ],
    cta: "Contact Sales",
    isPopular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="w-full py-20 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl">
            Choose the Right Plan for Your Team
          </h2>
          <p className="mt-4 text-foreground/80 md:text-xl">
            Simple, transparent pricing that scales with you. No hidden fees.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "flex flex-col",
                plan.isPopular && "border-accent ring-2 ring-accent"
              )}
            >
              <CardHeader className="relative">
                {plan.isPopular && (
                  <Badge className="absolute top-[-10px] right-6">
                    Most Popular
                  </Badge>
                )}
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="flex items-baseline pt-4">
                  <span className="text-4xl font-bold tracking-tight">
                    {plan.price}
                  </span>
                  {plan.period && <span className="ml-1 text-sm text-muted-foreground">{plan.period}</span>}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="mr-3 h-5 w-5 flex-shrink-0 text-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.isPopular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
