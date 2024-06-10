import { ReactNode } from 'react';

type GridProps = {
  children: ReactNode;
};

export function Grid({ children }: GridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-6">{children}</div>
  );
}
