import React from "react";
import { Icon } from "@jobber/components/Icon";

interface UseInternalChips {
  getSuffixProps: (
    isChipActive: boolean,
    showSelectedSuffix: boolean,
  ) => Record<string, unknown>;
}

export function useInternalChips(): UseInternalChips {
  const getSuffixProps = (
    isChipActive: boolean,
    showSelectedSuffix: boolean,
  ) => {
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

  return {
    getSuffixProps,
  };
}
