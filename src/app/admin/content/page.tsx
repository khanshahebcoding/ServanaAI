'use client';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

// Mock data, to be replaced with Firestore data
const pages = [
  { id: 'home', name: 'Home Page', sections: 5 },
  { id: 'features', name: 'Features Page', sections: 7 },
  { id: 'pricing', name: 'Pricing Page', sections: 1 },
];

function EditContent() {
    const searchParams = useSearchParams();
    const pageId = searchParams.get('page');
    const page = pages.find(p => p.id === pageId);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{page ? `Editing: ${page.name}` : 'Content Management'}</CardTitle>
                {page && <CardDescription>Here you can modify the content and sections of this page.</CardDescription>}
            </CardHeader>
            <CardContent>
                {page ? (
                    <div>
                        <p>Content editor for <strong>{page.name}</strong> goes here.</p>
                        {/* A form to edit page sections and content would be implemented here. */}
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
