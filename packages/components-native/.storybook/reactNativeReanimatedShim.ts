/**
 * react-native-reanimated has a few internal APIs that throw errors when
 * used within web environments (react-native-web). I'm unsure how many
 * conditions may lead to these errors being thrown, but using fn() from storybook
 * is one case which causes it.
 */
setTimeout(() => {
  globalThis.UpdatePropsManager = () => {
    console.error(
      "[Reanimated] UpdatePropsManager is not available on the web",
    );
  };

  globalThis.ProgressTransitionRegister = () => {
    console.error(
      "[Reanimated] ProgressTransitionRegister is not available on the web",
    );
  };
}, 0);
