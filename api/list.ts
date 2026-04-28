import { list } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { blobs } = await list();

    const photos = blobs.map((b) => ({
      url: b.url,
      pathname: b.pathname,
      uploadedAt: b.uploadedAt,
    }));

    return res.status(200).json({ photos });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('List error:', error);
    return res.status(500).json({ error: 'List failed' });
  }
}
