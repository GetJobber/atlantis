import React from "react";
import styles from "./DocumentUpload.module.css";
import { SecurityBlurb } from "./SecurityBlurb";
import { SupportInfo } from "./SupportInfo";
import { DocumentUploadForm } from "./DocumentUploadForm";
import { Page } from "../Page";

export const DocumentUpload: React.FC = () => {
  const handleSubmit = (files: File[], notes: string) => {
    // Handle form submission
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.logoHeader}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3d2791279b574a8991b67d5ca56a6cb6/c54b09868653d32f92e4bfbee224815dca85e703bfde6a91a2ba794b4a207669?apiKey=3d2791279b574a8991b67d5ca56a6cb6&"
            className={styles.logo}
            alt="Company Logo"
          />
        </div>

        <Page
          title="Upload your requested documents"
          width="standard"
          className={styles.pageContent}
        >
          <div className={styles.mainContent}>
            <DocumentUploadForm
              instructions="Instructions for each document type that have been requested by Jobber"
              onSubmit={handleSubmit}
            />

            <footer className={styles.footer}>
              <SupportInfo
                supportPhone="support Ph#"
                supportEmail="support email"
              />
              <SecurityBlurb privacyPolicyUrl="https://getjobber.com/privacy-policy/" />
            </footer>
          </div>
        </Page>
      </div>
    </div>
  );
};
