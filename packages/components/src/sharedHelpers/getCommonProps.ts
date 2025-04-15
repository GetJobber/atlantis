export function dataPropsMapped(data?: Record<string, string>) {
  return Object.entries(data || {}).map(([key, value]) => ({
    [key]: value,
  }));
}

export function ariaPropsMapped(aria?: React.AriaAttributes) {
  return Object.entries(aria || {}).map(([key, value]) => ({
    [key]: value,
  }));
}
