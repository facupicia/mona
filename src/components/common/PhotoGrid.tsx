import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { cn } from '@/lib/utils';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Photo } from '@/types';

interface PhotoGridProps {
  photos: Photo[];
}

export function PhotoGrid({ photos }: PhotoGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Agrupar fotos por fecha
  const groupedPhotos = photos.reduce((acc, photo) => {
    const date = photo.event_date || 'sin-fecha';
    if (!acc[date]) acc[date] = [];
    acc[date].push(photo);
    return acc;
  }, {} as Record<string, Photo[]>);

  const sortedDates = Object.keys(groupedPhotos).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  const handleClose = () => setSelectedIndex(null);
  
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? photos.length - 1 : selectedIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === photos.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  return (
    <div className="space-y-6">
      {sortedDates.map((date) => {
        const datePhotos = groupedPhotos[date];
        const formattedDate = new Date(date).toLocaleDateString('es-ES', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        });

        return (
          <div key={date} className="space-y-3">
            {/* Date chip */}
            <div className="flex items-center gap-2 px-1">
              <span className={cn(
                'text-xs font-medium px-3 py-1 rounded-full',
                'bg-slate-900/50 border border-slate-800 text-slate-400'
              )}>
                {formattedDate}
              </span>
              <span className={cn('text-xs text-slate-500')}>
                {datePhotos.length} fotos
              </span>
            </div>

            {/* Horizontal scroll */}
            <div 
              className="flex gap-3 overflow-x-auto pb-2 px-1 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {datePhotos.map((photo, idx) => {
                const globalIndex = photos.findIndex(p => p.id === photo.id);
                
                return (
                  <motion.button
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setSelectedIndex(globalIndex)}
                    className={cn(
                      'flex-shrink-0 relative overflow-hidden rounded-2xl',
                      'snap-start',
                      'active:scale-95 transition-transform'
                    )}
                    style={{ width: '160px', height: '220px' }}
                  >
                    <img
                      src={photo.url}
                      alt={`Foto ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Featured badge */}
                    {photo.featured && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-medium">
                        Destacada
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl max-h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[selectedIndex].url}
                alt="Foto"
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {selectedIndex + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
