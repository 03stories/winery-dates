import { Card } from '@/components/Card';

export function DashboardOverviewPage(): JSX.Element {
  return (
    <Card title="Overview" description="A sample nested route.">
      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
        <li>Strict TypeScript and path aliases are enabled.</li>
        <li>Tailwind tokens are configured but lightweight.</li>
        <li>Swap UI libraries without changing build tooling.</li>
      </ul>
    </Card>
  );
}
