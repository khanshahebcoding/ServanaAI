import { FeaturesHero } from '@/components/features/features-hero';
import { IncidentManagement } from '@/components/features/incident-management';
import { AssetLifecycle } from '@/components/features/asset-lifecycle';
import { EnterpriseMapping } from '@/components/features/enterprise-mapping';
import { Analytics } from '@/components/features/analytics';
import { Cta } from '@/components/features/cta';

export default function FeaturesPage() {
  return (
    <>
      <FeaturesHero />
      <IncidentManagement />
      <AssetLifecycle />
      <EnterpriseMapping />
      <Analytics />
      <Cta />
    </>
  );
}
