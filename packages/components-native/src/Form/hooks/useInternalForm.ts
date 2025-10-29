import type {
  DeepPartial,
  FieldValues,
  UseFormHandleSubmit,
  UseFormReturn,
} from "react-hook-form";
import { useForm } from "react-hook-form";
import type { MutableRefObject, RefObject } from "react";
import type { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAtlantisContext } from "../../AtlantisContext";
import { useAtlantisFormContext } from "../context/AtlantisFormContext";
import type { InternalFormProps } from "../types";

type UseInternalFormProps<T extends FieldValues, SubmitResponseType> = Pick<
  InternalFormProps<T, SubmitResponseType>,
  | "mode"
  | "reValidateMode"
  | "initialValues"
  | "formRef"
  | "localCacheKey"
  | "localCacheExclude"
  | "localCacheId"
  | "UNSAFE_allowDiscardLocalCacheWhenOffline"
> & {
  scrollViewRef?: RefObject<KeyboardAwareScrollView>;
  readonly saveButtonHeight: number;
  readonly messageBannerHeight: number;
};

interface UseInternalForm<T extends FieldValues> {
  readonly formMethods: UseFormReturn<T>;
  readonly handleSubmit: UseFormHandleSubmit<T>;
  readonly isSubmitting: boolean;
  readonly isDirty: boolean;
  readonly removeListenerRef: MutableRefObject<() => void>;
  readonly setLocalCache: (data: DeepPartial<T>) => void;
}

export function useInternalForm<T extends FieldValues, SubmitResponseType>({
  mode,
  reValidateMode,
  initialValues,
  formRef,
  localCacheKey,
  localCacheId,
  scrollViewRef,
  saveButtonHeight,
  messageBannerHeight,
  UNSAFE_allowDiscardLocalCacheWhenOffline = false,
}: UseInternalFormProps<T, SubmitResponseType>): UseInternalForm<T> {
  const { useConfirmBeforeBack, useInternalFormLocalCache } =
    useAtlantisFormContext();

  const { isOnline } = useAtlantisContext();

  const formMethods = useForm<T>({
    mode,
    reValidateMode,
    defaultValues: initialValues,
    shouldFocusError: false,
  });

  const clientSideSaveOn = localCacheKey && localCacheKey !== "INVALID";

  const { setLocalCache, removeLocalCache } = useInternalFormLocalCache(
    formMethods,
    localCacheKey,
    {
      id: localCacheId,
    },
  );

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = formMethods;

  if (formRef) {
    formRef.current = {
      ...formMethods,
      saveButtonHeight,
      messageBannerHeight,
      scrollViewRef,
    };
  }

  const shouldRemoveCacheOnBack = UNSAFE_allowDiscardLocalCacheWhenOffline
    ? true
    : isOnline;

  const removeListenerRef = useConfirmBeforeBack({
    alwaysPreventBack: isSubmitting,
    shouldShowAlert: isDirty,
    onAcceptEvent: shouldRemoveCacheOnBack ? removeLocalCache : undefined,
    showLostProgressMessage:
      shouldRemoveCacheOnBack || !clientSideSaveOn ? true : false,
  });

  return {
    setLocalCache,
    formMethods,
    handleSubmit,
    isSubmitting,
    isDirty,
    removeListenerRef,
  };
}
