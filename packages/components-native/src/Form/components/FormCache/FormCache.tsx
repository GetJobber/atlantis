import React, { useEffect, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import omit from "lodash/omit";

interface FormCacheProps {
  localCacheId?: string | string[];
  localCacheKey?: Record<string, string>;
  localCacheExclude?: string[];
  setLocalCache: <T>(data: T) => void;
}
export function FormCache({
  localCacheExclude,
  localCacheKey,
  setLocalCache,
}: FormCacheProps): JSX.Element {
  const { control, formState } = useFormContext();
  const { isDirty } = formState;

  const formData = useWatch({ control });
  const shouldExclude = useMemo(() => {
    return Array.isArray(localCacheExclude) && localCacheExclude.length > 0;
  }, [localCacheExclude]);

  useEffect(() => {
    !localCacheKey &&
      console.log(
        "No `localCacheKey` specified on Form. Local copy of form data is now disabled.",
      );
  }, [localCacheKey]);

  /**
   * Automatically save form data locally
   */
  useEffect(() => {
    if (!isDirty) return;

    if (shouldExclude) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore The type below is not working. It seems to be an issue with react-hook-form
      // https://github.com/react-hook-form/react-hook-form/issues/2978
      setLocalCache(omit(formData, localCacheExclude));
    } else {
      setLocalCache(formData);
    }
  }, [formData, isDirty, localCacheExclude, setLocalCache, shouldExclude]);

  return <></>;
}
