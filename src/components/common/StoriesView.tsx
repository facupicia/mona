import { useState } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Photo } from '@/types';

interface StoriesViewProps {
  photos: Photo[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export function StoriesView({ photos, initialIndex = 0, isOpen, onClose }: StoriesViewProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentPhoto = photos[currentIndex];

  const goToNext = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      goToNext();
    } else if (info.offset.x > threshold) {
      goToPrev();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && currentPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black"
        >
          {/* Progress bars */}
          <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-2">
            {photos.map((_, idx) => (
              <div
                key={idx}
                className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
              >
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: idx < currentIndex ? '100%' : '0%' }}
                  animate={{ width: idx === currentIndex ? '100%' : idx < currentIndex ? '100%' : '0%' }}
                  transition={{ duration: idx === currentIndex ? 5 : 0, ease: 'linear' }}
                />
              </div>
            ))}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-12 right-4 z-10 p-2 rounded-full bg-black/50 text-white"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Photo counter */}
          <div className="absolute top-12 left-4 z-10 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
            {currentIndex + 1} / {photos.length}
          </div>

          {/* Photo container */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="w-full h-full flex items-center justify-center touch-pan-y"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentPhoto.id}
                src={currentPhoto.url}
                alt={`Foto ${currentIndex + 1}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="max-w-full max-h-full object-contain"
                draggable={false}
              />
            </AnimatePresence>
          </motion.div>

          {/* Navigation areas */}
          <div className="absolute inset-y-0 left-0 w-1/4 flex items-center">
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className={cn(
                'p-2 ml-2 rounded-full bg-black/50 text-white',
                'transition-opacity',
                currentIndex === 0 && 'opacity-0'
              )}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 w-1/4 flex items-center justify-end">
            <button
              onClick={goToNext}
              disabled={currentIndex === photos.length - 1}
              className={cn(
                'p-2 mr-2 rounded-full bg-black/50 text-white',
                'transition-opacity',
                currentIndex === photos.length - 1 && 'opacity-0'
              )}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Date info */}
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="text-white/80 text-sm">
              {new Date(currentPhoto.event_date).toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
