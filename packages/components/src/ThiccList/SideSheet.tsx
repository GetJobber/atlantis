/* eslint-disable import/no-internal-modules */
/* eslint-disable import/no-relative-parent-imports */
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnKeyDown } from "@jobber/hooks";
import styles from "./SideSheet.css";
import { useThiccListContext } from "./ThiccListContext";
import { data } from "./data";
import { Card } from "../Card";
import { InternalChip } from "../Chips/InternalChip";
import { InternalChipButton } from "../Chips/InternalChipButton";
import { Content } from "../Content";
import { InputGroup } from "../InputGroup";
import { InputFile } from "../InputFile";
import { Heading } from "../Heading";
import { Button } from "../Button";
import { InputText } from "../InputText";
import { Text } from "../Text";

let setShow: (value: boolean) => void;

const variants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
};

export function SideSheet() {
  const { selectedItems } = useThiccListContext();

  const emails = selectedItems.map(
    item => data.find(d => d.id === item)?.email,
  );
  const remainingEmails = emails.length - 1;

  const [showSideSheet, setShowSideSheet] = useState(false);
  setShow = setShowSideSheet;

  const handleClose = () => setShowSideSheet(false);
  useOnKeyDown(handleClose, "Escape");

  return (
    <AnimatePresence>
      {showSideSheet && (
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={styles.sideSheet}
          transition={{ duration: 0.2 }}
        >
          <div className={styles.sideSheetHeader}>
            <Heading level={3}>Email</Heading>
            <Button
              icon="remove"
              ariaLabel="Close"
              type="secondary"
              variation="subtle"
              onClick={handleClose}
            />
          </div>
          <div className={styles.sideSheetContent}>
            <Content>
              <Card>
                <Content>
                  <div className={styles.emailRecipient}>
                    <Text>To:</Text>

                    <InternalChip
                      label={emails?.[0] || "joe.flores@email.com"}
                      suffix={
                        <InternalChipButton
                          icon="remove"
                          label="Remove"
                          onClick={() => undefined}
                        />
                      }
                    />
                    {Boolean(remainingEmails) && (
                      <InternalChip label={`+${remainingEmails}`} />
                    )}
                  </div>
                </Content>
              </Card>

              <InputGroup>
                <InputText placeholder="Subject" />
                <InputText placeholder="Message" multiline={true} rows={10} />
              </InputGroup>

              <div className={styles.emailAttachments}>
                <InputFile
                  allowMultiple={true}
                  buttonLabel="Select Files"
                  getUploadParams={() =>
                    Promise.resolve({ url: "https://httpbin.org/post" })
                  }
                />
              </div>

              <div className={styles.submitButton}>
                <Button
                  label="Send"
                  fullWidth={true}
                  size="large"
                  type="tertiary"
                  variation="subtle"
                />
              </div>
            </Content>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

SideSheet.show = () => setShow(true);
SideSheet.hide = () => setShow(false);
