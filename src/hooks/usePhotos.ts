import { useState, useEffect, useCallback } from 'react';
import type { Photo } from '@/types';

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

async function readJsonResponse(res: Response) {
  const contentType = res.headers.get('content-type') ?? '';

  if (!contentType.includes('application/json')) {
    const text = await res.text();
    const preview = text.trim().slice(0, 80);
    const isSourceCode = preview.startsWith('import ');
    throw new Error(
      isSourceCode
        ? 'La API de Vercel no se está ejecutando. En local usá npm run dev:vercel, no npm run dev.'
        : `La API no devolvió JSON: ${preview || res.statusText}`
    );
  }

  return res.json();
}

export function usePhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/list')
      .then((res) => {
        if (cancelled) return null;
        if (res.ok) {
          return readJsonResponse(res);
        }
        return readJsonResponse(res)
          .catch(() => ({}))
          .then((err) => {
            const errorMessage =
              [err.error, err.details].filter(Boolean).join(': ') ||
              'No se pudieron cargar las fotos';
            throw new Error(errorMessage);
          });
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
      .catch((error) => {
        if (cancelled) return;
        const message =
          error instanceof Error
            ? error.message
            : 'No se pudieron cargar las fotos';
        setUploadError(message);
        console.error('Photo list failed:', error);
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

          const filename = `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}.jpg`;
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64, filename }),
          });

          if (!res.ok) {
            const err = await readJsonResponse(res).catch(() => ({}));
            const errorMessage =
              [err.error, err.details].filter(Boolean).join(': ') ||
              'Upload failed';
            throw new Error(errorMessage);
          }

          const { url, pathname }: { url: string; pathname: string } =
            await readJsonResponse(res);

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
    []
  );

  const removePhoto = useCallback(
    async (id: string) => {
      const photo = photos.find((p) => p.id === id);
      if (!photo) return;

      if (!photo.pathname) {
        setPhotos((prev) => prev.filter((p) => p.id !== id));
        return;
      }

      try {
        const res = await fetch('/api/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pathname: photo.pathname }),
        });

        if (!res.ok) {
          const err = await readJsonResponse(res).catch(() => ({}));
          const errorMessage =
            [err.error, err.details].filter(Boolean).join(': ') ||
            'No se pudo eliminar la foto';
          throw new Error(errorMessage);
        }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'No se pudo eliminar la foto';
        setUploadError(message);
        console.error('Photo delete failed:', error);
        return;
      }

      setPhotos((prev) => prev.filter((p) => p.id !== id));
    },
    [photos]
  );

  return { photos, isLoaded, uploading, uploadError, addPhotos, removePhoto };
}
