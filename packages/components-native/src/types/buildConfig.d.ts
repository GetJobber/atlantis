declare module "react-native-build-config" {
  const BuildConfig: {
    IS_EDGE_TO_EDGE_ENABLED?: boolean;
    [k: string]: unknown;
  };
  export = BuildConfig;
}
