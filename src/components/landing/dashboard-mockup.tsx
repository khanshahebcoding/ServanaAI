"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowUp, Ticket, Clock, Smile } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const chartData = [
  { name: "Software", tickets: 400 },
  { name: "Hardware", tickets: 300 },
  { name: "Network", tickets: 200 },
  { name: "Security", tickets: 278 },
];

const activityData = [
  { id: 1, text: "New incident #7892 reported: 'Printer not working'." },
  { id: 2, text: "Asset AS-102 warranty expiring in 30 days." },
  { id: 3, text: "Security alert: Unusual login detected for user @jane." },
  { id: 4, text: "Ticket #7881 resolved. CSAT score: 5/5." },
];

const dashboardImage = PlaceHolderImages.find(p => p.id === 'dashboard-mockup');

export function DashboardMockup() {
  return (
    <div className="relative mx-auto rounded-xl shadow-2xl">
        {dashboardImage && (
             <Image
                src={dashboardImage.imageUrl}
                alt={dashboardImage.description}
                width={1200}
                height={900}
                className="rounded-lg object-cover"
                data-ai-hint={dashboardImage.imageHint}
                priority
              />
        )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
      <div className="absolute bottom-4 left-4 right-4">
        <Card className="bg-background/70 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-primary">SupportEngine Dashboard</CardTitle>
                <CardDescription>Real-time overview of your IT operations.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-4">
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
                        <Ticket className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">1,234</div>
                        <p className="text-xs text-muted-foreground">+10.1% from last month</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Resolution Time</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">3.2h</div>
                        <p className="text-xs text-muted-foreground">-5.2% from last month</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
                        <Smile className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">98%</div>
                        <p className="text-xs text-muted-foreground">+2% from last month</p>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
