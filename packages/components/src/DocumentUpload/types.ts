export interface SecurityBlurbProps {
  privacyPolicyUrl: string;
}

export interface SupportInfoProps {
  supportPhone: string;
  supportEmail: string;
}

export interface DocumentUploadFormProps {
  instructions: string;
  onSubmit: (files: File[], notes: string) => void;
}
