import type { ComponentPropsWithRef, ReactNode } from 'react';
import { Text } from '../Text';

type CheckboxProps = ComponentPropsWithRef<'input'> & {
  children: ReactNode;
  imageUrl: string;
};

export function Checkbox({ children, imageUrl, ...props }: CheckboxProps) {
  return (
    <label className="relative inline-flex items-center cursor-pointer bg-white shadow border border-gray-300 hover:border-gray-400 rounded-md overflow-hidden has-[:checked]:border-orange-500 has-[:focus]:ring-2 has-[:focus]:ring-offset-2">
      <input
        className="peer absolute inset-0 margin-0 appearance-none overflow-hidden cursor-pointer"
        type="checkbox"
        {...props}
      />
      <img
        className="w-8 h-8 p-1 bg-gray-300 peer-[:checked]:bg-orange-500"
        src={imageUrl}
        alt=""
      />
      <Text className="text-ellipsis overflow-hidden px-2 py-1" color="subtle">
        {children}
      </Text>
    </label>
  );
}
