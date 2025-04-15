export function dataPropsMapped(data?: Record<string, string>) {
  return Object.entries(data || {}).map(([key, value]) => ({
    [`data-${key}`]: value,
  }));
}

export function ariaPropsMapped(aria?: Record<string, string>) {
  return Object.entries(aria || {}).map(([key, value]) => ({
    [`aria-${key}`]: value,
  }));
}
