import { motion } from 'framer-motion';
import { Snowflake, Sun } from 'lucide-react';
import { useSeason } from '@/context/SeasonContext';
import { cn } from '@/lib/utils';

export function SeasonToggle() {
  const { season, toggleSeason } = useSeason();

  return (
    <motion.button
      onClick={toggleSeason}
      className={cn(
        'fixed bottom-24 right-4 z-40',
        'w-14 h-14 rounded-full',
        'flex items-center justify-center',
        'shadow-xl shadow-black/20',
        'backdrop-blur-md',
        'transition-all duration-300',
        'active:scale-90 touch-manipulation',
        season === 'moscu' ? 'bg-amber-500' : 'bg-violet-600'
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      style={{ minHeight: '44px', minWidth: '44px' }}
    >
      <motion.div
        key={season}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 180, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {season === 'moscu' ? (
          <Sun className="w-6 h-6 text-white" />
        ) : (
          <Snowflake className="w-6 h-6 text-white" />
        )}
      </motion.div>
    </motion.button>
  );
}
