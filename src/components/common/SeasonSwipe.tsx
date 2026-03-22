import { useRef, type ReactNode } from 'react';
import { motion, type PanInfo } from 'framer-motion';
import { useSeason } from '@/context/SeasonContext';

interface SeasonSwipeProps {
  children: ReactNode;
}

export function SeasonSwipe({ children }: SeasonSwipeProps) {
  const { toggleSeason } = useSeason();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 80;
    if (Math.abs(info.offset.x) > threshold) {
      toggleSeason();
    }
  };

  return (
    <motion.div
      ref={containerRef}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.3}
      onDragEnd={handleDragEnd}
      className="touch-pan-y"
    >
      {children}
    </motion.div>
  );
}
