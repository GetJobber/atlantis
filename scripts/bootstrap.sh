#!/bin/bash

if test -z "$IGNORE_OPTIONAL_DEPENDENCIES"; then
  npx lerna bootstrap
else
  echo IGNORE_OPTIONAL_DEPENDENCIES set, not installing optional dependencies;
  npx lerna bootstrap -- --no-optional;
fi
