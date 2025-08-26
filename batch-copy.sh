#!/usr/bin/env bash
set -euo pipefail

# Resolve repository root based on this script's location
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

SRC_DIR="$SCRIPT_DIR/docs/components"
DEST_DIR="$SCRIPT_DIR/packages/site/src/content"

if [ ! -d "$SRC_DIR" ]; then
  echo "Source directory not found: $SRC_DIR" >&2
  exit 1
fi

# Allow globs that match nothing to expand to nothing
shopt -s nullglob

copied_count=0
skipped_count=0

for src in "$SRC_DIR"/*/*.stories.mdx; do
  [ -e "$src" ] || continue

  component_name="$(basename "$(dirname "$src")")"
  filename="$(basename "$src")"
  expected_filename="${component_name}.stories.mdx"

  if [ "$filename" != "$expected_filename" ]; then
    echo "Skipping (name mismatch): $src"
    skipped_count=$((skipped_count + 1))
    continue
  fi

  dest_dir="$DEST_DIR/$component_name"
  dest_path="$dest_dir/$filename"

  mkdir -p "$dest_dir"
  cp -f "$src" "$dest_path"
  echo "Copied: $src -> $dest_path"
  copied_count=$((copied_count + 1))
done

echo "Done. Copied ${copied_count} file(s). Skipped ${skipped_count}."

exit 0
