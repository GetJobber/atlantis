/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { PropsComponentProps } from "docz";
// eslint-disable-next-line import/no-internal-modules
import { Prop as DoczProp } from "docz/dist/components/Props";
import { Fragment, useState } from "react";
import { Emphasis } from "@jobber/components/Emphasis";
import { Button } from "@jobber/components/Button";
import * as styles from "./styles";

export function Props({ props, getPropType }: PropsComponentProps) {
  const entries = Object.entries(props);

  return (
    <Box sx={styles.container}>
      {entries.map(([key, prop]) => (
        <Prop key={key} propName={key} prop={prop} getPropType={getPropType} />
      ))}
    </Box>
  );
}

interface PropProps {
  readonly propName: string;
  readonly prop: DoczProp;
  getPropType(prop: DoczProp): string;
}

export const Prop = ({ propName, prop, getPropType }: PropProps) => {
  const [open, setOpen] = useState(false);
  const { required, description } = prop;

  if (!prop.type && !prop.flowType) {
    return <Fragment />;
  }

  const defaultValue = getDefaultValue(prop);

  return (
    <Fragment>
      <Box sx={styles.prop}>
        <Box sx={styles.propName}>
          <Box>
            {propName}
            {required && <Box sx={styles.required}>*</Box>}
          </Box>
          {defaultValue && (
            <Box sx={styles.defaultValue}>
              <Emphasis variation="italic">default: {defaultValue}</Emphasis>
            </Box>
          )}
        </Box>
        <Box sx={styles.typeValue}>{getPropType(prop)}</Box>
        {description && (
          <Box sx={styles.toggle}>
            <Button
              icon={open ? "arrowUp" : "arrowDown"}
              ariaLabel="Toggle prop description"
              onClick={toggleDescription}
              type="tertiary"
              size="small"
            />
          </Box>
        )}
      </Box>
      {description && open && <Box sx={styles.description}>{description}</Box>}
    </Fragment>
  );

  function toggleDescription() {
    setOpen(!open);
  }
};

export function getDefaultValue({ defaultValue, type, flowType }: DoczProp) {
  const propType = flowType ? flowType : type;

  if (!defaultValue || !defaultValue.value) return undefined;

  if (defaultValue.value === "''") {
    return "[Empty string]";
  }

  if (propType && propType.name === "string") {
    return defaultValue.value.replace(/'/g, '"');
  }

  // @ts-expect-error
  if (typeof defaultValue.value === "object" && defaultValue.value.toString) {
    // @ts-expect-error
    return defaultValue.value.toString();
  }

  return defaultValue.value;
}
