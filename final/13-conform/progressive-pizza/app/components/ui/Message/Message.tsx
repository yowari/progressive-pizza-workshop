import { ReactNode } from 'react';
import { Text } from '../Text';

type MessageProps = {
  children: ReactNode;
  title: string;
  subtitle: string;
  imageUrl?: string;
  actions?: ReactNode;
};

export function Message({
  children,
  title,
  subtitle,
  imageUrl,
  actions,
}: MessageProps) {
  return (
    <div className="flex flex-col gap-4 items-center max-w-lg p-8 bg-white border border-gray-200 rounded-md shadow-sm">
      <Text as="h2" size="2xl">
        {title}
      </Text>
      <Text size="xl" weight="bold" color="subtle">
        {subtitle}
      </Text>
      {imageUrl && <img className="w-32 h-32" src={imageUrl} alt="" />}
      <Text color="subtle">{children}</Text>
      {actions}
    </div>
  );
}
