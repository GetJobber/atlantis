import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { useOnMount } from "@jobber/hooks";
import ReactGA from "react-ga4";

const IS_PROD = window.location.hostname === "atlantis.getjobber.com";

/**
 * Analytics tracks page navigations and reports them to our analytics provider.
 */
export function Analytics() {
  const location = useLocation();

  useOnMount(() => {
    if (!IS_PROD) return;
    ReactGA.initialize("G-V1N3TQVQB5");
  });

  useEffect(() => {
    if (!IS_PROD) return;
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname,
    });
  }, [location.pathname]);

  return null;
}
