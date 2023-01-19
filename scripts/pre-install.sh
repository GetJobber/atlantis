if test "$JOBBER_NPM_TOKEN" && ! test -f ".npmrc"; then
  echo "//registry.npmjs.org/:_authToken=\${JOBBER_NPM_TOKEN}" > ./.npmrc
fi
