import { useEffect, useState } from "react";
import { ThumbnailProps } from "./types";

export const useThumbnailImage = ({ file }: Pick<ThumbnailProps, "file">) => {
  const [imageSource, setImageSource] = useState<string>();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    file.src().then((url: string) => setImageSource(url));
  }, []);

  function handleImageLoad() {
    setImageLoaded(true);
  }

  return { handleImageLoad, imageSource, imageLoaded };
};
