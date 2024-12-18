import React from "react";
import styles from "./DocumentUpload.module.css";
import { SupportInfoProps } from "./types";

export const SupportInfo: React.FC<SupportInfoProps> = ({
  supportPhone,
  supportEmail,
}) => (
  <div className={styles.supportInfo}>
    Need a hand? Get in touch with us at {supportPhone} or {supportEmail}
  </div>
);
