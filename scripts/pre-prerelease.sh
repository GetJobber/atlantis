if ! npm list -la 2>/dev/null | grep  -p "UNMET OPTIONAL DEPENDENCY @jobber\/fonts@1.0.0-pre-release.0"  ; then
  echo "Jobber Fonts in installed packaged. Please install without @jobber/fonts"
  echo "Please clear node_modules and packages with: npm run lerna:clean"
  echo "Then install dependencies with: export IGNORE_OPTIONAL_DEPENDENCIES=true; npm ci --no-optional"
  exit 1
fi

echo "Jobber Fonts not found! Continuing with release"
