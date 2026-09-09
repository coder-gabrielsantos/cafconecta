import { InventoryPage } from '@/components/section-pages';
import { units } from '@/data/mock';

function unitSlug(name: string) {
  return name.toLowerCase().replaceAll(' ', '-');
}

export default async function Page({
  params,
}: {
  params: Promise<{ ubsId: string }>;
}) {
  const { ubsId } = await params;
  const unitName =
    units.find((unit) => unitSlug(unit) === decodeURIComponent(ubsId)) ??
    'UBS não identificada';

  return <InventoryPage unitName={unitName} />;
}
