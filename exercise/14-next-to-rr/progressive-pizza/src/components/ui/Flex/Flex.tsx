import { ReactNode } from 'react';

type FlexProps = {
  children: ReactNode;
};

export function Flex({ children }: FlexProps) {
  return <div className="flex justify-center gap-4">{children}</div>;
}
