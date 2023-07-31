import React, { PropsWithChildren, useState } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { DataType } from "./data";
import { ThiccListContext } from "./ThiccListContext";
import styles from "./Layout.css";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { Button } from "../Button";
import { Content } from "../Content";
import { Card } from "../Card";
import { Glimmer } from "../Glimmer";
import { Grid } from "../Grid";

const variants: Variants = {
  hidden: { x: 10, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};
const variantsReversed: Variants = {
  hidden: { x: -10, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export function ThiccListProvider({ children }: PropsWithChildren<object>) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [activeItem, setActiveItem] = useState<DataType>();

  return (
    <ThiccListContext.Provider
      value={{
        selectedItems,
        setSelectedItems,
        addOrRemoveSelectedItem,
        setActiveItem,
      }}
    >
      <AnimatePresence initial={false} exitBeforeEnter>
        {activeItem && (
          <motion.div
            key="1"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
          >
            <div className={styles.header}>
              <Content>
                <Button
                  label="Back"
                  icon="arrowLeft"
                  type="tertiary"
                  onClick={() => setActiveItem(undefined)}
                />
                <Heading level={1}>{activeItem.name}</Heading>
                <Text size="large">
                  You&apos;ve navigated! This mostly represents that you can
                  navigate to a new page from the list.
                </Text>
                <Grid>
                  <Grid.Cell size={{ xs: 8 }}>
                    <Card>
                      <Content>
                        <Glimmer.Header />
                        <Glimmer.Text />
                      </Content>
                    </Card>
                  </Grid.Cell>
                  <Grid.Cell size={{ xs: 4 }}>
                    <Card>
                      <Content>
                        <Glimmer.Header />
                        <Glimmer.Text />
                      </Content>
                    </Card>
                  </Grid.Cell>
                </Grid>
              </Content>
            </div>
          </motion.div>
        )}
        {!activeItem && (
          <motion.div
            key="2"
            variants={variantsReversed}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </ThiccListContext.Provider>
  );

  function addOrRemoveSelectedItem(item: DataType, shouldClear = false) {
    let selectedItemCopy: number[] = [];

    if (!shouldClear) {
      selectedItemCopy = [...selectedItems];
    }

    if (selectedItemCopy.includes(item.id)) {
      setSelectedItems(selectedItemCopy.filter(id => id !== item.id));
    } else {
      setSelectedItems([...selectedItemCopy, item.id]);
    }
  }
}
