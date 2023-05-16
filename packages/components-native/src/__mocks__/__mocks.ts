// eslint-disable-next-line import/no-internal-modules
import { MissingTranslationError } from "react-intl";
import mockRNLocalize from "react-native-localize/mock";

jest.mock("react-native-localize", () => ({
  ...mockRNLocalize,
  getTimeZone: () => "UTC",
}));

export const MOCK_INTL_CONFIG = {
  locale: "en-US",
  onError: (error: MissingTranslationError): void => {
    if (error.code === "MISSING_TRANSLATION") {
      return;
    }
    throw error;
  },
};

jest.mock("react-intl", () => {
  const reactIntl = jest.requireActual("react-intl");
  const intl = reactIntl.createIntl(MOCK_INTL_CONFIG);

  return {
    ...reactIntl,
    useIntl: () => intl,
  };
});
