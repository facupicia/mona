import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSeason } from '@/context/SeasonContext';
import { cn } from '@/lib/utils';
import type { Photo } from '@/types';
import { StoriesView } from './StoriesView';

interface PhotoGridProps {
  photos: Photo[];
}

export function PhotoGrid({ photos }: PhotoGridProps) {
  const { theme } = useSeason();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Agrupar fotos por fecha
  const groupedPhotos = photos.reduce((acc, photo) => {
    const date = photo.event_date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(photo);
    return acc;
  }, {} as Record<string, Photo[]>);

  const sortedDates = Object.keys(groupedPhotos).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

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
                theme.card,
                theme.border,
                'border',
                theme.textMuted
              )}>
                {formattedDate}
              </span>
              <span className={cn('text-xs', theme.textMuted)}>
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

      {/* Stories view modal */}
      <StoriesView
        photos={photos}
        initialIndex={selectedIndex || 0}
        isOpen={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
      />
    </div>
  );
}
