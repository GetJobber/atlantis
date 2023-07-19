import { format as prettierFormat } from "prettier";
// Need the parser to be imported like this
// eslint-disable-next-line import/no-internal-modules
import parserBabel from "prettier/parser-babel";

export function formatCode(code: string): string {
  return prettierFormat(code, {
    parser: "babel",
    plugins: [parserBabel],
  });
}
