import { DataList, Grid, InputText, Switch } from "@jobber/components";
import { ReactNode, useMemo, useState } from "react";
import { OptionInternal } from "./OptionInternal";
import { FormattedProp } from "../types/services";

export const PropsList = ({
  updateValue,
  values,
}: {
  readonly updateValue: (key: string, value: string | number | boolean) => void;
  readonly values: Record<
    string,
    { type: string; value: string; description: string; required: boolean }
  >;
}) => {
  const [search, setSearch] = useState("");

  const defaultPropsMapped = useMemo(() => {
    const components: Array<{
      key: string;
      description: string;
      component?: JSX.Element;
      required?: string;
      id: string;
    }> = [];
    Object.keys(values).forEach((key, index) => {
      let component;
      const item = values[key];

      if (item?.type?.includes?.("(")) {
        component = (
          <InputText
            multiline
            placeholder={item.type as string}
            value={item.value}
            onChange={val => {
              updateValue(key, val as string);
            }}
          />
        );
      } else if (item?.type === "string") {
        component = (
          <InputText
            placeholder={item.value as string}
            value={item.value as string}
            onChange={val => {
              updateValue(key, val as string);
            }}
          />
        );
      } else if (item?.type === "boolean") {
        component = (
          <Switch
            value={Boolean(item.value)}
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
            values={
              {
                description: item.description,
                key: key,
                options: keys,
                value: item.value,
                type: item.type,
                required: item.required,
              } as FormattedProp
            }
            updateValue={updateValue}
          />
        );
      }

      components.push({
        id: key,
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
