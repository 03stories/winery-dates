import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export function Button({ children, className = '', ...props }: ButtonProps): JSX.Element {
  return (
    <button
      className={`rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
