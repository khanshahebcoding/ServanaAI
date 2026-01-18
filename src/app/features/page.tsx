import { FeaturesHero } from '@/components/features/features-hero';
import { IncidentManagement } from '@/components/features/incident-management';
import { AssetLifecycle } from '@/components/features/asset-lifecycle';
import { EnterpriseMapping } from '@/components/features/enterprise-mapping';
import { UserManagement } from '@/components/features/user-management';
import { Analytics } from '@/components/features/analytics';
import { Cta } from '@/components/features/cta';

export default function FeaturesPage() {
  return (
    <>
      <FeaturesHero />
      <IncidentManagement />
      <AssetLifecycle />
      <EnterpriseMapping />
      <UserManagement />
      <Analytics />
      <Cta />
    </>
  );
}
