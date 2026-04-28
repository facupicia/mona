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

const mockPhotos: Photo[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    event_date: '2025-12-15',
    featured: true,
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    event_date: '2025-12-15',
    featured: true,
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    event_date: '2025-11-20',
    featured: true,
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
    event_date: '2025-11-20',
    featured: false,
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80',
    event_date: '2025-10-08',
    featured: false,
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80',
    event_date: '2025-10-08',
    featured: true,
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800&q=80',
    event_date: '2025-09-12',
    featured: false,
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=800&q=80',
    event_date: '2025-09-12',
    featured: false,
  },
];

type StorageMode = 'vercel' | 'local';

export function usePhotos() {
  const [photos, setPhotos] = useState<Photo[]>(mockPhotos);
  const [isLoaded, setIsLoaded] = useState(false);
  const [uploading, setUploading] = useState(false);
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
            // Evitar duplicados
            const mockIds = new Set(mockPhotos.map((m) => m.id));
            const existingVercel = prev.filter(
              (p) => p.pathname && !mockIds.has(p.id)
            );
            const existingPaths = new Set(existingVercel.map((p) => p.pathname));
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

      // No permitir borrar fotos mock
      if (mockPhotos.some((m) => m.id === id)) return;

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

  return { photos, isLoaded, uploading, addPhotos, removePhoto };
}
