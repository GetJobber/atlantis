import React from "react";
import { Icon } from "@jobber/components/Icon";

interface UseInternalChips {
  getSuffixProps: (
    isChipActive: boolean,
    showSelectedSuffix: boolean,
  ) => Record<string, unknown>;
}

const getSuffixProps = (isChipActive: boolean, showSelectedSuffix: boolean) => {
  if (isChipActive) {
    return showSelectedSuffix
      ? {
          suffix: (
            <Icon size="small" name="checkmark" color="interactiveSubtle" />
          ),
        }
      : {};
  }

  return {};
};

export function useInternalChips(): UseInternalChips {
  return {
    getSuffixProps,
  };
}
