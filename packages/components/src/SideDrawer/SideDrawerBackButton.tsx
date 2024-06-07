import { useEffect } from "react";
import { useSideDrawerContext } from "./SideDrawerContext";
import { ButtonProps } from "../Button";

export function SideDrawerBackButton(props: Pick<ButtonProps, "onClick">) {
  const { registerComponent, unRegisterComponent } = useSideDrawerContext();

  useEffect(() => {
    registerComponent({ backButton: props });

    return () => unRegisterComponent("backButton");
  }, [registerComponent, unRegisterComponent, props]);

  return null;
}
