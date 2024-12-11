import React from "react";
import { Icon } from "@jobber/components";
import styles from "./DocumentUpload.module.css";
import { SecurityBlurbProps } from "./types";

export const SecurityBlurb: React.FC<SecurityBlurbProps> = ({
  privacyPolicyUrl,
}) => (
  <div className={styles.securityBlurb}>
    <Icon name="lock" size="small" className={styles.securityIcon} />
    <div className={styles.securityText}>
      Documents and files you upload are stored securely as per our{" "}
      <a href={privacyPolicyUrl} className={styles.privacyLink}>
        privacy policy
      </a>
    </div>
  </div>
);
