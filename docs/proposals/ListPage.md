# Component Name

The `ListPage` component will provide the structure and parts needed to display
a list view.

## Design Patterns

There is a desire to provide developers with page templates to both speed up the
development of pages but also provide our users with a more consistent
experience.

A first step in this is imagining what a common `ListPage` component would look
like. It would need to have some level of flexibility to allow for use on
different pages but still provide common "slots" or areas.

Looking at the interface section we should be able to define the slots with sub
components such as: `ListSummary`, `ListItemShow` and `CtaContainer`.

## Accessibility

As a primarily layout component we don't have a lot of interaction concerns on
the ListPage but, we should ensure that we're using semantically appropriate
tags wherever possible to aid in readability and navigation.

## Responsiveness & Mobile

The list page consists of a few main areas. The List Body itself, an open
ListItem, a ListSummary and a CtaContainer.

When in a mobile viewport they should be organized as follows:

- ListSummary
- ListBody
- CtaContainer

ListItem would then open as a pane top of the "page".

## Wireframe

https://www.figma.com/file/qw8HnK3rBDHGf44RVksCXT/JOB-20476-Manage-Team?node-id=139%3A245

## Interface

A decent number of these parts will move into a `DataTable` component after we
have that RFC complete and some more experience trying this approach in this
component.

Renderers below refer to react components that will, given data render a cell,
row or list. Examples below: `CustomListRenderer`, `CustomCellRenderer`

### Column Interface

We may want a better name than column here. For the purposes of this Column
means a section or cell that is common across each row or list item. For example
"name" or "actions".

```tsx
interface ListColumn {
  key: string;
  /**
   * A Renderer to for the cells in this column such as the
   * `CustomCellRenderer` renderer outlined below.
   *
   * Built in renderers such as `TextCell`, `NumberCell` will also be provided
   * by Atlantis and can be imported for use.
   */
  renderer?: ReactElement;
  sortable?: boolean | function;
}

interface TableColumn extends ListColumn {
  header: string;
}
```

### CustomListRenderer

A List renderer would conform to the following.

```tsx
interface ListRendererProps {
  // We'll have to figure out some typing for this generics will probably help.
  listItems: unknown;
  columns: ListColumn[];
}

function TableListRenderer({ listItems, columns }: ListRendererProps) {
  return (
    <table>
      {columns.map(column => (
        <th>{column.key}</th>
      ))}
      {listItems.map(item => (
        <tr>item.cells.map(cell => columns[cell.key](cell.data))</tr>
      ))}
    </table>
  );
}
```

### CustomListCellRenderer

```tsx
interface CellRendererProps {
  // We'll have to figure out some typing for this generics will probably help.
  data: unknown;
}

function CustomCellRenderer({ data }: CellProps) {
  return data;
}
```

```tsx
import {
  ListPage,
  TableListRenderer,
  TextCell,
} from "@jobber/…"

<ListPage
  title="Page Title"
  intro="Description of this page."
  actions={[ButtonProps]}
  filters={} // optional
  searchable={true} // optional

  // Optional
  // Defines the renderer to layout the list. See `CustomListRenderer` above.
  listRender={TableListRenderer}
  listItems={[
    {
      name: "joe",
      age: 7,
      …
    }
  ]}
  // Defines the columns and their renderer's described in `ListColumn`.
  columns={ListColumn[]}
>

  <ListItemShow>
    {item => <>
      {item.title}
      <hr />
      {item.address}
    </>
  </ListItemShow>

  <ListSummary>
    There are {count} Items in the List.
  </ListSummary>

  <CtaContainer>  // optional
    <MyCTA />
  </CtaContainer>
</ListPage>
```

## Props Table

Given the complexity of this component I've tried to define props in the
interface section so they can be closer to the specific part they are relevant
to.
