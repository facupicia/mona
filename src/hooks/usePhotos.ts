import { useState, useEffect, useCallback } from 'react';
import type { Photo } from '@/types';

const LOCAL_STORAGE_KEY = 'mona-gallery-user-photos';

function resizeAndConvertToBase64(
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('No se pudo obtener el contexto del canvas'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

type StorageMode = 'vercel' | 'local';

export function usePhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [mode, setMode] = useState<StorageMode>('local');

  // Detectar si estamos en Vercel (producción) o local
  useEffect(() => {
    let cancelled = false;

    fetch('/api/list')
      .then((res) => {
        if (cancelled) return null;
        if (res.ok) {
          setMode('vercel');
          return res.json();
        }
        throw new Error('Not vercel');
      })
      .then((data) => {
        if (cancelled || !data) return;
        if (data.photos && Array.isArray(data.photos)) {
          const vercelPhotos: Photo[] = data.photos.map(
            (p: { url: string; pathname: string; uploadedAt?: string }) => ({
              id: p.pathname,
              url: p.url,
              pathname: p.pathname,
              event_date: p.uploadedAt
                ? p.uploadedAt.split('T')[0]
                : new Date().toISOString().split('T')[0],
              featured: false,
            })
          );
          setPhotos((prev) => {
            const existingPaths = new Set(prev.map((p) => p.pathname));
            const newVercel = vercelPhotos.filter(
              (p) => !existingPaths.has(p.pathname)
            );
            return [...prev, ...newVercel];
          });
        }
      })
      .catch(() => {
        // Fallback a localStorage
        if (cancelled) return;
        try {
          const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (stored) {
            const userPhotos: Photo[] = JSON.parse(stored);
            setPhotos((prev) => [...prev, ...userPhotos]);
          }
        } catch {
          // ignore
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const addPhotos = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      setUploading(true);
      setUploadError(null);

      try {
        for (const file of Array.from(files)) {
          if (!file.type.startsWith('image/')) continue;

          const base64 = await resizeAndConvertToBase64(file);

          if (mode === 'vercel') {
            const filename = `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}.jpg`;
            const res = await fetch('/api/upload', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ image: base64, filename }),
            });

            if (!res.ok) {
              const err = await res.json().catch(() => ({}));
              throw new Error(err.error || 'Upload failed');
            }

            const { url, pathname }: { url: string; pathname: string } =
              await res.json();

            setPhotos((prev) => [
              ...prev,
              {
                id: pathname,
                url,
                pathname,
                event_date: new Date().toISOString().split('T')[0],
                featured: false,
              },
            ]);
          } else {
            // localStorage fallback
            const photo: Photo = {
              id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
              url: base64,
              event_date: new Date().toISOString().split('T')[0],
              featured: false,
            };
            setPhotos((prev) => {
              const updated = [...prev, photo];
              const userPhotos = updated.filter(
                (p) => p.id?.startsWith('user-')
              );
              localStorage.setItem(
                LOCAL_STORAGE_KEY,
                JSON.stringify(userPhotos)
              );
              return updated;
            });
          }
        }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'No se pudieron subir las fotos';
        setUploadError(message);
        console.error('Photo upload failed:', error);
      } finally {
        setUploading(false);
      }
    },
    [mode]
  );

  const removePhoto = useCallback(
    async (id: string) => {
      const photo = photos.find((p) => p.id === id);
      if (!photo) return;

      if (mode === 'vercel' && photo.pathname) {
        try {
          await fetch('/api/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pathname: photo.pathname }),
          });
        } catch {
          // ignore
        }
      } else if (mode === 'local') {
        try {
          const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (stored) {
            const userPhotos: Photo[] = JSON.parse(stored);
            const updated = userPhotos.filter((p) => p.id !== id);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
          }
        } catch {
          // ignore
        }
      }

      setPhotos((prev) => prev.filter((p) => p.id !== id));
    },
    [mode, photos]
  );

  return { photos, isLoaded, uploading, uploadError, addPhotos, removePhoto };
}
