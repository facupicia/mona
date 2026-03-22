import { useSeason } from '@/context/SeasonContext';
import { cn } from '@/lib/utils';

interface SeasonWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function SeasonWrapper({ children, className }: SeasonWrapperProps) {
  const { theme } = useSeason();

  return (
    <div
      className={cn(
        'min-h-screen transition-colors duration-500',
        'bg-gradient-to-br',
        theme.bgGradient,
        theme.text,
        className
      )}
    >
      {children}
    </div>
  );
}
