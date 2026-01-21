'use client';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from 'date-fns';

export default function SubmissionsPage() {
    const firestore = useFirestore();
    const submissionsQuery = useMemoFirebase(
      () => firestore ? query(collection(firestore, 'submissions'), orderBy('submittedAt', 'desc')) : null,
      [firestore]
    );
    const { data: submissions, isLoading } = useCollection(submissionsQuery);

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Form Submissions</CardTitle>
                <CardDescription>Here you can view all submissions from your web forms.</CardDescription>
            </CardHeader>
            <CardContent>
                 {isLoading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                    </div>
                 ) : submissions && submissions.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Form</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead>Appointment</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {submissions.map((submission) => (
                                <TableRow key={submission.id}>
                                    <TableCell className="font-medium">{submission.formName}</TableCell>
                                    <TableCell>{submission.name}</TableCell>
                                    <TableCell>{submission.email}</TableCell>
                                    <TableCell>{submission.company}</TableCell>
                                    <TableCell>
                                        {submission.appointmentDate ? `${submission.appointmentDate} at ${submission.appointmentTime}` : 'N/A'}
                                    </TableCell>
                                    <TableCell>{submission.submittedAt ? format(submission.submittedAt.toDate(), 'PPpp') : 'N/A'}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" asChild>
                                          <Link href={`/admin/submissions/${submission.id}`}>View</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                 ) : (
                    <p className="text-center text-muted-foreground py-8">No submissions yet.</p>
                 )}
            </CardContent>
        </Card>
    )
}
