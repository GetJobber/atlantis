import AnimatedPresenceContent from "./AnimatedPresence";
import AnimatedSwitcherContent from "./AnimatedSwitcher";
import ButtonContent from "./Button";
import ChipContent from "./Chip";
import CheckboxContent from "./Checkbox";
import StatusLabelContent from "./StatusLabel";
import SwitchContent from "./Switch";
import DisclosureContent from "./Disclosure";
import { ContentExport } from "../types/content";

export const SiteContent: Record<string, ContentExport> = {
  AnimatedPresence: {
    ...AnimatedPresenceContent,
  },
  AnimatedSwitcher: {
    ...AnimatedSwitcherContent,
  },
  Button: {
    ...ButtonContent,
  },
  Checkbox: {
    ...CheckboxContent,
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
  Disclosure: {
    ...DisclosureContent,
  },
};
