'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";

// Mock data, to be replaced with Firestore data
const pages = [
  { id: 'home', name: 'Home Page', sections: 5 },
  { id: 'features', name: 'Features Page', sections: 7 },
  { id: 'pricing', name: 'Pricing Page', sections: 1 },
];

const formSubmissions = [
    { id: '1', form: 'Contact Demo', email: 'user1@example.com', date: '2024-07-29' },
    { id: '2', form: 'Get Started', email: 'user2@example.com', date: '2024-07-28' },
];

export default function AdminDashboardPage() {
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
                <Button className="w-full">Edit Page</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Form Submissions Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Recent Form Submissions</h2>
        <Card>
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
                    {formSubmissions.map((submission) => (
                        <TableRow key={submission.id}>
                            <TableCell className="font-medium">{submission.form}</TableCell>
                            <TableCell>{submission.email}</TableCell>
                            <TableCell>{submission.date}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm">View</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
      </section>
    </div>
  );
}
