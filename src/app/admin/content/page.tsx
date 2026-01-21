'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ContentPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Content Management</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Here you can manage the content of your pages.</p>
            </CardContent>
        </Card>
    )
}
