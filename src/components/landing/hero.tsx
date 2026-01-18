import { Button } from "@/components/ui/button";
import { DashboardMockup } from "./dashboard-mockup";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="relative w-full pt-24 md:pt-32 lg:pt-40 pb-20">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at top left, hsl(340 95% 70% / 0.5), transparent 40%), radial-gradient(circle at bottom right, hsl(260 95% 60% / 0.5), transparent 40%)",
        }}
      />
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-4">
            <Badge variant="secondary" className="rounded-full px-4 py-1 text-sm font-medium">
              No 01 Time Tracker Software on Producthunt
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Stop Wasting Time,
              <br />
              Start Tracking It.
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-foreground/80 md:text-xl">
              Boost your productivity, improve profitability, and reduce stress
              with our all-in-one time management solution.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="sm:w-auto">
              Get Started, It's Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="sm:w-auto bg-white">
              Get a Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="relative mt-12 md:mt-20">
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
