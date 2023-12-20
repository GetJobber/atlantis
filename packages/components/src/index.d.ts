export {};

interface AtlantisConfig {
  readonly JOBBER_RETHEME: boolean;
}

declare global {
  interface Window {
    ATLANTIS_CONFIG?: AtlantisConfig;
  }
}
