import { DataList, Grid, InputText, Switch } from "@jobber/components";
import { ReactNode, useMemo, useState } from "react";
import { OptionInternal } from "./OptionInternal";
import { ConvertRawPropsToStructured } from "../services/ConvertRawPropsToStructured";
import { PropStructure, ValueStateInternals } from "../types/services";

export const PropsList = ({
  defaultProps,
  updateValue,
  values,
}: {
  readonly defaultProps: unknown;
  readonly updateValue: (
    propKey: string,
    key: {
      key: string;
    },
    value: string | (() => void),
  ) => void;
  readonly values: ValueStateInternals;
}) => {
  const [search, setSearch] = useState("");
  const convertedProps = ConvertRawPropsToStructured(
    defaultProps as PropStructure[],
  );
  const defaultPropsMapped = useMemo(
    () =>
      convertedProps.map((item, index) => {
        let component;

        if (item.type === "option") {
          component = (
            <OptionInternal
              key={index}
              value={item}
              values={values}
              updateValue={updateValue}
            />
          );
        } else if (item.type === "string") {
          component = (
            <InputText
              placeholder={item.key}
              value={values[item.key] as string}
              onChange={val => {
                updateValue("strings", item, val as string);
              }}
            />
          );
        } else if (item.type === "boolean") {
          component = (
            <Switch
              value={!!values[item.type]}
              onChange={val => {
                updateValue("booleans", item, String(val));
              }}
            />
          );
        } else if (item.type === "callback") {
          component = (
            <InputText
              placeholder={item.key}
              value={values[item.key] as string}
              onChange={val => {
                let func: string | (() => void) = "";

                try {
                  // eslint-disable-next-line no-new-func
                  func = new Function("", `return ${val};`) as () => void;
                } catch (e) {
                  console.log(e);
                }
                updateValue("callbacks", item, func);
              }}
            />
          );
        }

        return { ...item, component };
      }),
    [values, convertedProps, updateValue],
  );

  const filteredProps = useMemo(() => {
    return defaultPropsMapped.filter(item => {
      return item.key.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, defaultPropsMapped]);

  return (
    <DataList
      title={"Props"}
      data={filteredProps}
      headers={{
        key: "Key",
        description: "Description",
        component: "Component",
      }}
    >
      <DataList.Search
        onSearch={(searchIn: string) => setSearch(searchIn)}
        placeholder="Search Props"
      />

      <DataList.Layout size="md">
        {(item: { key: string; description: string; component: ReactNode }) => (
          <Grid gap>
            <Grid.Cell size={{ xs: 2 }}>
              <div style={{ display: "flex", alignItems: "flex" }}>
                {item.key}
              </div>
            </Grid.Cell>
            <Grid.Cell size={{ xs: 3 }}>{item.description}</Grid.Cell>
            <Grid.Cell size={{ xs: 3 }}>{item.component}</Grid.Cell>
          </Grid>
        )}
      </DataList.Layout>

      <DataList.EmptyState
        type="filtered"
        message="No props found with your search criteria."
      />
    </DataList>
  );
};
