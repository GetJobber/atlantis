import React from "react";
import { Icon } from "@jobber/components/Icon";

interface UseInternalChips {
  getSuffixProps: (
    isChipActive: boolean,
    hideSuffix: boolean,
  ) => Record<string, unknown>;
}

export function useInternalChips(): UseInternalChips {
  const getSuffixProps = (isChipActive: boolean, hideSuffix: boolean) => {
    if (isChipActive) {
      return hideSuffix
        ? {}
        : {
            suffix: (
              <Icon size="small" name="checkmark" color="interactiveSubtle" />
            ),
          };
    }

    return {};
  };

  return {
    getSuffixProps,
  };
}
