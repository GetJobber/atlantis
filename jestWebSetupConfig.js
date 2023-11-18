// eslint-disable-next-line import/no-internal-modules
import "@testing-library/jest-dom/extend-expect";

let mockCount = 0;
const finalSection = 426655440000;

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useId: () => {
    mockCount += 1;

    return `123e4567-e89b-12d3-a456-${finalSection + mockCount}`;
  },
}));
