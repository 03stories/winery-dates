import { Card } from '@/components/Card';

export function DashboardOverviewPage(): JSX.Element {
  return (
    <Card title="Saved wineries" description="Your shortlist for the next date night.">
      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
        <li>Golden Hour Cellars - sunset terrace and chef pairings.</li>
        <li>Lantern Vineyard - cozy lounge and live acoustic nights.</li>
        <li>Cedar Ridge Estate - scenic picnic lawns and guided flights.</li>
      </ul>
    </Card>
  );
}
