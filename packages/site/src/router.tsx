import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const router = createRouter({ routeTree });

/**
 * Global type registration for TanStack Router (checklist item 4).
 * main.tsx imports ./router so this module is loaded and types are applied.
 */
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
