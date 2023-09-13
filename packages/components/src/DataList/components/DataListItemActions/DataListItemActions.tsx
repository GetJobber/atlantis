import React, { Children, ReactElement, isValidElement } from "react";
import styles from "./DataListItemActions.css";
import { useDataListContext } from "../../context/DataListContext";
import {
  DataListActionProps,
  DataListItemActionsProps,
  DataListObject,
} from "../../DataList.types";
import { Menu, SectionProps } from "../../../Menu";
import { Button } from "../../../Button";

// This component is meant to capture the props of the DataList.ItemActions
export function DataListItemActions<T extends DataListObject>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: DataListItemActionsProps<T>,
) {
  return null;
}

interface InternalDataListItemActionsProps<T extends DataListObject> {
  item: T;
}

export function InternalDataListItemActions<T extends DataListObject>({
  item,
}: InternalDataListItemActionsProps<T>) {
  const { itemActionComponent } = useDataListContext();
  if (!itemActionComponent) return null;

  const { children } = itemActionComponent.props;
  const childrenArray =
    Children.toArray(children).filter<
      ReactElement<DataListActionProps<DataListObject>>
    >(isValidElement);
  const exposedActions = childrenArray.slice(0, 2);
  const menuItems: SectionProps[] = [
    {
      actions: childrenArray.map(({ props }) => ({
        label: props.label,
        onClick: () => props.onClick?.(item),
      })),
    },
  ];

  return (
    <div className={styles.menu}>
      {exposedActions.map(action => {
        if (!action.props.icon) return <></>;

        return (
          <Button
            key={action.props.label}
            icon={action.props.icon}
            ariaLabel={action.props.label}
            onClick={() => action.props.onClick?.(item)}
            type="secondary"
            variation="subtle"
          />
        );
      })}

      <Menu
        items={menuItems}
        activator={
          <Button
            icon="more"
            ariaLabel="More actions"
            type="secondary"
            variation="subtle"
          />
        }
      />
    </div>
  );
}
