'use client';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mock data, to be replaced with Firestore data
const pages = [
  { id: 'home', name: 'Home Page', sections: 6 },
  { id: 'features', name: 'Features Page', sections: 7 },
  { id: 'pricing', name: 'Pricing Page', sections: 1 },
];

const homePageSections = [
  { id: 'hero', name: 'Hero Section', component: 'Hero', content: { title: 'Revolutionize Your IT Support with SupportEngine', subtitle: 'SupportEngine integrates intelligent automation to manage incidents, assets, and analytics seamlessly, empowering your support teams to deliver exceptional service.' } },
  { id: 'trusted-by', name: 'Trusted By', component: 'TrustedBy', content: { title: 'Trusted by innovative companies worldwide' } },
  { id: 'workflow', name: 'Workflow', component: 'Workflow', content: { title: 'A Glimpse Into the Ticket Lifecycle' } },
  { id: 'asset-feature', name: 'Asset Module', component: 'AssetFeature', content: { title: 'Complete Visibility and Control Over Your IT Assets' } },
  { id: 'pricing', name: 'Pricing', component: 'Pricing', content: { title: 'Choose the Right Plan for Your Team' } },
  { id: 'product-explorer', name: 'Product Explorer', component: 'ProductExplorer', content: { title: 'Explore SupportEngine in Action' } },
];

type Section = typeof homePageSections[0];

function EditContent() {
    const searchParams = useSearchParams();
    const pageId = searchParams.get('page');
    const page = pages.find(p => p.id === pageId);
    const [selectedSection, setSelectedSection] = useState<Section | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleEditClick = (section: Section) => {
        setSelectedSection(section);
        setIsDialogOpen(true);
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>{page ? `Editing: ${page.name}` : 'Content Management'}</CardTitle>
                    {page && <CardDescription>Here you can modify the content of each section.</CardDescription>}
                </CardHeader>
                <CardContent>
                    {page ? (
                        <div>
                            {page.id === 'home' ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Section Name</TableHead>
                                            <TableHead>Component</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {homePageSections.map((section) => (
                                            <TableRow key={section.id}>
                                                <TableCell className="font-medium">{section.name}</TableCell>
                                                <TableCell>
                                                    <code>{`<${section.component} />`}</code>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="outline" size="sm" onClick={() => handleEditClick(section)}>Edit</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <p>Content editor for <strong>{page.name}</strong> goes here.</p>
                            )}
                        </div>
                    ) : (
                        <p>Select a page from the <Link href="/admin/dashboard" className="underline hover:text-primary">dashboard</Link> to begin editing.</p>
                    )}
                </CardContent>
            </Card>
            {selectedSection && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                            <DialogTitle>Editing: {selectedSection.name}</DialogTitle>
                            <DialogDescription>
                                Make changes to this section here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            {selectedSection.content?.title && (
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="title" className="text-right">
                                        Title
                                    </Label>
                                    <Input id="title" defaultValue={selectedSection.content.title} className="col-span-3" />
                                </div>
                            )}
                            {selectedSection.content?.subtitle && (
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="subtitle" className="text-right">
                                        Subtitle
                                    </Label>
                                    <Textarea id="subtitle" defaultValue={selectedSection.content.subtitle} className="col-span-3" />
                                </div>
                            )}
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={() => setIsDialogOpen(false)}>Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}

function EditContentFallback() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-72" />
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            </CardContent>
        </Card>
    )
}

export default function ContentPage() {
    return (
        <Suspense fallback={<EditContentFallback />}>
            <EditContent />
        </Suspense>
    )
}
