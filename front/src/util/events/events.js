export const getHash = s => {
  let hash = 0;
  let i,
    char,
    l = 0;
  if (s.length === 0) return hash;
  for (i = 0, l = s.length; i < l; i++) {
    char = s.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
