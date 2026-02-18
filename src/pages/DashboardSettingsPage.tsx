import { Card } from '@/components/Card';

export function DashboardSettingsPage(): JSX.Element {
  return (
    <Card title="Settings" description="Configuration details can go here.">
      <p className="text-sm text-slate-700">
        This route exists to show nested routing under <code>/dashboard/settings</code>.
      </p>
    </Card>
  );
}
