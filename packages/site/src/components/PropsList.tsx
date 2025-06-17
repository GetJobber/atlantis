import {
  Content,
  DataList,
  Grid,
  InlineLabel,
  InputText,
} from "@jobber/components";
import { ReactNode, useState } from "react";

/**
 * All the Props for a component. This component receives an Array of DataListOptions, and will generate mulitple DataLists as a result.
 * This is to better support compound components.
 * @param param0 {values}
 * @returns
 */
export const PropsList = ({
  values,
}: {
  readonly values: Array<{
    name: string;
    props: Array<{
      key: string;
      description: string | undefined;
      component: ReactNode;
      required: string;
      id: string | number;
    }>;
  }>;
}) => {
  const [search, setSearch] = useState("");

  const filteredValues = values.map(meta => {
    return {
      ...meta,
      props: meta.props
        .filter(prop => prop.key.toLowerCase().includes(search.toLowerCase()))
        .map(prop => ({
          ...prop,
          key: <pre>{prop.key}</pre>,
        })),
    };
  });

  return (
    <div data-props-list>
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
              title={`${value.name} properties`}
              data={value.props}
              headers={{
                key: "Property",
                description: "Description",
                component: "Type",
              }}
              headerVisibility={{ xs: false, lg: true }}
            >
              <DataList.Layout size="md">
                {(item: {
                  key: ReactNode;
                  description: string;
                  component: ReactNode;
                  required: boolean;
                }) => (
                  <Grid>
                    <Grid.Cell size={{ md: 5, lg: 3 }}>
                      <div
                        style={{
                          display: "flex",
                          gap: "var(--space-small)",
                          flexWrap: "wrap",
                        }}
                      >
                        {item.key}
                        {item.required && <InlineLabel>Required</InlineLabel>}
                      </div>
                    </Grid.Cell>
                    <Grid.Cell size={{ md: 7, lg: 3 }}>
                      {item.component}
                    </Grid.Cell>
                    <Grid.Cell size={{ md: 12, lg: 6 }}>
                      {item.description}
                    </Grid.Cell>
                  </Grid>
                )}
              </DataList.Layout>
              <DataList.Layout size="xs">
                {(item: {
                  key: string;
                  description: string;
                  component: ReactNode;
                  required: boolean;
                }) => (
                  <Grid>
                    <Grid.Cell size={{ xs: 12 }}>
                      <div
                        style={{
                          display: "flex",
                          gap: "var(--space-smaller",
                          flexWrap: "wrap",
                        }}
                      >
                        {item.key}
                        {item.required && <InlineLabel>Required</InlineLabel>}
                      </div>
                    </Grid.Cell>
                    <Grid.Cell size={{ xs: 12 }}>{item.component}</Grid.Cell>
                    <Grid.Cell size={{ xs: 12 }}>{item.description}</Grid.Cell>
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
    </div>
  );
};
