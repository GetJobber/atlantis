import ActionItemContent from "./ActionItem";
import ActionItemGroupContent from "./ActionItemGroup";
import ActionLabelContent from "./ActionLabel";
import ActivityIndicatorContent from "./ActivityIndicator";
import AnimatedPresenceContent from "./AnimatedPresence";
import AnimatedSwitcherContent from "./AnimatedSwitcher";
import AvatarContent from "./Avatar";
import AutoLinkContent from "./AutoLink";
import AutoCompleteContent from "./Autocomplete";
import BannerContent from "./Banner";
import BottomSheetContent from "./BottomSheet";
import BoxContent from "./Box";
import ButtonContent from "./Button";
import ButtonDismissContent from "./ButtonDismiss";
import ButtonGroupContent from "./ButtonGroup";
import CheckboxContent from "./Checkbox";
import CardContent from "./Card";
import ChipContent from "./Chip";
import ChipsContent from "./Chips";
import ClusterContent from "./Cluster";
import ComboboxContent from "./Combobox";
import ConfirmationModalContent from "./ConfirmationModal";
import ContainerContent from "./Container";
import ContentStuff from "./Content";
import ContentBlockContent from "./ContentBlock";
import ContentOverlayContent from "./ContentOverlay";
import CountdownContent from "./Countdown";
import CoverContent from "./Cover";
import DataDumpContent from "./DataDump";
import DataListContent from "./DataList";
import DataTableContent from "./DataTable";
import DatePickerContent from "./DatePicker";
import DescriptionListContent from "./DescriptionList";
import DisclosureContent from "./Disclosure";
import DividerContent from "./Divider";
import DrawerContent from "./Drawer";
import EmphasisContent from "./Emphasis";
import EmptyStateContent from "./EmptyState";
import FeatureSwitchContent from "./FeatureSwitch";
import FlexContent from "./Flex";
import FormContent from "./Form";
import FormatDateContent from "./FormatDate";
import FormatEmailContent from "./FormatEmail";
import FormatFileContent from "./FormatFile";
import FormatRelativeDateTimeContent from "./FormatRelativeDateTime";
import FormatTimeContent from "./FormatTime";
import FormFieldContent from "./FormField";
import FrameContent from "./Frame";
import GalleryContent from "./Gallery";
import GlimmerContent from "./Glimmer";
import GridContent from "./Grid";
import HeadingContent from "./Heading";
import IconContent from "./Icon";
import IconButtonContent from "./IconButton";
import InlineLabelContent from "./InlineLabel";
import InputAvatarContent from "./InputAvatar";
import InputCurrencyContent from "./InputCurrency";
import InputDateContent from "./InputDate";
import InputEmailContent from "./InputEmail";
import InputFieldWrapperContent from "./InputFieldWrapper";
import InputFileContent from "./InputFile";
import InputGroupContent from "./InputGroup";
import InputNumberContent from "./InputNumber";
import InputPasswordContent from "./InputPassword";
import InputPhoneNumberContent from "./InputPhoneNumber";
import InputPressableContent from "./InputPressable";
import InputSearchContent from "./InputSearch";
import InputTextContent from "./InputText";
import InputTimeContent from "./InputTime";
import InputValidationContent from "./InputValidation";
import LightBoxContent from "./LightBox";
import LinkContent from "./Link";
import ListContent from "./List";
import MarkdownContent from "./Markdown";
import MenuContent from "./Menu";
import ModalContent from "./Modal";
import MultiSelectContent from "./MultiSelect";
import PageContent from "./Page";
import PopoverContent from "./Popover";
import ProgressBarContent from "./ProgressBar";
import RadioGroupContent from "./RadioGroup";
import RecurringSelectContent from "./RecurringSelect";
import ResponsiveSwitcherContent from "./ResponsiveSwitcher";
import SegmentedControlContent from "./SegmentedControl";
import SelectContent from "./Select";
import SideDrawerContent from "./SideDrawer";
import SideKickContent from "./SideKick";
import SpinnerContent from "./Spinner";
import StackContent from "./Stack";
import StatusIndicatorContent from "./StatusIndicator";
import StatusLabelContent from "./StatusLabel";
import SwitchContent from "./Switch";
import TableContent from "./Table";
import TabsContent from "./Tabs";
import TextContent from "./Text";
import TilesContent from "./Tiles";
import ToastContent from "./Toast";
import TooltipContent from "./Tooltip";
import TypographyContent from "./Typography";
import TextListContent from "./TextList";
import ThumbnailListContent from "./ThumbnailList";
import AtlantisThemeContextContent from "./AtlantisThemeContext";
import { SiteContentItem } from "../types/content";

export const SiteContent: Record<string, SiteContentItem> = {
  ActionItem: {
    ...ActionItemContent,
  },
  ActionItemGroup: {
    ...ActionItemGroupContent,
  },
  ActionLabel: {
    ...ActionLabelContent,
  },
  ActivityIndicator: {
    ...ActivityIndicatorContent,
  },
  AnimatedPresence: {
    ...AnimatedPresenceContent,
  },
  AnimatedSwitcher: {
    ...AnimatedSwitcherContent,
  },
  AtlantisThemeContext: {
    ...AtlantisThemeContextContent,
  },
  Autocomplete: {
    ...AutoCompleteContent,
  },
  AutoLink: {
    ...AutoLinkContent,
  },
  Avatar: {
    ...AvatarContent,
  },
  Banner: {
    ...BannerContent,
  },
  BottomSheet: {
    ...BottomSheetContent,
  },
  ButtonGroup: {
    ...ButtonGroupContent,
  },
  Box: {
    ...BoxContent,
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
  Cluster: {
    ...ClusterContent,
  },
  Combobox: {
    ...ComboboxContent,
  },
  ConfirmationModal: {
    ...ConfirmationModalContent,
  },
  Container: {
    ...ContainerContent,
  },
  Content: {
    ...ContentStuff,
  },
  ContentBlock: {
    ...ContentBlockContent,
  },
  ContentOverlay: {
    ...ContentOverlayContent,
  },
  Countdown: {
    ...CountdownContent,
  },
  Cover: {
    ...CoverContent,
  },
  DataDump: {
    ...DataDumpContent,
  },
  DataList: {
    ...DataListContent,
  },
  DataTable: {
    ...DataTableContent,
  },
  DatePicker: {
    ...DatePickerContent,
  },
  DescriptionList: {
    ...DescriptionListContent,
  },
  Disclosure: {
    ...DisclosureContent,
  },
  Divider: {
    ...DividerContent,
  },
  Drawer: {
    ...DrawerContent,
  },
  Emphasis: {
    ...EmphasisContent,
  },
  EmptyState: {
    ...EmptyStateContent,
  },
  FeatureSwitch: {
    ...FeatureSwitchContent,
  },
  Flex: {
    ...FlexContent,
  },
  Form: {
    ...FormContent,
  },
  FormatDate: {
    ...FormatDateContent,
  },
  FormatEmail: {
    ...FormatEmailContent,
  },
  FormatFile: {
    ...FormatFileContent,
  },
  FormatRelativeDateTime: {
    ...FormatRelativeDateTimeContent,
  },
  FormatTime: {
    ...FormatTimeContent,
  },
  FormField: {
    ...FormFieldContent,
  },
  Frame: {
    ...FrameContent,
  },
  Gallery: {
    ...GalleryContent,
  },
  Glimmer: {
    ...GlimmerContent,
  },
  Grid: {
    ...GridContent,
  },
  Heading: {
    ...HeadingContent,
  },
  Icon: {
    ...IconContent,
  },
  IconButton: {
    ...IconButtonContent,
  },
  InlineLabel: {
    ...InlineLabelContent,
  },
  InputAvatar: {
    ...InputAvatarContent,
  },
  InputCurrency: {
    ...InputCurrencyContent,
  },
  InputDate: {
    ...InputDateContent,
  },
  InputEmail: {
    ...InputEmailContent,
  },
  InputFieldWrapper: {
    ...InputFieldWrapperContent,
  },
  InputFile: {
    ...InputFileContent,
  },
  InputGroup: {
    ...InputGroupContent,
  },
  InputNumber: {
    ...InputNumberContent,
  },
  InputPassword: {
    ...InputPasswordContent,
  },
  InputPressable: {
    ...InputPressableContent,
  },
  InputSearch: {
    ...InputSearchContent,
  },
  InputPhoneNumber: {
    ...InputPhoneNumberContent,
  },
  InputText: {
    ...InputTextContent,
  },
  InputTime: {
    ...InputTimeContent,
  },
  InputValidation: {
    ...InputValidationContent,
  },
  LightBox: {
    ...LightBoxContent,
  },
  Link: {
    ...LinkContent,
  },
  List: {
    ...ListContent,
  },
  Markdown: {
    ...MarkdownContent,
  },
  Menu: {
    ...MenuContent,
  },
  Modal: {
    ...ModalContent,
  },
  MultiSelect: {
    ...MultiSelectContent,
  },
  Page: {
    ...PageContent,
  },
  Popover: {
    ...PopoverContent,
  },
  ProgressBar: {
    ...ProgressBarContent,
  },
  RadioGroup: {
    ...RadioGroupContent,
  },
  RecurringSelect: {
    ...RecurringSelectContent,
  },
  ResponsiveSwitcher: {
    ...ResponsiveSwitcherContent,
  },
  SegmentedControl: {
    ...SegmentedControlContent,
  },
  Select: {
    ...SelectContent,
  },
  SideDrawer: {
    ...SideDrawerContent,
  },
  SideKick: {
    ...SideKickContent,
  },
  Spinner: {
    ...SpinnerContent,
  },
  Stack: {
    ...StackContent,
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
  Table: {
    ...TableContent,
  },
  Tabs: {
    ...TabsContent,
  },
  Text: {
    ...TextContent,
  },
  TextList: {
    ...TextListContent,
  },
  ThumbnailList: {
    ...ThumbnailListContent,
  },
  Tiles: {
    ...TilesContent,
  },
  Toast: {
    ...ToastContent,
  },
  Tooltip: {
    ...TooltipContent,
  },
  Typography: {
    ...TypographyContent,
  },
};
