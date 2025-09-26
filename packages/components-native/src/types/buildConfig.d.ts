declare module "react-native-build-config" {
  interface BuildConfigType {
    default?: {
      IS_EDGE_TO_EDGE_ENABLED?: boolean;
      [key: string]: unknown;
    };
    IS_EDGE_TO_EDGE_ENABLED?: boolean; // fallback for direct access
    [key: string]: unknown;
  }

  const BuildConfig: BuildConfigType;
  export = BuildConfig;
}
