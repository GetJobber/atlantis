if (typeof process === "undefined") {
  globalThis.process = {
    cwd: () => "/",
    // react-markdown relies on the nodejs `process` package
    // to determine if it's running in the browser or the server.
    // This is the only method they use so we stub it for them.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
}
export { Markdown } from "./Markdown";
