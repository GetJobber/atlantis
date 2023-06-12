import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { MutableRefObject, RefObject } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAtlantisContext } from "../../AtlantisContext";
import { useAtlantisFormContext } from "../context/AtlantisFormContext";
import { InternalFormProps } from "../types";

type UseInternalFormProps<T extends FieldValues, SubmitResponseType> = Pick<
  InternalFormProps<T, SubmitResponseType>,
  | "mode"
  | "reValidateMode"
  | "initialValues"
  | "formRef"
  | "localCacheKey"
  | "localCacheExclude"
  | "localCacheId"
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
  readonly setLocalCache: <S>(data: S) => void;
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
}: UseInternalFormProps<T, SubmitResponseType>): UseInternalForm<T> {
  const {
    useEditMode,
    useConfirmBeforeBack,
    LocalCacheKeys,
    useInternalFormLocalCache,
  } = useAtlantisFormContext();

  const { isOnline } = useAtlantisContext();

  const formMethods = useForm<T>({
    mode,
    reValidateMode,
    defaultValues: initialValues,
    shouldFocusError: false,
  });

  const clientSideSaveOn =
    localCacheKey && localCacheKey !== LocalCacheKeys.INVALID;

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

  useEditMode();

  const removeListenerRef = useConfirmBeforeBack({
    alwaysPreventBack: isSubmitting,
    shouldShowAlert: isDirty,
    onAcceptEvent: isOnline ? removeLocalCache : undefined,
    showLostProgressMessage: isOnline || !clientSideSaveOn ? true : false,
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
