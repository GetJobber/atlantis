import React, { useContext } from "react";
import classnames from "classnames";
import { Icon } from "@jobber/components/Icon";
import { Flex } from "@jobber/components/Flex";
import styles from "./ComboboxOption.module.css";
import { ComboboxContext } from "../../ComboboxProvider";
import { ComboboxOptionProps } from "../../Combobox.types";

export function ComboboxOption(props: ComboboxOptionProps) {
  const { customRender, ...contentProps } = props;
  const { selected, selectionHandler } = useContext(ComboboxContext);

  const isSelected = selected.some(
    selection => selection.id.toString() === props.id.toString(),
  );

  return (
    <li
      key={props.id}
      tabIndex={-1}
      data-selected={isSelected}
      role="option"
      aria-selected={isSelected}
      onClick={() =>
        selectionHandler &&
        selectionHandler({ id: props.id, label: props.label })
      }
      className={classnames(styles.option)}
    >
      {customRender ? (
        customRender({
          ...contentProps,
          isSelected,
        })
      ) : (
        <InternalDefaultContent {...contentProps} isSelected={isSelected} />
      )}
    </li>
  );
}

type InternalDefaultContentProps = Omit<ComboboxOptionProps, "customRender"> & {
  readonly isSelected: boolean;
};

function InternalDefaultContent(props: InternalDefaultContentProps) {
  return (
    <>
      <Flex template={props.prefix ? ["shrink", "grow"] : ["grow"]}>
        {props.prefix}

        {props.label}
      </Flex>

      <div>
        {props.isSelected && (
          <Icon name="checkmark" color="interactiveSubtle" />
        )}
      </div>
    </>
  );
}
