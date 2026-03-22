import { useSeason } from '@/context/SeasonContext';
import { cn } from '@/lib/utils';
import { Home, Calendar, Camera } from 'lucide-react';

type Page = 'home' | 'eventos' | 'galeria';

interface BottomNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const { theme } = useSeason();

  const navItems: { id: Page; label: string; icon: typeof Home }[] = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'eventos', label: 'Eventos', icon: Calendar },
    { id: 'galeria', label: 'Galería', icon: Camera },
  ];

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'px-6 pb-6 pt-2',
        theme.navBg,
        'backdrop-blur-xl border-t',
        theme.border
      )}
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                'flex flex-col items-center gap-1 py-2 px-4 rounded-xl',
                'transition-all duration-200',
                'active:scale-95',
                isActive
                  ? cn(theme.primary, 'text-white')
                  : cn(theme.textMuted, 'hover:text-white')
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
