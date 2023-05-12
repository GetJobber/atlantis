export function capitalize(text: string): string {
  if (!text) {
    return "";
  }
  return text.charAt(0).toLocaleUpperCase("en-US") + text.slice(1);
}
