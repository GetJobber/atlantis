import AnimatedPresenceContent from "./AnimatedPresence";
import AnimatedSwitcherContent from "./AnimatedSwitcher";
import AutoCompleteContent from "./Autocomplete";
import BannerContent from "./Banner";
import ButtonContent from "./Button";
import ButtonDismissContent from "./ButtonDismiss";
import CheckboxContent from "./Checkbox";
import CardContent from "./Card";
import ChipContent from "./Chip";
import ChipsContent from "./Chips";
import CountdownContent from "./Countdown";
import DataDumpContent from "./DataDump";
import DataListContent from "./DataList";
import DisclosureContent from "./Disclosure";
import EmphasisContent from "./Emphasis";
import FormatDateContent from "./FormatDate";
import FormatEmailContent from "./FormatEmail";
import FormatTimeContent from "./FormatTime";
import GlimmerContent from "./Glimmer";
import HeadingContent from "./Heading";
import IconContent from "./Icon";
import InlineLabelContent from "./InlineLabel";
import LinkContent from "./Link";
import ProgressBarContent from "./ProgressBar";
import StatusIndicatorContent from "./StatusIndicator";
import StatusLabelContent from "./StatusLabel";
import SwitchContent from "./Switch";
import AvatarContent from "./Avatar";
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
  Avatar: {
    ...AvatarContent,
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
  Chips: {
    ...ChipsContent,
  },
  Countdown: {
    ...CountdownContent,
  },
  DataDump: {
    ...DataDumpContent,
  },
  DataList: {
    ...DataListContent,
  },
  Disclosure: {
    ...DisclosureContent,
  },
  Emphasis: {
    ...EmphasisContent,
  },
  FormatDate: {
    ...FormatDateContent,
  },
  FormatEmail: {
    ...FormatEmailContent,
  },
  FormatTime: {
    ...FormatTimeContent,
  },
  Glimmer: {
    ...GlimmerContent,
  },
  Heading: {
    ...HeadingContent,
  },
  Icon: {
    ...IconContent,
  },
  InlineLabel: {
    ...InlineLabelContent,
  },
  Link: {
    ...LinkContent,
  },
  ProgressBar: {
    ...ProgressBarContent,
  },
  StatusIndicator: {
    ...StatusIndicatorContent,
  },
  StatusLabel: {
    ...StatusLabelContent,
  },
  Switch: {
    ...SwitchContent,
  },
};
