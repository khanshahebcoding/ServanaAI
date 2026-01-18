import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building, Users, Handshake } from "lucide-react";

const features = [
    {
        icon: <Building className="h-8 w-8 text-primary" />,
        title: "Multi-Branch Sync",
        description: "Manage different office locations like Banani and Farmgate from one unified dashboard."
    },
    {
        icon: <Handshake className="h-8 w-8 text-primary" />,
        title: "Vendor Ecosystem",
        description: "Keep a live directory of suppliers like 'Computer Source' for faster procurement and repairs."
    },
    {
        icon: <Users className="h-8 w-8 text-primary" />,
        title: "Role-Based Access",
        description: "Emphasize the User Management system where different roles (Admin, CEO, HR) see filtered data."
    }
]

export function EnterpriseMapping() {
    return (
        <section className="w-full py-20 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-navy">Enterprise Structural Mapping</h2>
                    <p className="mt-4 text-lg text-gray-600">Organize your entire enterprise with intelligent mapping.</p>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    {features.map((feature, index) => (
                        <Card key={index} className="rounded-3xl shadow-lg border-white/20 bg-white/50 backdrop-blur-lg p-6 hover:shadow-xl transition-shadow duration-300">
                             <CardHeader className="flex flex-col items-center text-center p-0">
                                <div className="mb-4">{feature.icon}</div>
                                <CardTitle>{feature.title}</CardTitle>
                                <CardDescription className="mt-2">{feature.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
