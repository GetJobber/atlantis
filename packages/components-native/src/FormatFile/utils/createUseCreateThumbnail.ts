import { useIsMounted } from "@jobber/hooks/src";
import { useCallback, useEffect, useState } from "react";
import { UseCreateThumbnail } from "../context/types";
import { CreateThumbnail, FormattedFile } from "../types";

export function createUseCreateThumbnail(createThumbnail: CreateThumbnail): {
  useCreateThumbnail: UseCreateThumbnail;
} {
  const useCreateThumbnail = useCallback(
    (file: FormattedFile) => {
      const [thumbnail, setThumbnail] = useState<string | undefined>(undefined);
      const [error, setError] = useState<boolean>(false);

      const { current } = useIsMounted();

      useEffect(() => {
        createThumbnail(file)
          .then(({ thumbnail: newThumbnail, error: newError }) => {
            setThumbnail(newThumbnail);
            setError(newError);
          })
          .catch(() => {
            setError(true);
            setThumbnail(undefined);
          });
      }, [current, file]);

      return { thumbnail, error };
    },
    [createThumbnail],
  );
  return { useCreateThumbnail };
}
