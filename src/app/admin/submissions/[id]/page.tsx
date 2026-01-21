'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SubmissionDetailPage() {
  const params = useParams();
  const { id } = params;
  const firestore = useFirestore();

  const submissionDocRef = useMemoFirebase(
    () => (firestore && id ? doc(firestore, 'submissions', id as string) : null),
    [firestore, id]
  );
  const { data: submission, isLoading } = useDoc(submissionDocRef);

  return (
    <div>
        <Button asChild variant="outline" size="sm" className="mb-4">
            <Link href="/admin/submissions">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to all submissions
            </Link>
        </Button>
        <Card>
            <CardHeader>
                <CardTitle>Submission Details</CardTitle>
                {submission && (
                    <CardDescription>
                        From {submission.formName} form, submitted on {submission.submittedAt ? format(submission.submittedAt.toDate(), 'PPP') : 'N/A'}.
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-6 w-2/3" />
                        <Skeleton className="h-16 w-full" />
                    </div>
                ) : submission ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Name</p>
                                <p className="font-semibold">{submission.name || 'N/A'}</p>
                            </div>
                             <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Email</p>
                                <p className="font-semibold">{submission.email}</p>
                            </div>
                        </div>
                         <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Company</p>
                            <p className="font-semibold">{submission.company || 'N/A'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Message</p>
                            <p className="font-semibold whitespace-pre-wrap">{submission.message || 'N/A'}</p>
                        </div>
                    </div>
                ) : (
                    <p>Submission not found.</p>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
