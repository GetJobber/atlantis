import AnimatedPresenceContent from "./AnimatedPresence";
import AnimatedSwitcherContent from "./AnimatedSwitcher";
import AutoCompleteContent from "./Autocomplete";
import BannerContent from "./Banner";
import ButtonContent from "./Button";
import ButtonDismissContent from "./ButtonDismiss";
import CardContent from "./Card";
import ChipContent from "./Chip";
import CheckboxContent from "./Checkbox";
import CountdownContent from "./Countdown";
import StatusLabelContent from "./StatusLabel";
import SwitchContent from "./Switch";
import DisclosureContent from "./Disclosure";
import LinkContent from "./Link";
import HeadingContent from "./Heading";
import { ContentExport } from "../types/content";

export const SiteContent: Record<string, ContentExport> = {
  AnimatedPresence: {
    ...AnimatedPresenceContent,
  },
  AnimatedSwitcher: {
    ...AnimatedSwitcherContent,
  },
  Autocomplete: {
    ...AutoCompleteContent,
  },
  Banner: {
    ...BannerContent,
  },
  Button: {
    ...ButtonContent,
  },
  ButtonDismiss: {
    ...ButtonDismissContent,
  },
  Card: {
    ...CardContent,
  },
  Checkbox: {
    ...CheckboxContent,
  },
  Chip: {
    ...ChipContent,
  },
  Countdown: {
    ...CountdownContent,
  },
  Link: {
    ...LinkContent,
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
  Heading: {
    ...HeadingContent,
  },
};
