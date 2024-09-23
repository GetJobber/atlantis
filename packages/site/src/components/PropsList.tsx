import { Content, DataList, Grid, InputText } from "@jobber/components";
import { ReactNode, useState } from "react";

export const PropsList = ({
  values,
}: {
  readonly updateValue: (key: string, value: string | number | boolean) => void;
  readonly values: Array<{
    name: string;
    props: Array<{
      key: string;
      description: string;
      component: ReactNode;
      required: string;
      id: string;
    }>;
  }>;
}) => {
  const [search, setSearch] = useState("");

  const filteredValues = values.map(meta => {
    return {
      ...meta,
      props: meta.props.filter(e =>
        e.key.toLowerCase().includes(search.toLowerCase()),
      ),
    };
  });

  return (
    <Content>
      <InputText
        value={search}
        onChange={searchIn => setSearch(searchIn as string)}
        placeholder="Search Props"
      />
      {filteredValues.map((value, key) => {
        return (
          <DataList
            key={key}
            title={value.name}
            data={value.props}
            headers={{
              key: "Key",
              required: "Required",
              description: "Description",
              component: "Component",
            }}
          >
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
      })}
    </Content>
  );
};
