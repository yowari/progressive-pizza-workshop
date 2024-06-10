import type { ReactNode } from 'react';
import classes from './Layout.module.css';

type LayoutProps = {
  children: ReactNode;
  center?: boolean;
  bottomSheet?: ReactNode;
};

export function Layout({ children, center = false, bottomSheet }: LayoutProps) {
  return (
    <div
      className={`min-h-screen flex flex-col items-center ${classes.backgroundPattern}`}
    >
      <main
        className={`w-full max-w-screen-lg flex-grow p-4 ${
          center ? 'flex flex-col items-center justify-center' : ''
        }`}
      >
        {children}
      </main>
      {bottomSheet && (
        <div className="sticky bottom-0 w-full p-4 bg-white border rounded-t-xl md:hidden">
          {bottomSheet}
        </div>
      )}
    </div>
  );
}
