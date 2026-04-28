import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { cn } from '@/lib/utils';
import { Camera, X, ChevronLeft, ChevronRight, Star, Eye } from 'lucide-react';
import { usePhotos } from '@/hooks/usePhotos';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { PhotoUploader } from '@/components/common/PhotoUploader';
import { AdminLogin } from '@/components/common/AdminLogin';

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.05 } }
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

export function Galeria() {
  const { photos, uploading, uploadError, addPhotos, removePhoto } = usePhotos();
  const { isAdmin, login, logout, openLogin } = useAdminAuth();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const handlePhotoClick = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(selectedPhotoIndex === 0 ? photos.length - 1 : selectedPhotoIndex - 1);
    }
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(selectedPhotoIndex === photos.length - 1 ? 0 : selectedPhotoIndex + 1);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrevPhoto(e as unknown as React.MouseEvent);
    } else if (e.key === 'ArrowRight') {
      handleNextPhoto(e as unknown as React.MouseEvent);
    } else if (e.key === 'Escape') {
      handleCloseLightbox();
    }
  };

  return (
    <div 
      className="min-h-screen bg-[hsl(265,50%,4%)]"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Header */}
      <div className="px-4 sm:px-6 pt-8 sm:pt-10 pb-4 sm:pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6 gap-3">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <motion.div
                className={cn(
                  'p-2.5 sm:p-4 rounded-xl sm:rounded-2xl flex-shrink-0',
                  'bg-gradient-to-br from-amber-400 to-orange-500',
                  'shadow-lg shadow-amber-500/25'
                )}
                whileHover={{ scale: 1.05, rotate: -5 }}
              >
                <Camera className="w-5 h-5 sm:w-7 sm:h-7 text-violet-950" />
              </motion.div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-white truncate">
                  Galería
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 truncate">
                  Momentos inolvidables de nuestras fiestas
                </p>
              </div>
            </div>
            <AdminLogin
              isAdmin={isAdmin}
              onLogin={login}
              onLogout={logout}
              onOpen={openLogin}
            />
          </div>
        </motion.div>

      </div>

      {/* Photo Uploader */}
      <div className="px-4 sm:px-6 pb-4">
        <PhotoUploader
          photos={photos}
          uploading={uploading}
          uploadError={uploadError}
          isAdmin={isAdmin}
          onAddPhotos={addPhotos}
          onRemovePhoto={removePhoto}
        />
      </div>

      {/* Photos Grid - Masonry Style */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 lg:w-4/5 lg:mx-auto">
        {photos.length > 0 ? (
          <motion.div 
            className="grid grid-cols-2 gap-2 sm:gap-3"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                variants={fadeInUp}
                onClick={() => handlePhotoClick(index)}
                className={cn(
                  'relative overflow-hidden cursor-pointer group',
                  'rounded-xl sm:rounded-2xl border border-white/10',
                  index === 0 ? 'col-span-2 aspect-[16/10] sm:aspect-[16/9]' : 
                  index === 3 ? 'col-span-1 aspect-square' : 
                  index % 3 === 0 ? 'aspect-[4/5]' : 'aspect-square'
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={photo.url}
                  alt={`Fiesta de 15 - ${photo.event_date}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Gradient overlay - always visible on mobile for better tap affordance */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Featured badge */}
                {photo.featured && (
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">
                    <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-violet-950 fill-violet-950" />
                  </div>
                )}

                {/* Hover content - visible on mobile too */}
                <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center gap-2 text-white">
                    <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-medium">Ver foto</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-white/70 mt-1">
                    {new Date(photo.event_date || '').toLocaleDateString('es-ES', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Camera className="w-10 h-10 text-slate-600" />
            </div>
            <p className="text-lg font-medium text-slate-300 mb-1">
              No hay fotos aún
            </p>
            <p className="text-sm text-slate-500">
              Pronto subiremos más contenido de nuestras fiestas
            </p>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseLightbox}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center"
          >
            {/* Close button */}
            <motion.button
              onClick={handleCloseLightbox}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2.5 sm:p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors touch-manipulation"
              aria-label="Cerrar galería"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            {/* Navigation */}
            <AnimatePresence>
              {photos.length > 1 && (
                <>
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={handlePrevPhoto}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-3 sm:p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors touch-manipulation"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={handleNextPhoto}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-3 sm:p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors touch-manipulation"
                    aria-label="Siguiente foto"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.button>
                </>
              )}
            </AnimatePresence>

            {/* Image */}
            <motion.div
              key={selectedPhotoIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[85vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[selectedPhotoIndex].url}
                alt="Fiesta de 15"
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>

            {/* Counter & Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-4"
            >
              <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-xs sm:text-sm">
                {selectedPhotoIndex + 1} / {photos.length}
              </div>
              {photos[selectedPhotoIndex].featured && (
                <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-violet-950 text-xs sm:text-sm font-medium flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Destacada
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
