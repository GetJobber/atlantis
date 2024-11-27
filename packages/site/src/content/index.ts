import AnimatedPresenceContent from "./AnimatedPresence";
import AnimatedSwitcherContent from "./AnimatedSwitcher";
import AutoCompleteContent from "./Autocomplete";
import BannerContent from "./Banner";
import ButtonContent from "./Button";
import ButtonDismissContent from "./ButtonDismiss";
import ChipContent from "./Chip";
import ChipsContent from "./Chips";
import CheckboxContent from "./Checkbox";
import CountdownContent from "./Countdown";
import DisclosureContent from "./Disclosure";
import EmphasisContent from "./Emphasis";
import HeadingContent from "./Heading";
import LinkContent from "./Link";
import ProgressBarContent from "./ProgressBar";
import StatusLabelContent from "./StatusLabel";
import SwitchContent from "./Switch";
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
  Checkbox: {
    ...CheckboxContent,
  },
  Chip: {
    ...ChipContent,
  },
  Chips: {
    ...ChipsContent,
  },
  Countdown: {
    ...CountdownContent,
  },
  Disclosure: {
    ...DisclosureContent,
  },
  Emphasis: {
    ...EmphasisContent,
  },
  Heading: {
    ...HeadingContent,
  },
  Link: {
    ...LinkContent,
  },
  ProgressBar: {
    ...ProgressBarContent,
  },
  StatusLabel: {
    ...StatusLabelContent,
  },
  Switch: {
    ...SwitchContent,
  },
};
