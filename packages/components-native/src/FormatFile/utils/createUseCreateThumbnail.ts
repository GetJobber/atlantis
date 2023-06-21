import { useIsMounted } from "@jobber/hooks/src";
import { useCallback, useEffect, useState } from "react";
import { CreateThumbnail, FormattedFile } from "../types";

export function createUseCreateThumbnail(createThumbnail: CreateThumbnail): {
  useCreateThumbnail: CreateThumbnail;
} {
  const useCreateThumbnail = useCallback<CreateThumbnail>(
    (file: FormattedFile) => {
      const [thumbnail, setThumbnail] = useState<string | undefined>(undefined);
      const [error, setError] = useState<boolean>(false);

      const { current } = useIsMounted();

      useEffect(() => {
        const { error: newError, thumbnail: newThumbnail } =
          createThumbnail(file);
        setThumbnail(newThumbnail);
        setError(newError);
      }, [current, file]);

      return { thumbnail, error };
    },
    [],
  );
  return { useCreateThumbnail };
}
