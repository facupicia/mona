import { del } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getBlobReadWriteToken } from './blobToken';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { pathname } = req.body;
    const token = getBlobReadWriteToken();

    if (!pathname || typeof pathname !== 'string') {
      return res.status(400).json({ error: 'Missing pathname' });
    }

    if (!token) {
      return res.status(500).json({ error: 'BLOB_READ_WRITE_TOKEN is not configured' });
    }

    await del(pathname, { token });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return res.status(500).json({ error: 'Delete failed' });
  }
}
