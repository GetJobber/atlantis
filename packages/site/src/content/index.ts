import ButtonContent from "./Button";
import ChipContent from "./Chip";
import StatusLabelContent from "./StatusLabel";
import SwitchContent from "./Switch";
import { ContentExport } from "../types/content";

export const SiteContent: Record<string, ContentExport> = {
  Button: {
    ...ButtonContent,
  },
  Chip: {
    ...ChipContent,
  },
  StatusLabel: {
    ...StatusLabelContent,
  },
  Switch: {
    ...SwitchContent,
  },
};
