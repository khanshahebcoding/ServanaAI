"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Landmark } from "lucide-react";
import { Bar, BarChart as RechartsBarChart, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const features = [
  {
    title: "Seamless Project Tracking",
    description:
      "Assign tasks to projects, track overall project time, and identify areas for improvement.",
    visual: <ProjectTrackingVisual />,
  },
  {
    title: "Detailed Reporting",
    description:
      "Generate comprehensive reports with insightful data visualizations. See exactly where your time is being spent and make informed decisions.",
    visual: <ReportingVisual />,
  },
  {
    title: "Flexible Time Tracking",
    description:
      "Track time manually, automatically based on active applications, or use our mobile app for on-the-go tracking.",
    visual: <TimeTrackingVisual />,
  },
];

export function Workflow() {
  return (
    <section id="features" className="w-full py-20 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <Badge variant="outline" className="border-primary text-primary">
            Why Choose ServanaAI?
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            ServanaAI helps you gain clarity and control over your workday.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="flex flex-col text-center items-center">
              <CardContent className="p-6 flex-1 flex flex-col items-center">
                <div className="bg-card rounded-lg p-4 w-full border mb-6 shadow-md">
                  {feature.visual}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectTrackingVisual() {
  return (
    <div className="space-y-3 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-destructive/10 p-2">
            <CreditCard className="h-4 w-4 text-destructive" />
          </div>
          <div>
            <p className="text-sm font-medium">Deposit from my Card</p>
            <p className="text-xs text-muted-foreground">28 January 2021</p>
          </div>
        </div>
        <p className="text-sm font-semibold text-destructive">-$350</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <Landmark className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Deposit Paypal</p>
            <p className="text-xs text-muted-foreground">25 January 2021</p>
          </div>
        </div>
        <p className="text-sm font-semibold text-primary">+$2,500</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <Landmark className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Jemi Wilson</p>
            <p className="text-xs text-muted-foreground">21 January 2021</p>
          </div>
        </div>
        <p className="text-sm font-semibold text-primary">+$5,400</p>
      </div>
    </div>
  );
}

const chartData = [
  { month: "Aug", value: 1860 },
  { month: "Sep", value: 3050 },
  { month: "Oct", value: 2370 },
  { month: "Nov", value: 730 },
  { month: "Dec", value: 2090 },
  { month: "Jan", value: 2140 },
];

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

function ReportingVisual() {
  return (
    <div className="h-[110px] w-full">
      <div className="flex justify-end items-center mb-2">
        <p className="text-2xl font-bold text-primary">$12,585</p>
      </div>
      <ChartContainer config={chartConfig} className="h-[80px] w-full">
        <RechartsBarChart accessibilityLayer data={chartData} margin={{ left: -20, top: 10, right: 0, bottom: 0 }}>
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            tickFormatter={(value) => value.slice(0, 3)}
            className="text-xs"
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel indicator="dot" />}
          />
          <Bar dataKey="value" fill="var(--color-value)" radius={4} />
        </RechartsBarChart>
      </ChartContainer>
    </div>
  );
}

function TimeTrackingVisual() {
  return (
    <div className="space-y-3 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-destructive/10 p-2">
            <CreditCard className="h-4 w-4 text-destructive" />
          </div>
          <div>
            <p className="text-sm font-medium">Deposit from my Card</p>
            <p className="text-xs text-muted-foreground">28 January 2021</p>
          </div>
        </div>
        <p className="text-sm font-semibold text-destructive">-$850</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <Landmark className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Deposit Paypal</p>
            <p className="text-xs text-muted-foreground">25 January 2021</p>
          </div>
        </div>
        <p className="text-sm font-semibold text-primary">+$2,500</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <Landmark className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Jemi Wilson</p>
            <p className="text-xs text-muted-foreground">21 January 2021</p>
          </div>
        </div>
        <p className="text-sm font-semibold text-primary">+$5,400</p>
      </div>
    </div>
  );
}
