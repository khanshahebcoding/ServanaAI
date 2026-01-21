'use client';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
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
import { useFirestore, useDoc, useMemoFirebase, setDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Plus, Trash2 } from "lucide-react";

const pages = [
  { id: 'home', name: 'Home Page', sections: 6 },
  { id: 'features', name: 'Features Page', sections: 7 },
  { id: 'pricing', name: 'Pricing Page', sections: 1 },
];

const lifecycleStepsDefault = [
    { icon: "Ticket", title: "New Ticket", description: "Incidents are created via email, portal, or API." },
    { icon: "BrainCircuit", title: "AI Triage", description: "SupportEngine analyzes and prioritizes the ticket." },
    { icon: "Tag", title: "Categorization", description: "Automatically tagged for better routing.", tags: ["Hardware", "Software", "Network", "Security"]},
    { icon: "Users", title: "Assignment", description: "Routed to the best-suited agent or team." },
    { icon: "CircleCheckBig", title: "Resolution", description: "Agents solve the issue with AI-powered suggestions." },
    { icon: "Archive", title: "Closed", description: "Ticket is closed and knowledge base is updated." },
];

const homePageSections = [
  { id: 'hero', name: 'Hero Section', component: 'Hero', content: { title: 'Revolutionize Your IT Support with SupportEngine', subtitle: 'SupportEngine integrates intelligent automation to manage incidents, assets, and analytics seamlessly, empowering your support teams to deliver exceptional service.' } },
  { id: 'trusted-by', name: 'Trusted By', component: 'TrustedBy', content: {} },
  { 
      id: 'workflow', 
      name: 'Workflow', 
      component: 'Workflow', 
      content: { 
          title: 'A Glimpse Into the Ticket Lifecycle', 
          subtitle: "Follow an incident from creation to resolution, powered by intelligent automation at every step.",
          steps: lifecycleStepsDefault
      } 
  },
  { id: 'asset-feature', name: 'Asset Module', component: 'AssetFeature', content: { title: 'Complete Visibility and Control Over Your IT Assets', subtitle: "SupportEngine's Asset Module provides a holistic view of your entire IT landscape." } },
  { id: 'pricing', name: 'Pricing', component: 'Pricing', content: { title: 'Choose the Right Plan for Your Team', subtitle: 'Simple, transparent pricing that scales with you. No hidden fees.' } },
  { id: 'product-explorer', name: 'Product Explorer', component: 'ProductExplorer', content: { title: 'Explore SupportEngine in Action' } },
];

type Section = typeof homePageSections[0];
type WorkflowStep = { icon: string; title: string; description: string; tags?: string[] };


function EditContent() {
    const searchParams = useSearchParams();
    const pageId = searchParams.get('page');
    const page = pages.find(p => p.id === pageId);

    const firestore = useFirestore();
    const contentDocRef = useMemoFirebase(() => (firestore && pageId) ? doc(firestore, 'content', pageId) : null, [firestore, pageId]);
    const { data: pageContent, isLoading } = useDoc<any>(contentDocRef);

    const [selectedSection, setSelectedSection] = useState<Section | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editedContent, setEditedContent] = useState<any>({});

    const handleEditClick = (section: Section) => {
        setSelectedSection(section);
        const currentContent = pageContent?.[section.id] ?? section.content;
        setEditedContent(JSON.parse(JSON.stringify(currentContent)));
        setIsDialogOpen(true);
    };

    const handleInputChange = (field: string, value: string) => {
        setEditedContent((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleStepChange = (index: number, field: 'title' | 'description' | 'icon', value: string) => {
        setEditedContent((prev: any) => {
            const newSteps = [...(prev.steps || [])];
            newSteps[index] = { ...newSteps[index], [field]: value };
            return { ...prev, steps: newSteps };
        });
    };

    const handleAddStep = () => {
        setEditedContent((prev: any) => ({
            ...prev,
            steps: [...(prev.steps || []), { icon: 'PlusCircle', title: 'New Step', description: '' }]
        }));
    };

    const handleRemoveStep = (index: number) => {
        setEditedContent((prev: any) => {
            const newSteps = [...(prev.steps || [])];
            newSteps.splice(index, 1);
            return { ...prev, steps: newSteps };
        });
    };

    const handleSaveChanges = () => {
        if (!contentDocRef || !selectedSection) return;

        const dataToUpdate = {
            [selectedSection.id]: editedContent
        };

        setDocumentNonBlocking(contentDocRef, dataToUpdate, { merge: true });

        setIsDialogOpen(false);
    };

    const renderFormFields = () => {
      if (!selectedSection) return null;

      const contentToEdit = editedContent || {};

      if (selectedSection.id === 'workflow') {
        const steps = contentToEdit.steps || [];
        return (
          <>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="title" className="text-right pt-2 capitalize">Title</Label>
              <Input id="title" value={contentToEdit.title || ''} onChange={(e) => handleInputChange('title', e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="subtitle" className="text-right pt-2 capitalize">Subtitle</Label>
              <Textarea id="subtitle" value={contentToEdit.subtitle || ''} onChange={(e) => handleInputChange('subtitle', e.target.value)} className="col-span-3" />
            </div>
            <div className="col-span-4 flex items-center justify-between border-b pb-2 mt-4">
                <h4 className="font-semibold">Workflow Steps</h4>
                <Button size="sm" variant="outline" onClick={handleAddStep}><Plus className="mr-2 h-4 w-4" /> Add Step</Button>
            </div>
            <div className="col-span-4 max-h-[40vh] overflow-y-auto space-y-4 p-1">
                {steps.map((step: WorkflowStep, index: number) => (
                  <div key={index} className="relative space-y-3 rounded-lg border p-4">
                    <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => handleRemoveStep(index)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor={`step-icon-${index}`} className="text-right">Icon</Label>
                        <Input id={`step-icon-${index}`} value={step.icon || ''} onChange={(e) => handleStepChange(index, 'icon', e.target.value)} className="col-span-3" placeholder="e.g. Ticket"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor={`step-title-${index}`} className="text-right">Title</Label>
                        <Input id={`step-title-${index}`} value={step.title || ''} onChange={(e) => handleStepChange(index, 'title', e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor={`step-desc-${index}`} className="text-right pt-2">Description</Label>
                        <Textarea id={`step-desc-${index}`} value={step.description || ''} onChange={(e) => handleStepChange(index, 'description', e.target.value)} className="col-span-3" />
                    </div>
                  </div>
                ))}
            </div>
          </>
        )
      }
      
      const fields = Object.keys(selectedSection.content || {});

      if (fields.length === 0) {
        return <p>This section has no editable content.</p>
      }

      return fields.map((key) => (
         <div key={key} className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor={key} className="text-right pt-2 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
              </Label>
              {key.includes('subtitle') || key.includes('description') || key.includes('content') ? (
                  <Textarea id={key} value={contentToEdit[key] || ''} onChange={(e) => handleInputChange(key, e.target.value)} className="col-span-3" />
              ) : (
                  <Input id={key} value={contentToEdit[key] || ''} onChange={(e) => handleInputChange(key, e.target.value)} className="col-span-3" />
              )}
          </div>
      ))
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>{page ? `Editing: ${page.name}` : 'Content Management'}</CardTitle>
                    {page && <CardDescription>Here you can modify the content of each section.</CardDescription>}
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                        </div>
                    ) : page ? (
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
                                            section.id !== 'trusted-by' &&
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
                           {renderFormFields()}
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleSaveChanges}>Save changes</Button>
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
