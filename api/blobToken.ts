export function getBlobReadWriteToken() {
  const token =
    process.env.BLOB_READ_WRITE_TOKEN ?? process.env.blob_READ_WRITE_TOKEN;

  if (!token) return undefined;

  return token.trim().replace(/^['"]|['"]$/g, '');
}
