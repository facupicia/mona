import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSeason } from '@/context/SeasonContext';
import { PhotoGrid } from '@/components/common/PhotoGrid';
import { cn } from '@/lib/utils';
import { Camera, Filter } from 'lucide-react';
import type { Photo } from '@/types';

// Fotos de ejemplo
const mockPhotos: Photo[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=600&q=80',
    event_date: '2026-03-15',
    season: 'moscu',
    featured: true,
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80',
    event_date: '2026-03-15',
    season: 'moscu',
    featured: false,
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80',
    event_date: '2026-03-15',
    season: 'moscu',
    featured: true,
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80',
    event_date: '2026-03-08',
    season: 'california',
    featured: true,
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&q=80',
    event_date: '2026-03-08',
    season: 'california',
    featured: false,
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=600&q=80',
    event_date: '2026-03-08',
    season: 'california',
    featured: false,
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600&q=80',
    event_date: '2026-03-01',
    season: 'moscu',
    featured: true,
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
    event_date: '2026-03-01',
    season: 'moscu',
    featured: false,
  },
];

export function Galeria() {
  const { theme, season } = useSeason();
  const [filter, setFilter] = useState<'all' | 'current' | 'featured'>('all');

  const filteredPhotos = useMemo(() => {
    let photos = mockPhotos;
    
    if (filter === 'current') {
      photos = photos.filter(p => p.season === season);
    } else if (filter === 'featured') {
      photos = photos.filter(p => p.featured);
    }
    
    return photos;
  }, [filter, season]);

  // Obtener fechas únicas para los chips
  const uniqueDates = useMemo(() => {
    const dates = [...new Set(mockPhotos.map(p => p.event_date))];
    return dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  }, []);

  return (
    <div className={cn('min-h-screen pb-24', theme.bg)}>
      {/* Header */}
      <div className={cn('px-6 pt-8 pb-4', theme.bg)}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={cn('p-2 rounded-xl', theme.primary)}>
              <Camera className="w-5 h-5 text-white" />
            </div>
            <h1 className={cn('text-3xl font-bold', theme.text)}>
              Galería
            </h1>
          </div>
          <p className={cn('text-base', theme.textMuted)}>
            Revive las mejores noches
          </p>
        </motion.div>

        {/* Filter chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide"
        >
          <Filter className={cn('w-4 h-4 flex-shrink-0', theme.textMuted)} />
          
          {[
            { value: 'all' as const, label: 'Todas' },
            { value: 'current' as const, label: 'Temporada actual' },
            { value: 'featured' as const, label: 'Destacadas' },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium',
                'whitespace-nowrap transition-all',
                'active:scale-95',
                filter === f.value
                  ? cn(theme.primary, 'text-white')
                  : cn(theme.card, theme.border, 'border', theme.text)
              )}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Date chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide"
        >
          {uniqueDates.map((date) => {
            const formattedDate = new Date(date).toLocaleDateString('es-ES', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
            });
            
            return (
              <span
                key={date}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs',
                  theme.card,
                  theme.border,
                  'border',
                  theme.textMuted
                )}
              >
                {formattedDate}
              </span>
            );
          })}
        </motion.div>
      </div>

      {/* Photos */}
      <div className="px-6 py-4">
        {filteredPhotos.length > 0 ? (
          <PhotoGrid photos={filteredPhotos} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              'flex flex-col items-center justify-center py-16',
              'text-center'
            )}
          >
            <Camera className={cn('w-16 h-16 mb-4', theme.textMuted)} />
            <p className={cn('text-lg font-medium', theme.text)}>
              No hay fotos aún
            </p>
            <p className={cn('text-sm', theme.textMuted)}>
              Vuelve pronto para ver más contenido
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
