import type { ElementType, HTMLAttributes, ReactNode } from 'react';

const SIZE_VARIANTS = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
  '7xl': 'text-7xl',
  '8xl': 'text-8xl',
  '9xl': 'text-9xl',
};

const WEIGHT_VARIANTS = {
  normal: 'font-normal',
  bold: 'font-bold',
};

const COLORS_VARIANTS = {
  current: 'text-current',
  subtle: 'text-gray-900',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  danger: 'text-red-500',
};

type TextProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: ElementType;
  size?:
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl';
  weight?: 'normal' | 'bold';
  color?: 'current' | 'subtle' | 'success' | 'warning' | 'danger';
  className?: string;
};

export function Text({
  children,
  as: Component = 'p',
  size = 'base',
  weight = 'normal',
  color = 'current',
  className,
  ...props
}: TextProps) {
  return (
    <Component
      className={`${SIZE_VARIANTS[size]} ${WEIGHT_VARIANTS[weight]} ${COLORS_VARIANTS[color]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
