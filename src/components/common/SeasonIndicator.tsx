import { motion } from 'framer-motion';
import { useSeason } from '@/context/SeasonContext';
import { cn } from '@/lib/utils';
import { Snowflake, Sun } from 'lucide-react';

export function SeasonIndicator() {
  const { season } = useSeason();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 rounded-full',
        'bg-white/20 backdrop-blur-sm text-white text-xs font-medium'
      )}
    >
      {season === 'moscu' ? (
        <>
          <Snowflake className="w-3.5 h-3.5" />
          <span>Invierno</span>
        </>
      ) : (
        <>
          <Sun className="w-3.5 h-3.5" />
          <span>Verano</span>
        </>
      )}
    </motion.div>
  );
}
