// The API for shadows differs from iOS to Android.
// iOS shadows behave fairly similar to CSS and have access to the full set of
// Shadow properties: (https://reactnative.dev/docs/shadow-props).
// Android can only access the shadowColor property and is otherwise reliant on
// the more opinionated elevation:(https://reactnative.dev/docs/view-style-props#elevation-android).

function getShadowStyles(baseTokens) {
  const sharedStyles = {
    "shadow-color": baseTokens["color-black"],
    "shadow-color-android": "rgba(0,0,0,0.9)",
    "shadow-high-color-android": "rgba(0,0,0,0.5)",
    "space-zero": 0,
    "radius-small": baseTokens["space-minuscule"],
    // Elevation values for Android - these are not tokenized as they are extremely
    // context-dependent and should not be tied back to values like spacing
    "elevation-shadow-low": 2,
    "elevation-shadow-base": 6,
    "elevation-shadow-high": 12,
  };

  const sharedShadows = {
    "shadow-low": {
      shadowColor: sharedStyles["shadow-color"],
      shadowOffset: {
        width: sharedStyles["space-zero"],
        height: baseTokens["space-minuscule"],
      },
      shadowOpacity: 0.2,
      shadowRadius: sharedStyles["radius-small"],
      elevation: sharedStyles["elevation-shadow-low"],
    },
    "shadow-base": {
      shadowColor: sharedStyles["shadow-color"],
      shadowOffset: {
        width: sharedStyles["space-zero"],
        height: baseTokens["space-minuscule"],
      },
      shadowOpacity: 0.16,
      shadowRadius: baseTokens["radius-small"],
      elevation: sharedStyles["elevation-shadow-base"],
    },
    "shadow-high": {
      shadowColor: sharedStyles["shadow-color"],
      shadowOffset: {
        width: sharedStyles["space-zero"],
        height: baseTokens["space-small"],
      },
      shadowOpacity: 0.125,
      shadowRadius: baseTokens["space-base"],
      elevation: sharedStyles["elevation-shadow-high"],
    },
  };

  const androidShadows = {
    "shadow-low": sharedShadows["shadow-low"],
    "shadow-base": {
      ...sharedShadows["shadow-base"],
      shadowColor: sharedStyles["shadow-color-android"],
    },
    "shadow-high": {
      ...sharedShadows["shadow-high"],
      shadowColor: sharedStyles["shadow-high-color-android"],
    },
  };
  const iOSShadows = sharedShadows;

  return { androidShadows, iOSShadows };
}

module.exports = {
  getShadowStyles,
};
