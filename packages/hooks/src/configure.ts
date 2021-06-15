export type ErrorNotifierFunction = (message: string, error: unknown) => void;

export interface ConfigurationOptions {
  errorNotifier: ErrorNotifierFunction;
}

export const Configuration: ConfigurationOptions = {
  errorNotifier(message, error) {
    console.error(message, error);
  },
};

export function configure(options: ConfigurationOptions) {
  Object.assign(Configuration, options);
}
