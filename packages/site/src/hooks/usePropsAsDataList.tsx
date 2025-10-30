import { useMemo } from "react";
import { ComponentType, ContentExport } from "../types/content";
import { getComponentProps } from "../utils/componentTypeUtils";

/**
 *
 * Map our Props to a DataList for display in the ComponentView
 *
 */
export const usePropsAsDataList = (
  meta: ContentExport,
  type: ComponentType,
) => {
  const stateValues = useMemo(() => {
    const props = getComponentProps(meta, type);

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
  }, [meta, type]);

  return {
    stateValues,
  };
};
