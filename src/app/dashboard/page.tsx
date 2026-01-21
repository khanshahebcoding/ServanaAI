'use client';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ADMIN_UID = 'y4poDUkAStdmtsyUArHKXziEANn1';

export default function DashboardPage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        // If loading is finished and there is no user, redirect to login
        if (!isUserLoading && !user) {
            router.push('/login');
        } else if (!isUserLoading && user && user.uid === ADMIN_UID) {
            // if user is admin, redirect to admin dashboard
            router.replace('/admin/dashboard');
        }
    }, [user, isUserLoading, router]);

    if (isUserLoading || !user || user.uid === ADMIN_UID) {
        return (
            <div className="flex min-h-screen w-full items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Welcome to your Dashboard</CardTitle>
                    <CardDescription>This is your personal dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Hello, {user.email}!</p>
                    <p>More features coming soon.</p>
                </CardContent>
            </Card>
        </main>
    );
}
