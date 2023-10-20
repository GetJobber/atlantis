export function translateMonth(value: string) {
  if (/^en/.test(navigator.language)) return value;

  const localeFormatter = new Intl.DateTimeFormat(navigator.language, {
    month: "short",
  });

  const englishFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
  });

  const date = new Date(2000, 0, 1);

  return Array.from({ length: 12 }).reduce((acc: string, _, index) => {
    date.setMonth(index);

    return acc.replace(
      localeFormatter.format(date),
      englishFormatter.format(date),
    );
  }, value);
}
