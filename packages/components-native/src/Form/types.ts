import { MutableRefObject, RefObject } from "react";
import {
  ControllerProps,
  DeepPartial,
  FieldPath,
  FieldValues,
  Mode,
  UnpackNestedValue,
  UseFormReturn,
} from "react-hook-form";
import { IconNames } from "@jobber/design";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export type FormValues<T> = UnpackNestedValue<T>;
export type FormErrors = FormNetworkErrors | FormUserErrors;
export type FormBannerMessage = FormWarningMessage | FormNoticeMessage;

export enum FormSubmitErrorType {
  NetworkError = "NetworkError",
  UserError = "UserErrors",
}

export enum FormBannerMessageType {
  WarningMessage = "WarningMessage",
  NoticeMessage = "NoticeMessage",
}

export interface FormBannerErrors {
  networkError?: string | undefined;
  bannerError?: {
    title: string;
    messages?: string[];
  };
}

interface FormNetworkErrors {
  errorType: FormSubmitErrorType.NetworkError;
  networkErrors: string;
}

export interface FormUserErrors {
  errorType: FormSubmitErrorType.UserError;
  userErrors: Record<string, string>;
}

interface FormWarningMessage {
  messageType: FormBannerMessageType.WarningMessage;
  message: string;
}

interface FormNoticeMessage {
  messageType: FormBannerMessageType.NoticeMessage;
  message: string;
}

export type FormRef<T extends FieldValues = FieldValues> =
  | (UseFormReturn<T> & {
      scrollViewRef?: RefObject<KeyboardAwareScrollView>;
      saveButtonHeight?: number;
      messageBannerHeight?: number;
    })
  | undefined;

export interface FormProps<T extends FieldValues, SubmitResponseType> {
  /**
   * Content to be passed into the form
   */
  children: React.ReactNode;

  /**
   * A callback function that is run before invoking onSubmit. Form submission is canceled if the promise resolves to false.
   */
  onBeforeSubmit?: (data: FormValues<T>) => Promise<boolean>;

  /**
   * A callback function that handles the submission of form data
   */
  onSubmit: (data: FormValues<T>) => Promise<SubmitResponseType>;

  /**
   * A callback function that handles any error that occurs during "onSubmit"
   */
  onSubmitError: (error: FormErrors) => void;

  /**
   * A callback function that handles a successful form submission from "onSubmit"
   */
  onSubmitSuccess: (data: SubmitResponseType) => void;

  /**
   * Network or user errors to be displayed as a banner at the top of the form
   */
  bannerErrors?: FormBannerErrors;

  /**
   * Status messages to be displayed as a banner at the top of the form
   */
  bannerMessages?: FormBannerMessage[];

  /**
   * Loading when the initial form data is being fetched
   */
  initialLoading?: boolean;

  /**
   * The initial values of the form inputs
   * This should be available as soon as initialLoading is set to false
   */
  initialValues?: FormValues<DeepPartial<T>>;

  /**
   * When the validation should happen.
   * Possible values are "onBlur", "onChange", "onSubmit", "onTouched", and "all".
   * The default value is "onTouched"
   */
  mode?: Mode;

  /**
   * When the validation after submission should happen.
   * Possible values are "onBlur", "onChange", and "onSubmit".
   * The default value is "onChange"
   */
  reValidateMode?: Exclude<Mode, "onTouched" | "all">;

  /**
   * ref object to access react hook form methods and state
   */
  formRef?: MutableRefObject<FormRef<T> | undefined>;

  /**
   * Label to be displayed for the save button
   */
  saveButtonLabel?: string;

  /**
   * @deprecated use `secondaryAction` instead.
   * Override default save button in the sticky section of the form with another element.
   */
  renderStickySection?: (
    onSubmit: () => void,
    label: string | undefined,
    isSubmitting: boolean,
  ) => JSX.Element;

  /**
   * Adding a key will save a local copy of the form data that will be used to
   * recover values when the app is backgrounded or has crashed.
   */
  localCacheKey?: string;

  /**
   * Forms field names that will not be considered for caching.
   * Useful for omitting sensitive data.
   */
  localCacheExclude?: string[];

  /**
   * A string or array of strings that can be used to identify the pre-filled
   * data on the form. This can be used to support local caching for forms that
   * prefill data without inadvertatly applying the cache at the wrong time.
   *
   * For example this can be used to when an object is being converted from from
   * another (Quote being converted into a Job). This will allow the user to
   * retrieve data from the cache when trying to convert the same object
   * (same Quote being converted into a Job) following an app crash.
   *
   * There is still only one copy of data for each `localCacheKey`.
   * If a user opens the same form the data will only be loaded if the `localCacheId` matches
   */
  localCacheId?: string | string[];

  /**
   * Secondary Action for ButtonGroup
   */
  secondaryActions?: SecondaryActionProp[];

  /**
   * A number that will pull down the save button when the position is sticky.
   * Useful when there's a footer or content below the form that is pulling
   * the button up.
   */
  saveButtonOffset?: number;

  /**
   * Forces to render the sticky save button instead of the inline.
   * The sticky save button is default for iOS but not for Android due to
   * limitations. Use this prop with caution on Android.
   */
  showStickySaveButton?: boolean;

  /**
   * Renders a footer below the save button.
   */
  renderFooter?: React.ReactNode;
}

export type InternalFormProps<T extends FieldValues, SubmitResponseType> = Omit<
  FormProps<T, SubmitResponseType>,
  "initialLoading"
>;

export type ValidationRulesByFieldPath<T extends FieldValues> = {
  [p in FieldPath<T>]: ControllerProps<T, p>["rules"];
};

export interface FormSaveButtonProps {
  /**
   * Press handler
   */
  primaryAction: () => Promise<void> | void;

  /**
   * Primary Button is loading
   */
  loading: boolean;

  /**
   * Label for the save button
   */
  label?: string;
  /**
   * Props and information regarding the secondary Action button(s)
   */
  secondaryActions?: SecondaryActionProp[];

  /**
   * Set whether secondary Button is loading
   */
  setSecondaryActionLoading?: (bool: boolean) => void;

  /**
   * Callback that is called when the secondary actions bottom sheet is opened.
   */
  onOpenBottomSheet?: () => void;

  /**
   * Callback that is called when the secondary actions bottom sheet is closed.
   */
  onCloseBottomSheet?: () => void;
}

interface SecondaryActionOnPress {
  onBeforeSubmit?: () => Promise<boolean>;
  onSubmit: (formSubmit: FormSaveButtonProps["primaryAction"]) => Promise<void>;
  onSubmitSuccess?: () => void;
  onSubmitError?: (error: FormErrors) => void;
  resetFormOnSubmit?: boolean;
}

export interface SecondaryActionProp {
  label: string;
  icon?: IconNames | undefined;
  handleAction: SecondaryActionOnPress;
  destructive?: boolean;
}
