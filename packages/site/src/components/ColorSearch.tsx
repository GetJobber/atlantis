import React, { useMemo, useState } from "react";
import { InputText } from "@jobber/components/InputText";
import { Text } from "@jobber/components/Text";
import { Stack } from "@jobber/components/Stack";
import { Cluster } from "@jobber/components/Cluster";
import { Button } from "@jobber/components/Button";
import { showToast } from "@jobber/components/Toast";
import { allColors } from "@jobber/design";
import { colorsAreEqual, normalizeColor } from "../utils/colorUtils";

interface ColorMatch {
  readonly tokenName: string;
  readonly colorValue: string;
}

const ColorMatchItem: React.FC<ColorMatch> = ({ tokenName, colorValue }) => {
  const handleCopy = () => {
    const cssVar = `var(--${tokenName})`;
    navigator.clipboard.writeText(cssVar);
    showToast({ message: `Copied --${tokenName} to clipboard` });
  };

  return (
    <Cluster align="center" gap="smaller">
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: `var(--radius-small)`,
          background: colorValue,
          border: `var(--border-base) solid var(--color-border)`,
        }}
      />
      <code
        style={{
          background: `var(--color-surface--background)`,
          borderRadius: `var(--radius-base)`,
          fontFamily: "monospace",
          fontSize: `var(--typography--fontSize-small)`,
          padding: `var(--space-smallest) var(--space-small)`,
        }}
      >
        --{tokenName}
      </code>
      <Button
        size="small"
        variation="subtle"
        type="tertiary"
        icon="copy"
        onClick={handleCopy}
        ariaLabel="Copy"
      />
    </Cluster>
  );
};

export const ColorSearch: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  const colorMatches = useMemo(() => {
    if (!searchValue.trim()) return [];

    const normalizedSearch = normalizeColor(searchValue);
    const matches: ColorMatch[] = [];

    Object.entries(allColors).forEach(([tokenName, colorValue]) => {
      if (typeof colorValue === "string" && tokenName.startsWith("color-")) {
        const normalizedTokenValue = normalizeColor(colorValue);

        if (colorsAreEqual(normalizedSearch, normalizedTokenValue, 2)) {
          matches.push({ tokenName, colorValue });
        }
      }
    });

    return matches.sort((a, b) => a.tokenName.localeCompare(b.tokenName));
  }, [searchValue]);

  return (
    <Stack gap="base">
      <Text>
        Search for color tokens by entering a hex code, HSL or RGB(A) value
        (e.g. #032B3A, hsl(86, 100%, 46%), rgba(255,255,255,1)).
      </Text>

      <InputText
        value={searchValue}
        onChange={setSearchValue}
        placeholder="Search"
        version={2}
        aria-label="Enter color value to search"
      />

      {searchValue.trim() && colorMatches.length > 0 && (
        <Stack gap="small">
          {colorMatches.map(match => (
            <ColorMatchItem key={match.tokenName} {...match} />
          ))}
        </Stack>
      )}
      {searchValue.trim() && colorMatches.length === 0 && (
        <Text variation="subdued">No matching color tokens found.</Text>
      )}
    </Stack>
  );
};
