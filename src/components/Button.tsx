import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export function Button({ children, className = '', ...props }: ButtonProps): JSX.Element {
  return (
    <button
      className={`squircle bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[var(--shadow-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 active:translate-y-0 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
