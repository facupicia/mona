import { list } from '@vercel/blob';
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
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = getBlobReadWriteToken();

    if (!token) {
      return res.status(500).json({ error: 'BLOB_READ_WRITE_TOKEN is not configured' });
    }

    const { blobs } = await list({ token });

    const photos = blobs.map((b) => ({
      url: b.url,
      pathname: b.pathname,
      uploadedAt: b.uploadedAt,
    }));

    return res.status(200).json({ photos });
  } catch (error) {
    console.error('List error:', error);
    return res.status(500).json({
      error: 'List failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
