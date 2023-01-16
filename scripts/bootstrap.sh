#!/bin/bash

if test -z "$IGNORE_OPTIONAL_DEPENDENCIES"; then
  npm whoami
  npx lerna bootstrap
  find -type d -path "**/@jobber/fonts"
else
  echo IGNORE_OPTIONAL_DEPENDENCIES set, not installing optional dependencies;
  npx lerna bootstrap -- --no-optional;
fi
