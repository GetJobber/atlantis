import { Box, Option, Select } from "@jobber/components";

interface VersionSelectProps {
  readonly labels: readonly string[];
  readonly valueIndex: number; // 0-based index
  readonly onChange: (index: number) => void;
}

export const VersionSelect = ({
  labels,
  valueIndex,
  onChange,
}: VersionSelectProps) => {
  if (!labels || labels.length === 0) return null;

  return (
    <Box margin={{ bottom: "base" }}>
      <Select
        placeholder="Version"
        value={String(valueIndex)}
        onChange={val => {
          const idx = Number(val);
          if (!Number.isNaN(idx)) onChange(idx);
        }}
      >
        {labels.map((label, idx) => (
          <Option key={idx} value={String(idx)}>
            {label}
          </Option>
        ))}
      </Select>
    </Box>
  );
};
