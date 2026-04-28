import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, ImagePlus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Photo } from '@/types';

interface PhotoUploaderProps {
  photos: Photo[];
  uploading: boolean;
  isAdmin: boolean;
  onAddPhotos: (files: FileList | null) => void;
  onRemovePhoto: (id: string) => void;
}

export function PhotoUploader({ photos, uploading, isAdmin, onAddPhotos, onRemovePhoto }: PhotoUploaderProps) {
  if (!isAdmin) return null;
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const userPhotos = photos.filter((p) => p.id?.startsWith('user-'));

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        onAddPhotos(e.dataTransfer.files);
      }
    },
    [onAddPhotos]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onAddPhotos(e.target.files);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [onAddPhotos]
  );

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'relative border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer',
          isDragging
            ? 'border-violet-500 bg-violet-500/10 scale-[1.02]'
            : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/[0.07]'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
        <AnimatePresence mode="wait">
          {uploading ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
              <p className="text-sm text-slate-300">Procesando fotos...</p>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <div
                className={cn(
                  'p-3 rounded-xl transition-colors',
                  isDragging ? 'bg-violet-500/20' : 'bg-white/10'
                )}
              >
                <Upload className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {isDragging ? 'Suelta las fotos aquí' : 'Arrastra fotos aquí o haz clic para seleccionar'}
                </p>
                <p className="text-xs text-slate-500 mt-1">JPG, PNG, WebP · Máx. 10MB por foto</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* User Photos Preview */}
      <AnimatePresence>
        {userPhotos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <ImagePlus className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-medium text-white">Tus fotos subidas</span>
                <span className="text-xs text-slate-500">({userPhotos.length})</span>
              </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {userPhotos.map((photo) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative aspect-square rounded-xl overflow-hidden group"
                >
                  <img
                    src={photo.url}
                    alt="Foto subida"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (photo.id) onRemovePhoto(photo.id);
                    }}
                    aria-label="Eliminar foto"
                    className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-black/60 text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-red-500/80 touch-manipulation"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-1.5">
                    <p className="text-[10px] text-white/80 truncate">
                      {photo.event_date
                        ? new Date(photo.event_date).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'short',
                          })
                        : ''}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
