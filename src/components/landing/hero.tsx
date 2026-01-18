import { Button } from "@/components/ui/button";
import { DashboardMockup } from "./dashboard-mockup";

export function Hero() {
  return (
    <section id="home" className="w-full bg-background pt-24 md:pt-32 lg:pt-40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
                Streamline Your IT with AI-Powered Support
              </h1>
              <p className="max-w-[600px] text-lg text-foreground/80 md:text-xl">
                ServanaAI integrates intelligent automation to manage incidents,
                assets, and analytics seamlessly, empowering your support teams to
                deliver exceptional service.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="sm:w-auto">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="sm:w-auto">
                Book a Demo
              </Button>
            </div>
          </div>
          <div className="relative">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
