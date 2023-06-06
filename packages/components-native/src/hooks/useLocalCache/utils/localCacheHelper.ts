export function buildCustomId(
  customId?: string | string[],
): string | undefined {
  if (typeof customId === "string") {
    return customId;
  }

  if (Array.isArray(customId)) {
    return customId.join(":");
  }
}
