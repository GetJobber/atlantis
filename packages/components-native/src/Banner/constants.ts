import { styles } from "./Banner.style";
import { BannerStyleProps } from "./types";

export const BannerTypeStyles: Record<string, BannerStyleProps> = {
  error: {
    styles: styles.error,
  },
  warning: {
    styles: styles.warning,
  },
  notice: {
    styles: styles.notice,
  },
};
