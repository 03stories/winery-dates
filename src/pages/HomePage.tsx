import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { appConfig } from '@/config/env';

export function HomePage(): JSX.Element {
  return (
    <div className="space-y-6">
      <Card title="Fast by default" description="Vite + React + TypeScript with strict tooling.">
        <div className="space-y-3 text-sm text-slate-700">
          <p>
            Use this scaffold to launch a new project with quality gates, CI, and Pages deploy
            workflows preconfigured.
          </p>
          <p>
            Current API URL: <code>{appConfig.apiUrl || '(not set)'}</code>
          </p>
          <div>
            <Link to="/dashboard">
              <Button>Open dashboard</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
