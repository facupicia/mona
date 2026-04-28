import { put } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

function getBlobReadWriteToken() {
  const token =
    process.env.BLOB_READ_WRITE_TOKEN ?? process.env.blob_READ_WRITE_TOKEN;

  return token?.trim().replace(/^['"]|['"]$/g, '');
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image, filename } = req.body;
    const token = getBlobReadWriteToken();

    if (!image || typeof image !== 'string' || !filename || typeof filename !== 'string') {
      return res.status(400).json({ error: 'Missing image or filename' });
    }

    // Remove data URL prefix if present
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Check if BLOB_READ_WRITE_TOKEN is configured
    if (!token) {
      return res.status(500).json({ error: 'BLOB_READ_WRITE_TOKEN is not configured' });
    }

    // Vercel serverless functions have a 4.5MB body limit
    if (buffer.length > 4.5 * 1024 * 1024) {
      return res.status(413).json({ error: 'Image too large. Max 4.5MB allowed.' });
    }

    const blob = await put(filename, buffer, {
      access: 'public',
      contentType: 'image/jpeg',
      token,
    });

    return res.status(200).json({ url: blob.url, pathname: blob.pathname });
  } catch (error: unknown) {
    console.error('Upload error:', error);
    return res.status(500).json({
      error: 'Upload failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
