import { useMediaQueries } from "./useMediaQueries";

export function useResponsiveSizing() {
  const xs = useMediaQueries("(width > 0px)");
  const sm = useMediaQueries("(width >= 490px)");
  const md = useMediaQueries("(width >= 768px)");
  const lg = useMediaQueries("(width >= 1080px)");
  const xl = useMediaQueries("(width >= 1440px)");

  return { xs, sm, md, lg, xl };
}
