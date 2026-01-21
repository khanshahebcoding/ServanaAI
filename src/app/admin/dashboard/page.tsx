'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from 'date-fns';

const pages = [
  { id: 'home', name: 'Home Page', sections: 6 },
  { id: 'features', name: 'Features Page', sections: 7 },
  { id: 'pricing', name: 'Pricing Page', sections: 1 },
];

export default function AdminDashboardPage() {
  const firestore = useFirestore();
  const submissionsQuery = useMemoFirebase(
    () => firestore ? query(collection(firestore, 'submissions'), orderBy('submittedAt', 'desc'), limit(5)) : null,
    [firestore]
  );
  const { data: submissions, isLoading } = useCollection(submissionsQuery);

  return (
    <div className="space-y-8">
      {/* Content Management Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Content Management</h2>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Page
            </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <Card key={page.id}>
              <CardHeader>
                <CardTitle>{page.name}</CardTitle>
                <CardDescription>{page.sections} editable sections</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href={`/admin/content?page=${page.id}`}>Edit Page</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Form Submissions Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Form Submissions</h2>
          <Button variant="outline" asChild>
            <Link href="/admin/submissions">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <Card>
            {isLoading ? (
              <div className="p-6">
                <Skeleton className="h-8 w-full mb-4" />
                <Skeleton className="h-8 w-full mb-4" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : submissions && submissions.length > 0 ? (
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>Form</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {submissions.map((submission) => (
                          <TableRow key={submission.id}>
                              <TableCell className="font-medium">{submission.formName}</TableCell>
                              <TableCell>{submission.email}</TableCell>
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
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No submissions yet.</p>
              </CardContent>
            )}
        </Card>
      </section>
    </div>
  );
}
