import type { ComponentPropsWithRef, ReactNode } from 'react';
import { Text } from '../Text';

type RadioProps = ComponentPropsWithRef<'input'> & {
  children: ReactNode;
  imageUrl: string;
};

export function Radio({ children, imageUrl, ...props }: RadioProps) {
  return (
    <label className="relative inline-block text-center w-fit bg-white shadow border border-gray-300 rounded-lg py-3 px-4 hover:border-gray-400 has-[:checked]:border-orange-500 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-offset-2">
      <input
        className="absolute inset-0 margin-0 appearance-none overflow-hidden cursor-pointer focus-visible:outline-none"
        type="radio"
        {...props}
      />
      <img className="w-16 h-16 mx-auto" src={imageUrl} alt="" />
      <Text color="subtle">{children}</Text>
    </label>
  );
}
