import { Card } from '@/components/Card';

export function DashboardSettingsPage(): JSX.Element {
  return (
    <Card title="Date Preferences" description="Tune suggestions for your ideal winery date.">
      <p className="text-sm text-slate-700">
        Next step: store preferences like max budget, preferred vibe, and drive-time limit so the
        directory can personalize results.
      </p>
    </Card>
  );
}
