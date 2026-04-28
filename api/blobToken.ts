export function getBlobReadWriteToken() {
  return process.env.BLOB_READ_WRITE_TOKEN ?? process.env.blob_READ_WRITE_TOKEN;
}
