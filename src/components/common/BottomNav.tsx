import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { Home, Calendar, Camera, Sparkles } from 'lucide-react';

type Page = 'home' | 'disponibilidad' | 'galeria';

interface BottomNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const { theme } = useTheme();

  const navItems: { 
    id: Page; 
    label: string; 
    icon: typeof Home;
    gradient: string;
  }[] = [
    { 
      id: 'home', 
      label: 'Inicio', 
      icon: Home,
      gradient: 'from-violet-500 to-purple-600'
    },
    { 
      id: 'disponibilidad', 
      label: 'Fechas', 
      icon: Calendar,
      gradient: 'from-pink-500 to-rose-600'
    },
    { 
      id: 'galeria', 
      label: 'Galería', 
      icon: Camera,
      gradient: 'from-amber-400 to-orange-500'
    },
  ];

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'px-4 pb-6 pt-3',
        'bg-gradient-to-t from-[hsl(265,50%,4%)] via-[hsl(265,50%,4%)]/95 to-transparent',
        'backdrop-blur-xl'
      )}
    >
      {/* Glow effect behind nav */}
      <div className="absolute inset-0 bg-gradient-to-t from-violet-500/5 to-transparent pointer-events-none" />
      
      <div className="relative max-w-md mx-auto">
        {/* Nav container with glass effect */}
        <div className={cn(
          'flex items-center justify-around p-2 rounded-3xl',
          'bg-white/[0.03] backdrop-blur-2xl',
          'border border-white/[0.08]',
          'shadow-2xl shadow-black/40'
        )}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'relative flex flex-col items-center gap-1 py-3 px-5 rounded-2xl',
                  'transition-all duration-300',
                  isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                )}
              >
                {/* Active background */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={cn(
                      'absolute inset-0 rounded-2xl',
                      'bg-gradient-to-br',
                      item.gradient
                    )}
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl" />
                    {/* Glow */}
                    <div className={cn(
                      'absolute -inset-1 rounded-2xl blur-lg opacity-50 -z-10',
                      'bg-gradient-to-br',
                      item.gradient
                    )} />
                  </motion.div>
                )}

                {/* Icon with animation */}
                <motion.div
                  animate={isActive ? { 
                    scale: [1, 1.2, 1],
                    rotate: [0, -5, 5, 0]
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className={cn(
                    'w-5 h-5 relative z-10',
                    isActive && 'drop-shadow-lg'
                  )} />
                </motion.div>

                {/* Label */}
                <span className={cn(
                  'text-xs font-medium relative z-10',
                  isActive ? 'text-white' : 'text-slate-500'
                )}>
                  {item.label}
                </span>

                {/* Active indicator dot */}
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-1 w-1 h-1 rounded-full bg-white/80"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Decorative sparkles */}
        <motion.div
          className="absolute -top-2 left-1/4"
          animate={{ 
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1, 0.8]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-3 h-3 text-amber-400/50" />
        </motion.div>
        <motion.div
          className="absolute -top-1 right-1/3"
          animate={{ 
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1, 0.8]
          }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        >
          <Sparkles className="w-2 h-2 text-violet-400/50" />
        </motion.div>
      </div>
    </motion.nav>
  );
}
