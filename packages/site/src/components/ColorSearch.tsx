import React, { useMemo, useState } from "react";
import { InputText } from "@jobber/components/InputText";
import { Text } from "@jobber/components/Text";
import { Stack } from "@jobber/components/Stack";
import { Cluster } from "@jobber/components/Cluster";
import { allColors } from "@jobber/design";
import { Button } from "@jobber/components/Button";
import { showToast } from "@jobber/components/Toast";
import { colorsAreEqual, normalizeColor } from "../utils/colorUtils";

interface ColorMatch {
  tokenName: string;
  colorValue: string;
}

export const ColorSearch: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  const colorMatches = useMemo(() => {
    if (!searchValue.trim()) return [];

    const normalizedSearch = normalizeColor(searchValue);
    const matches: ColorMatch[] = [];

    // Search through all color tokens
    Object.entries(allColors).forEach(([tokenName, colorValue]) => {
      if (typeof colorValue === "string" && tokenName.startsWith("color-")) {
        const normalizedTokenValue = normalizeColor(colorValue);

        if (colorsAreEqual(normalizedSearch, normalizedTokenValue, 2)) {
          matches.push({
            tokenName,
            colorValue,
          });
        }
      }
    });

    return matches.sort((a, b) => a.tokenName.localeCompare(b.tokenName));
  }, [searchValue]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <Stack gap="base">
      <Stack gap="small">
        <Text>
          Search for color tokens by entering a hex code, HSL or RGB value (e.g.
          #032B3A, hsl(86, 100%, 46%), rgba(255,255,255,1)).
        </Text>
      </Stack>

      <Stack gap="base">
        <Stack gap="small">
          <InputText
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search"
            aria-label="Enter color value to search"
          />
        </Stack>
      </Stack>

      {searchValue.trim() && (
        <Stack gap="base">
          {colorMatches.length > 0 && (
            <Stack gap="small">
              {colorMatches.map(match => (
                <Cluster key={match.tokenName} align="center" gap="small">
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 6,
                      background: match.colorValue,
                      border: "1px solid #eee",
                    }}
                  />
                  <code
                    style={{
                      background: "#f5f5f0",
                      borderRadius: 8,
                      padding: "2px 8px",
                      fontFamily: "monospace",
                      fontSize: 14,
                    }}
                  >
                    --{match.tokenName}
                  </code>
                  <Button
                    size="small"
                    variation="subtle"
                    type="tertiary"
                    icon="copy"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `var(--${match.tokenName})`,
                      );
                      showToast({
                        message: `Copied --${match.tokenName} to clipboard`,
                      });
                    }}
                    ariaLabel="Copy"
                  />
                </Cluster>
              ))}
            </Stack>
          )}
        </Stack>
      )}
    </Stack>
  );
};
