'use client';
import { FeaturesHero } from '@/components/features/features-hero';
import { IncidentManagement } from '@/components/features/incident-management';
import { AssetLifecycle } from '@/components/features/asset-lifecycle';
import { EnterpriseMapping } from '@/components/features/enterprise-mapping';
import { UserManagement } from '@/components/features/user-management';
import { Analytics } from '@/components/features/analytics';
import { Cta } from '@/components/features/cta';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

export default function FeaturesPage() {
  const firestore = useFirestore();
  const contentDocRef = useMemoFirebase(() => firestore ? doc(firestore, 'content', 'features') : null, [firestore]);
  const { data: content, isLoading } = useDoc<any>(contentDocRef);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-background pt-20">
        <Skeleton className="h-screen w-full" />
        <Skeleton className="h-screen w-full" />
        <Skeleton className="h-screen w-full" />
      </div>
    );
  }

  return (
    <>
      <FeaturesHero content={content?.featuresHero} />
      <IncidentManagement content={content?.incidentManagement} />
      <AssetLifecycle content={content?.assetLifecycle} />
      <EnterpriseMapping content={content?.enterpriseMapping} />
      <UserManagement content={content?.userManagement} />
      <Analytics content={content?.analytics} />
      <Cta content={content?.cta} />
    </>
  );
}
