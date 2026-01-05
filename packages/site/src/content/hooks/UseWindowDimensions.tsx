import { useWindowDimensions } from "@jobber/hooks/useWindowDimensions";

export function UseWindowDimensions() {
  const { width } = useWindowDimensions();

  return <h1>Width is {`${width}`}</h1>;
}
