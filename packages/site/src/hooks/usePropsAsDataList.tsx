import { useMemo } from "react";
import { ContentExport } from "../types/content";

/**
 *
 * Map our Props to a DataList for display in the ComponentView
 *
 */
export const usePropsAsDataList = (
  meta: ContentExport,
  type: "web" | "mobile",
) => {
  const stateValues = useMemo(() => {
    const props = type === "web" ? meta?.props : meta?.mobileProps;

    return props?.map(propList => {
      return {
        name: propList.displayName,
        props: Object.keys(propList.props).map((key, index) => {
          const prop = propList.props[key];

          return {
            id: index,
            key,
            required: prop?.required ? "*" : "",
            description: prop?.description,
            component: prop?.type?.name,
          };
        }),
      };
    });
  }, [type]);

  return {
    stateValues,
  };
};
