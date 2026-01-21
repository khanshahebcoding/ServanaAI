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

const incidentStepsDefault = [
  { id: 1, label: 'Created', title: 'Submit a Ticket with Ease', description: 'Users can create new incidents through multiple channels, including a user-friendly web portal, email integration, or API. All details are captured in a structured format.', imageId: 'incident-created' },
  { id: 2, label: 'Acknowledged', title: 'AI-Powered Triage & Acknowledgment', description: 'As soon as a ticket is created, SupportEngine\'s AI analyzes its content, categorizes it (e.g., Hardware, Software), and sends an automated acknowledgment to the user.', imageId: 'incident-acknowledged' },
  { id: 3, label: 'Assigned', title: 'Intelligent Agent Assignment', description: 'The system automatically routes the ticket to the best-suited support agent or team based on skill set, current workload, and issue category, ensuring a fast and effective response.', imageId: 'incident-assigned' },
  { id: 4, label: 'In Progress', title: 'Collaborative Resolution', description: 'Agents work on the ticket with a full suite of tools, including a real-time activity log, AI-powered suggestions, and integrated knowledge base access.', imageId: 'incident-in-progress' },
  { id: 5, label: 'Resolved', title: 'Effective & Verified Solutions', description: 'Once the agent resolves the issue, the solution is logged, and the ticket is marked as resolved. The user is notified and can see a full summary of the actions taken.', imageId: 'incident-resolved' },
  { id: 6, label: 'Pending Closure', title: 'Automated User Confirmation', description: 'To ensure user satisfaction, the system waits for a confirmation from the user that the issue is truly resolved before final closure, preventing premature ticket closing.', imageId: 'incident-pending-closure' },
  { id: 7, label: 'Closed', title: 'Archived for Knowledge & Analytics', description: 'The fully resolved ticket is closed and archived. Its data contributes to the knowledge base and provides valuable insights for analytics and future AI improvements.', imageId: 'incident-closed' },
];

const assetStepsDefault = [
  { id: 1, label: 'Stock In', title: 'Seamless Inventory Intake', description: 'Quickly add new hardware to your inventory using a streamlined form. Capture all essential details from day one, including purchase date, supplier, and initial value.', imageId: 'asset-stock-in' },
  { id: 2, label: 'Assign', title: 'Intelligent Asset Assignment', description: 'Assign devices to employees or departments with full traceability. View the complete assignment history for every asset and ensure accountability.', imageId: 'asset-assigned' },
  { id: 3, label: 'Warranty Audit', title: 'Proactive Warranty Guardian', description: "SupportEngine's AI continuously monitors your assets' warranty status. Receive automated alerts and reports before coverage expires, allowing you to plan renewals and avoid service gaps.", imageId: 'asset-warranty-audit' },
];

const orgStepsDefault = [
  { id: 1, label: 'Branch Setup', title: 'Centralized Branch Management', description: 'Easily set up and manage all your office locations, like Banani and Farmgate, from a single, unified dashboard. Define branch-specific settings and users.', imageId: 'org-branch-setup' },
  { id: 2, label: 'Dept. Mapping', title: 'Intuitive Department Structuring', description: 'Map departments like HR, IT, and Sales to specific branches. Assign employees and assets to departments for granular control and reporting.', imageId: 'org-dept-mapping' },
  { id: 3, label: 'Vendor Sync', title: 'Integrated Vendor Ecosystem', description: "Maintain a live directory of your trusted suppliers and vendors, such as 'Computer Source'. Streamline procurement, repairs, and vendor-related communication.", imageId: 'org-vendor-sync' },
];

const userStepsDefault = [
  { id: 1, label: 'Add User', title: 'Streamlined User Onboarding', description: 'Quickly add new team members to SupportEngine. Capture essential details and prepare their account for role and branch assignment in a single step.', imageId: 'user-management-add-user' },
  { id: 2, label: 'Role Definition', title: 'Granular Role-Based Access Control', description: "Define user permissions with precision. Assign roles like 'Admin', 'Technician', or 'User' to control access to sensitive modules and data, ensuring security and compliance.", imageId: 'user-management-role-definition' },
  { id: 3, label: 'Branch Access', title: 'Location-Specific Data Scoping', description: "Restrict user access to specific branches, like 'Banani' or 'Farmgate'. This ensures that team members only see the incidents, assets, and data relevant to their location.", imageId: 'user-management-branch-access' },
];


const featuresPageSections = [
    { id: 'featuresHero', name: 'Hero Section', component: 'FeaturesHero', content: { title: 'AI-Driven ITSM: Empowering Your IT Infrastructure with SupportEngine.', subtitle: 'From automated incident resolution to intelligent asset lifecycle tracking, experience the future of service management.' } },
    { id: 'incidentManagement', name: 'Incident Management', component: 'FeatureSectionWithSteps', content: { title: 'Intelligent Incident Management', subtitle: "Follow a ticket's journey, powered by AI at every step. Click each stage to see it in action.", steps: incidentStepsDefault } },
    { id: 'assetLifecycle', name: 'Asset Lifecycle', component: 'FeatureSectionWithSteps', content: { title: 'Smart Asset Lifecycle Management', subtitle: "From procurement to retirement, gain full control over every asset. Click each stage to see how.", steps: assetStepsDefault } },
    { id: 'enterpriseMapping', name: 'Enterprise Mapping', component: 'FeatureSectionWithSteps', content: { title: 'Organizational Intelligence', subtitle: 'Map your entire enterprise with precision and clarity. Click each stage to see how.', steps: orgStepsDefault } },
    { id: 'userManagement', name: 'User Management', component: 'FeatureSectionWithSteps', content: { title: 'Granular User Management', subtitle: 'Control who sees what with powerful role and branch-based access. Click each stage to see how.', steps: userStepsDefault } },
    { id: 'analytics', name: 'Analytics & Reporting', component: 'Analytics', content: { title: 'Analytics & Reporting', subtitle: 'Gain deep insights into your IT operations.' } },
    { id: 'cta', name: 'Call to Action', component: 'Cta', content: { title: 'Ready to Revolutionize Your IT?', subtitle: 'Schedule a personalized demo to see how SupportEngine can empower your IT infrastructure.' } },
];

type Section = typeof homePageSections[0] | typeof featuresPageSections[0];
type WorkflowStep = { icon: string; title: string; description: string; tags?: string[] };
type FeatureStep = { id: number; label: string; title: string; description: string; imageId: string };


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

    const pageSections = pageId === 'home' ? homePageSections : pageId === 'features' ? featuresPageSections : [];

    const handleEditClick = (section: Section) => {
        setSelectedSection(section);
        const currentContent = pageContent?.[section.id] ?? section.content;
        setEditedContent(JSON.parse(JSON.stringify(currentContent)));
        setIsDialogOpen(true);
    };

    const handleInputChange = (field: string, value: string) => {
        setEditedContent((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleStepChange = (index: number, field: string, value: string | number) => {
        setEditedContent((prev: any) => {
            const newSteps = [...(prev.steps || [])];
            newSteps[index] = { ...newSteps[index], [field]: value };
            return { ...prev, steps: newSteps };
        });
    };

    const handleAddStep = () => {
        const newStep = selectedSection?.component === 'FeatureSectionWithSteps'
          ? { id: (editedContent.steps?.length ?? 0) + 1, label: 'New Step', title: 'New Step Title', description: '', imageId: '' }
          : { icon: 'PlusCircle', title: 'New Step', description: '' };

        setEditedContent((prev: any) => ({
            ...prev,
            steps: [...(prev.steps || []), newStep]
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

      if (selectedSection.component === 'FeatureSectionWithSteps') {
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
                <h4 className="font-semibold">Steps</h4>
                <Button size="sm" variant="outline" onClick={handleAddStep}><Plus className="mr-2 h-4 w-4" /> Add Step</Button>
            </div>
            <div className="col-span-4 max-h-[40vh] overflow-y-auto space-y-4 p-1">
                {steps.map((step: FeatureStep, index: number) => (
                  <div key={index} className="relative space-y-3 rounded-lg border p-4">
                    <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => handleRemoveStep(index)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor={`step-label-${index}`} className="text-right">Label</Label>
                        <Input id={`step-label-${index}`} value={step.label || ''} onChange={(e) => handleStepChange(index, 'label', e.target.value)} className="col-span-3"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor={`step-title-${index}`} className="text-right">Title</Label>
                        <Input id={`step-title-${index}`} value={step.title || ''} onChange={(e) => handleStepChange(index, 'title', e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor={`step-desc-${index}`} className="text-right pt-2">Description</Label>
                        <Textarea id={`step-desc-${index}`} value={step.description || ''} onChange={(e) => handleStepChange(index, 'description', e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor={`step-imageId-${index}`} className="text-right">Image ID</Label>
                        <Input id={`step-imageId-${index}`} value={step.imageId || ''} onChange={(e) => handleStepChange(index, 'imageId', e.target.value)} className="col-span-3" placeholder="e.g. incident-created"/>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )
      }
      
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
                           <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Section Name</TableHead>
                                        <TableHead>Component</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pageSections.map((section) => (
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
