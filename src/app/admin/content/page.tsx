'use client';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Mock data, to be replaced with Firestore data
const pages = [
  { id: 'home', name: 'Home Page', sections: 6 },
  { id: 'features', name: 'Features Page', sections: 7 },
  { id: 'pricing', name: 'Pricing Page', sections: 1 },
];

const homePageSections = [
  { id: 'hero', name: 'Hero Section', component: 'Hero' },
  { id: 'trusted-by', name: 'Trusted By', component: 'TrustedBy' },
  { id: 'workflow', name: 'Workflow', component: 'Workflow' },
  { id: 'asset-feature', name: 'Asset Module', component: 'AssetFeature' },
  { id: 'pricing', name: 'Pricing', component: 'Pricing' },
  { id: 'product-explorer', name: 'Product Explorer', component: 'ProductExplorer' },
];

function EditContent() {
    const searchParams = useSearchParams();
    const pageId = searchParams.get('page');
    const page = pages.find(p => p.id === pageId);

    return (
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
                                                <Button variant="outline" size="sm">Edit</Button>
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
