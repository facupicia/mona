import { del } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { pathname } = req.body;

    if (!pathname || typeof pathname !== 'string') {
      return res.status(400).json({ error: 'Missing pathname' });
    }

    await del(pathname);

    return res.status(200).json({ success: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Delete error:', error);
    return res.status(500).json({ error: 'Delete failed' });
  }
}
