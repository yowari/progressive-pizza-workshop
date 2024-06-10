import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';

type ButtonProps<C extends ElementType> = ComponentPropsWithRef<C> & {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
};

export function Button<C extends ElementType>({
  children,
  className = '',
  as: Component = 'button',
  fullWidth = false,
  ...props
}: ButtonProps<C>) {
  return (
    <Component
      className={`bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg shadow ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
