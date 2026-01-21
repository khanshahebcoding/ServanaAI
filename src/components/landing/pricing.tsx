'use client';
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
import { motion } from "framer-motion";
import Link from "next/link";

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
    link: "https://app.supportengine.ai/login",
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
    link: "/signup",
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
    link: "#documentation",
  },
];

interface PricingContent {
  title: string;
  subtitle: string;
}

export function Pricing({ content }: { content?: PricingContent }) {
  const title = content?.title || "Choose the Right Plan for Your Team";
  const subtitle = content?.subtitle || "Simple, transparent pricing that scales with you. No hidden fees.";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="pricing" className="w-full py-20 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-foreground/80 md:text-xl">
            {subtitle}
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {plans.map((plan) => (
            <motion.div key={plan.name} variants={itemVariants} className="h-full">
              <Card
                className={cn(
                  "flex flex-col h-full",
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
                    asChild
                    className="w-full"
                    variant={plan.isPopular ? "default" : "outline"}
                  >
                    <Link
                      href={plan.link || '#'}
                      target={plan.link?.startsWith('http') ? '_blank' : undefined}
                      rel={plan.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {plan.cta}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
