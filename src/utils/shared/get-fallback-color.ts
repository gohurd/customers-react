export const getFallbackColor = (
  fallback: string,
  colors: string[]
): string => {
  if (!fallback || !colors?.length) {
    return "";
  }

  let hash = 0;

  for (let i = 0; i < fallback.length; i++) {
    hash = fallback.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
};
