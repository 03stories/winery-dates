import type { PropsWithChildren } from 'react';

type CardProps = PropsWithChildren<{
  title: string;
  description?: string;
}>;

export function Card({ title, description, children }: CardProps): JSX.Element {
  return (
    <section className="glass-panel rounded-3xl p-6 transition duration-300 hover:-translate-y-0.5">
      <h2 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h2>
      {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}
