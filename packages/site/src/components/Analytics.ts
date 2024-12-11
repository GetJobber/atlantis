import { useEffect } from "react";
import { useLocation } from "react-router";
import { useOnMount } from "@jobber/hooks";
import ReactGA from "react-ga4";

const IS_LOCAL = window.location.hostname.includes("localhost");

/**
 * Analytics tracks page navigations and reports them to our analytics provider.
 */
export function Analytics() {
  const location = useLocation();

  useOnMount(() => {
    if (IS_LOCAL) return;
    ReactGA.initialize("G-V1N3TQVQB5");
  });

  useEffect(() => {
    if (IS_LOCAL) return;
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname,
    });
  }, [location]);

  return null;
}
