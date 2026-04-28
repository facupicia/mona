import { put } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image, filename } = req.body;

    if (!image || typeof image !== 'string' || !filename || typeof filename !== 'string') {
      return res.status(400).json({ error: 'Missing image or filename' });
    }

    // Remove data URL prefix if present
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const blob = await put(filename, buffer, {
      access: 'public',
      contentType: 'image/jpeg',
    });

    return res.status(200).json({ url: blob.url, pathname: blob.pathname });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Upload failed' });
  }
}
