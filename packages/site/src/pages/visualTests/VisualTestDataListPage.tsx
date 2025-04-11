import {
  Box,
  Button,
  DataList,
  Grid,
  Heading,
  Stack,
  Text,
} from "@jobber/components";
import { useState } from "react";

interface TestItem {
  id: string;
  label: string;
  description: string;
  status: string;
  date: string;
  tags?: string[];
  [key: string]: string | Date | string[] | undefined;
}

export const VisualTestDataListPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [loadingState, setLoadingState] = useState<
    "none" | "initial" | "filtering" | "loadingMore"
  >("none");

  const testData: TestItem[] = [
    {
      id: "1",
      label: "First Item",
      description: "This is the first item description",
      status: "Active",
      date: new Date().toLocaleDateString(),
      tags: ["Important", "New"],
    },
    {
      id: "2",
      label: "Second Item",
      description: "This is the second item description",
      status: "Pending",
      date: new Date().toLocaleDateString(),
      tags: ["Urgent"],
    },
    {
      id: "3",
      label: "Third Item",
      description: "This is the third item description",
      status: "Completed",
      date: new Date().toLocaleDateString(),
      tags: [],
    },
  ];

  return (
    <Box padding="large">
      <Stack space="extravagant">
        <Heading level={1}>DataList Examples</Heading>

        <Stack space="large">
          {/* Basic DataList */}
          <section>
            <Text size="large">Basic DataList</Text>
            <DataList<TestItem>
              title="Basic Example"
              data={testData}
              headers={{
                label: "Name",
                description: "Description",
                status: "Status",
                date: "Date",
              }}
              totalCount={testData.length}
            >
              <DataList.Layout>
                {(item: TestItem) => (
                  <Grid>
                    <Grid.Cell size={{ xs: 12, md: 3 }}>
                      <Text>{item.label}</Text>
                    </Grid.Cell>
                    <Grid.Cell size={{ xs: 12, md: 4 }}>
                      <Text>{item.description}</Text>
                    </Grid.Cell>
                    <Grid.Cell size={{ xs: 12, md: 2 }}>
                      <Text>{item.status}</Text>
                    </Grid.Cell>
                    <Grid.Cell size={{ xs: 12, md: 3 }}>
                      <Text>{item.date}</Text>
                    </Grid.Cell>
                  </Grid>
                )}
              </DataList.Layout>
            </DataList>
          </section>

          {/* DataList with Search and Filters */}
          <section>
            <Text size="large">DataList with Search and Filters</Text>
            <DataList<TestItem>
              title="Searchable List"
              data={testData}
              headers={{
                label: "Name",
                description: "Description",
                status: "Status",
                date: "Date",
              }}
              loadingState={loadingState}
              filtered={searchValue !== ""}
            >
              <DataList.Search
                onSearch={value => {
                  setSearchValue(value);
                  setLoadingState("filtering");
                  setTimeout(() => setLoadingState("none"), 1000);
                }}
                placeholder="Search items..."
              />
              <DataList.Layout>
                {(item: TestItem) => (
                  <Grid>
                    <Grid.Cell size={{ xs: 12, md: 3 }}>
                      <Text>{item.label}</Text>
                    </Grid.Cell>
                    <Grid.Cell size={{ xs: 12, md: 4 }}>
                      <Text>{item.description}</Text>
                    </Grid.Cell>
                    <Grid.Cell size={{ xs: 12, md: 2 }}>
                      <Text>{item.status}</Text>
                    </Grid.Cell>
                    <Grid.Cell size={{ xs: 12, md: 3 }}>
                      <Text>{item.date}</Text>
                    </Grid.Cell>
                  </Grid>
                )}
              </DataList.Layout>
              <DataList.EmptyState
                message="No items found"
                type="filtered"
                action={
                  <Button
                    label="Clear filters"
                    onClick={() => setSearchValue("")}
                  />
                }
              />
            </DataList>
          </section>

          {/* DataList with Actions */}
          <section>
            <Text size="large">DataList with Actions</Text>
            <DataList<TestItem>
              title="List with Actions"
              data={testData}
              headers={{
                label: "Name",
                description: "Description",
                status: "Status",
                date: "Date",
              }}
              selected={selectedItems}
              onSelect={selected => setSelectedItems(selected as string[])}
              onSelectAll={selected => setSelectedItems(selected as string[])}
            >
              <DataList.BatchActions>
                <DataList.BatchAction
                  label="Delete Selected"
                  icon="trash"
                  destructive
                  onClick={() => console.log("Delete items", selectedItems)}
                />
                <DataList.BatchAction
                  label="Archive Selected"
                  icon="archive"
                  onClick={() => console.log("Archive items", selectedItems)}
                />
              </DataList.BatchActions>
              <DataList.Layout>
                {(item: TestItem) => (
                  <Grid>
                    <Grid.Cell size={{ xs: 12, md: 3 }}>
                      <Text>{item.label}</Text>
                    </Grid.Cell>
                    <Grid.Cell size={{ xs: 12, md: 4 }}>
                      <Text>{item.description}</Text>
                    </Grid.Cell>
                    <Grid.Cell size={{ xs: 12, md: 2 }}>
                      <Text>{item.status}</Text>
                    </Grid.Cell>
                    <Grid.Cell size={{ xs: 12, md: 3 }}>
                      <Text>{item.date}</Text>
                    </Grid.Cell>
                  </Grid>
                )}
              </DataList.Layout>
              <DataList.ItemActions>
                <DataList.ItemAction
                  label="Edit"
                  icon="edit"
                  onClick={() => console.log("Edit clicked")}
                />
                <DataList.ItemAction
                  label="Delete"
                  icon="trash"
                  destructive
                  onClick={() => console.log("Delete clicked")}
                />
              </DataList.ItemActions>
            </DataList>
          </section>

          {/* DataList with Tags and Custom Styling */}
          <section>
            <Text size="large">DataList with Tags and Custom Styling</Text>
            <DataList<TestItem>
              title="Custom Styled List"
              data={testData}
              headers={{
                label: "Name",
                description: "Description",
                status: "Status",
                tags: "Tags",
                date: "Date",
              }}
            >
              <DataList.Layout>
                {(item: TestItem) => (
                  <Grid>
                    <Grid.Cell size={{ xs: 12, md: 3 }}>
                      <Stack space="small">
                        <Text>{item.label}</Text>
                        {item.tags && item.tags.length > 0 && (
                          <Stack align="center" space="small">
                            {item.tags.map((tag: string) => (
                              <Box
                                key={tag}
                                background="success--surface"
                                padding="small"
                                radius="small"
                              >
                                <Text>{tag}</Text>
                              </Box>
                            ))}
                          </Stack>
                        )}
                      </Stack>
                    </Grid.Cell>
                    <Grid.Cell size={{ xs: 12, md: 4 }}>
                      <Text>{item.description}</Text>
                    </Grid.Cell>
                    <Grid.Cell size={{ xs: 12, md: 2 }}>
                      <Box
                        background={
                          item.status === "Active"
                            ? "success--surface"
                            : item.status === "Pending"
                            ? "warning--surface"
                            : "informative--surface"
                        }
                        padding="small"
                        radius="small"
                      >
                        <Text>{item.status}</Text>
                      </Box>
                    </Grid.Cell>
                    <Grid.Cell size={{ xs: 12, md: 3 }}>
                      <Text>{item.date}</Text>
                    </Grid.Cell>
                  </Grid>
                )}
              </DataList.Layout>
            </DataList>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
