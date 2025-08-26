#!/usr/bin/env bash

# Update old Storybook MDX files under docs to link to the new docs site.
#
# For each file matching docs/components/<Component>/<Component>.stories.mdx:
# - Keep only this import: import { Meta } from "@storybook/addon-docs";
# - Use <Meta title="..." /> preserving the existing title value; remove component prop
# - Keep the existing H1 heading (e.g., "# Button")
# - Remove all content below the H1
# - Add a single line linking to https://atlantis.getjobber.com/components/<Component>
#
# macOS/BSD compatible; uses only standard shell utilities.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
DOCS_DIR="$ROOT_DIR/docs/components"

if [[ ! -d "$DOCS_DIR" ]]; then
  echo "Docs directory not found: $DOCS_DIR" >&2
  exit 1
fi

updated_count=0
skipped_count=0

while IFS= read -r -d '' file; do
  dir_path="$(dirname "$file")"
  component_name="$(basename "$dir_path")"

  # Extract the existing title attribute (preserve the exact string including quotes)
  title_attr=$(grep -Eo 'title="[^"]*"' "$file" | head -n1 || true)
  if [[ -z "$title_attr" ]]; then
    # Fallback to single quotes if needed
    title_attr=$(grep -Eo "title='[^']*'" "$file" | head -n1 || true)
  fi

  if [[ -z "$title_attr" ]]; then
    echo "Skipping (no title= found): $file" >&2
    ((skipped_count++)) || true
    continue
  fi

  # Remove the leading 'title=' to keep the quoted value only
  title_value="${title_attr#title=}"

  # Extract the existing H1 heading; if none found, synthesize one from the component name
  h1_line=$(grep -m1 '^# ' "$file" || true)
  if [[ -z "$h1_line" ]]; then
    h1_line="# $component_name"
  fi

  tmp_file="$(mktemp)"
  {
    echo 'import { Meta } from "@storybook/addon-docs";'
    echo
    echo "<Meta title=$title_value />"
    echo
    echo "$h1_line"
    echo
    echo "[$component_name docs](https://atlantis.getjobber.com/components/$component_name) have moved to the new site."
  } > "$tmp_file"

  mv "$tmp_file" "$file"
  echo "Updated: $file"
  ((updated_count++)) || true
done < <(find "$DOCS_DIR" -type f -name "*.stories.mdx" -print0)

echo "\nDone. Updated: $updated_count file(s). Skipped: $skipped_count file(s)."
