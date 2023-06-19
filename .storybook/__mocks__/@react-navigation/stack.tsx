import React from "react";
import * as Stack from "@react-navigation/stack";
import { Icon } from "@jobber/components/Icon";

// eslint-disable-next-line import/no-default-export
export default Stack;
export const useHeaderHeight = (): number => 0;
export const HeaderBackButton = (
  props: Stack.StackHeaderLeftButtonProps,
): JSX.Element => <Icon name="arrowLeft" customColor={props.tintColor} />;
