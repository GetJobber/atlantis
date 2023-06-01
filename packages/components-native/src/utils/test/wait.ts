import { screen } from "@testing-library/react-native";
import { act } from "react-test-renderer";

/**
 * wait is used in our tests for testing Apollo Mocks
 * useQuery returns fetching equal to true in the first render
 * and the second render would return the mock result
 * using "await act(wait)", we can wait for the next rerender
 * to get the mock result of the query
 * @param milliseconds time to wait in milliseconds
 */
export async function wait(milliseconds = 0): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, milliseconds));
}

/**
 * Use this test helper thoughtfully. If you are running into the
 * "not wrapped in act(...)" warning while running your test it is
 * recommended that:
 *
 * 1. Double check that there are really no layout changes that you can test against.
 *    waitForUntestableRender will fail your test if it detects layout changes
 * 2. Re-evalutate your implementation. Maybe the managed state can be deferred to
 *    to a component further down the hierarchy? This can help prevent renders since
 *    your managed state isn't being used yet maybe?
 *
 * `waitForUntestableRender` is meant to be used as an alternative to
 *
 * ```tsx
 * await act(wait)
 * ```
 *
 * to make tests more readable.
 *
 * The `explanation` argument is required to ensure that a developer _thinks_
 * about why they need use this function. It is _really_ important that devs
 * understand when _and why_ a component's render cycle is flagged to be untested
 * So do not put a throwaway explanation here. If you don't know why your test
 * needs this function, find out!

 */
export const waitForUntestableRender = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _explanation: string,
): Promise<void> => {
  const before = JSON.stringify(screen.toJSON(), null, 2);

  await act(wait);

  const after = JSON.stringify(screen.toJSON(), null, 2);
  expect(before).toEqual(after);
};
