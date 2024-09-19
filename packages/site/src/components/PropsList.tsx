import { DataList, Grid, InputText, Switch } from "@jobber/components";
import { ReactNode, useMemo, useState } from "react";
import { OptionInternal } from "./OptionInternal";
import { ValueStateInternals } from "../types/services";

export const PropsList = ({
  updateValue,
  values,
}: {
  readonly updateValue: (
    key: string,
    value: string | number | Date | boolean,
  ) => void;
  readonly values: ValueStateInternals;
}) => {
  const [search, setSearch] = useState("");

  const defaultPropsMapped = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const components: any[] = [];
    Object.keys(values).forEach((key, index) => {
      let component;
      const item = values[key];

      if (item.type.includes("(")) {
        component = (
          <InputText
            multiline
            placeholder={item.type as string}
            value={item.value}
            onChange={val => {
              updateValue(key, val);
            }}
          />
        );
      } else if (item.type === "string") {
        component = (
          <InputText
            placeholder={item.value}
            value={item.value as string}
            onChange={val => {
              updateValue(key, val);
            }}
          />
        );
      } else if (item.type === "boolean") {
        component = (
          <Switch
            value={item.value}
            onChange={val => {
              updateValue(key, val);
            }}
          />
        );
      } else if (item.type.includes("|")) {
        const keys = item.type
          .replace(/"/g, "")
          .split("|")
          .map(d => d.trim());

        component = (
          <OptionInternal
            key={index}
            value={item}
            values={{
              description: item.description,
              key: key,
              options: keys,
              value: item.value,
            }}
            updateValue={updateValue}
          />
        );
      }

      components.push({
        key: key,
        description: item.description,
        component,
        required: item.required ? "*" : "",
      });
    });

    return components;
  }, [values, updateValue]);

  const filteredProps = defaultPropsMapped.filter(d => {
    if (search === "") {
      return true;
    }

    return d.key.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <DataList
      title={"Props"}
      data={filteredProps}
      headers={{
        key: "Key",
        required: "Required",
        description: "Description",
        component: "Component",
      }}
    >
      <DataList.Search
        onSearch={(searchIn: string) => setSearch(searchIn)}
        placeholder="Search Props"
      />

      <DataList.Layout size="md">
        {(item: {
          key: string;
          description: string;
          component: ReactNode;
          required: boolean;
        }) => (
          <Grid gap>
            <Grid.Cell size={{ xs: 2 }}>
              <div style={{ display: "flex", alignItems: "flex" }}>
                {item.key}
              </div>
            </Grid.Cell>
            <Grid.Cell size={{ xs: 3 }}>{item.required}</Grid.Cell>
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
