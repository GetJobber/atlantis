import React, { useState } from "react";
import styles from "./DocumentUpload.module.css";
import { DocumentUploadFormProps } from "./types";
import { InputFile } from "../InputFile";
import { InputText } from "../InputText";
import { Button } from "../Button";

export const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({
  instructions,
  onSubmit,
}) => {
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(files, notes);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.uploadForm}>
      <div className={styles.formHeader}>
        <h1 className={styles.formTitle}>Documents requested</h1>
        <p className={styles.formInstructions}>{instructions}</p>
      </div>

      <InputFile
        allowedTypes="all"
        variation="dropzone"
        className={styles.fileInput}
        allowMultiple
        onChange={setFiles}
      />

      <InputText
        align="left"
        placeholder="Add any additional context that can help us resolve your case"
        size="base"
        value={notes}
        onChange={setNotes}
        className={styles.notesInput}
        multiline
      />

      <div className={styles.submitButtonWrapper}>
        <Button
          variation="work"
          type="primary"
          size="base"
          label="Submit"
          submit
        />
      </div>
    </form>
  );
};
