export const parseSizeArg = (sizeArg: string): number => {
  const bMatch = sizeArg.match(/^(\d+)$/i);
  const kbMatch = sizeArg.match(/^(\d+)kb$/i);
  const mbMatch = sizeArg.match(/^(\d+)mb/i);
  const gbMatch = sizeArg.match(/^(\d+)gb/i);

  let size = 0;

  if (bMatch) size = +bMatch[1];
  if (kbMatch) size = +kbMatch[1] * 1000;
  if (mbMatch) size = +mbMatch[1] * 1000 * 1000;
  if (gbMatch) size = +gbMatch[1] * 1000 * 1000 * 1000;

  return size;
};

export const createChunk = (size: number): string => {
  const charset =
    'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
  let chunk = '';

  for (let i = 0; i < size; i++) {
    chunk += charset[Math.floor(Math.random() * charset.length)];
  }

  return chunk;
};

export const getChunkSize = (size: number): number => {
  let chunkSize = Math.floor(size / 10);

  if (!chunkSize) chunkSize = 256;
  if (chunkSize > 10 * 1000 * 1000) chunkSize = 10 * 1000 * 1000;

  return chunkSize;
};
