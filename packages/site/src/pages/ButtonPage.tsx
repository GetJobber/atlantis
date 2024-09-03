import {
  FC,
  ReactElement,
  useMemo,
  useState,
} from 'react';
import { PageWrapper } from '../layout/PageWrapper';
import {
  Box,
  Button,
  Content,
  DataList,
  Flex,
  Grid,
  Heading,
  Icon,
  InlineLabel,
  InputText,
  Link,
  Page,
  Select,
  Switch,
  Tabs,
  Tab,
  Text,
  Cell,
  Header,
  Body,
  Table,
  Row,
  Disclosure,
  Markdown,
} from '@jobber/components';
import ButtonDocs from '../docs/Button.docs.json';
import './ButtonPage.module.css';
interface FormattedProp {
  key: string;
  description: string;
  type: 'string' | 'boolean' | 'option' | 'callback' | 'unknown';
  options?: Array<string>;
  id: string;
}
const converter = (
  unformatted: Array<{
    displayName: string;
    props: Record<string, { type: { name: string }; description: string }>;
  }>,
) => {
  const formatted: Array<FormattedProp> = [];

  let index = 0;
  for (const form of unformatted) {
    for (const key in form.props) {
      index++;
      const prop = form.props[key];

      if (prop.type.name === 'string' || prop.type.name === 'any') {
        formatted.push({
          id: 'string' + String(index),
          key,
          description: prop.description,
          type: 'string',
        });
      } else if (prop.type.name === 'boolean') {
        formatted.push({
          id: 'boolean' + String(index),
          key,
          description: prop.description,
          type: 'boolean',
        });
      } else if (/"([^"]+)"(\s*\|\s*"([^"]+)")*/.test(prop.type.name)) {
        const options = prop.type.name
          .replace(/"/g, '')
          .split('|')
          .map(d => d.trim());
        formatted.push({
          id: String(index),
          key,
          description: prop.description,
          options,
          type: 'option',
        });
      } else if (/\(\s*.*?\s*\)\s*=>\s*.*/.test(prop.type.name)) {
        formatted.push({
          id: String(index),
          key,
          description: prop.description,
          type: 'callback',
        });
      } else {
        formatted.push({
          id: String(index),
          key,
          description: prop.description,
          type: 'unknown',
        });
      }
    }
  }
  return formatted;
};
export const ButtonPage = () => {
  const converted = converter(ButtonDocs as any);

  return (
    <Grid>
      <Grid.Cell size={{ xs: 12, md: 9 }}>
        <Page 
          width="fill"
          title='Button'
          subtitle='Buttons are a core user interface component, as they allow users to initiate, complete, and reverse actions.'>

          <PageWrapper>
            <ComponentDocumentation
              Component={Button}
              defaultProps={converted}
              defaultValues={{ strings: { label: 'Button!' } }}
              code={`<Button label="Button!" />`}
            />

          </PageWrapper>
        </Page>
      </Grid.Cell>
      <Grid.Cell size={{ xs: 12, md: 3 }}>
        <Content>
          <Box padding="base" direction='column'>
            <Heading level={2}>Links</Heading>
          
            <Box direction='row'>
              <Link url="http://localhost:6006/?path=/docs/components-utilities-animatedswitcher-web--docs">
            Storybook 
              </Link>
            </Box>
          </Box>
        </Content>
      </Grid.Cell>
    </Grid>
  );
};

interface DocProps {
  defaultProps: Array<FormattedProp>;
  defaultValues: Record<string, Record<string, string | number>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: any;
  code?: string;
}
type ValueStateInternals = Record<string, string | number | (() => void)>;
type ValueState = Record<string, ValueStateInternals>;
export const ComponentDocumentation: FC<DocProps> = ({
  Component,
  defaultProps,
  defaultValues,
  code
}: DocProps): ReactElement => {
  const [selected, setSelected] = useState<Array<string>>([]);
  const [values, setValues] = useState<ValueState>(defaultValues);
  const updateValue = (
    propKey: string,
    key: { key: string },
    value: string | (() => void),
  ) => {
    setValues(oldValues => {
      const newValues: ValueState = {
        ...oldValues,
      };
      if (!newValues[propKey]) {
        newValues[propKey] = {};
      }
      newValues[propKey][key.key] = value;
      return newValues;
    });
  };
  const mappedProps = useMemo(() => {
    const mapped: ValueStateInternals = {};
    for (const key in values) {
      for (const propKey in values[key]) {
        mapped[propKey] = values[key][propKey];
      }
    }
    return mapped;
  }, [values]);

  const defaultPropsMapped = defaultProps.map((item, index) => {
    let component;
    if (item.type === 'option') {
      component = (
        <OptionInternal
          key={index}
          value={item}
          values={values as any}
          updateValue={updateValue}
        />
      );
    } else if (item.type === 'string') {
      component = (
        <InputText
          placeholder={item.key}
          value={values[item.key] as any}
          onChange={val => {
            updateValue('strings', item, val as string);
          }}
        />
      );
    } else if (item.type === 'boolean') {
      component = (
        <Switch
          value={!!values[item.type]}
          onChange={val => {
            updateValue('booleans', item, String(val));
          }}
        />
      );
    } else if (item.type === 'callback') {
      component = (
        <InputText
          placeholder={item.key}
          value={values[item.key] as any}
          onChange={val => {
            let func: string | (() => void) = '';
            try {
              func = new Function('', `return ${val};`) as () => void;
            } catch (e) {
              console.log(e);
            }
            updateValue('callbacks', item, func);
          }}
        />
      );
    }
    return { ...item, component };
  });
  return (
    <component-documentation>
      <Content spacing="large">
      <Box direction='column' gap="small">
      <preview-window>
        <Component {...mappedProps} />
      </preview-window>
      <Disclosure title="Code preview">
      <preview-code>
        <InputText multiline value={code} />
      </preview-code>
      </Disclosure>
      </Box>
      <Tabs>
        <Tab label='Design'>
<Content spacing="large">
<Heading level={2}>Variants</Heading>

<Text>The right button to use depends on:</Text>

<ul>
<li>the type of action your user is attempting to complete</li>
<li>the hierarchy of the interface the button lives in</li>
</ul>

<Heading level={3}>Work</Heading>
<Text>"Work" buttons are the default Jobber button style. Use to enable user interactions with the goal of completing work in Jobber.</Text>

<Heading level={4}>Primary</Heading>
<Text>Use for the single most important action in a view. Examples include the Save Job button, Log In, or the main action in a dialog. There should be one Primary action per view, at most.</Text>

<preview-window>
  <Button type="primary" label="Save Job" />
</preview-window>

<Heading level={4}>Secondary</Heading>
<Text>Use when there is one or more alternative, but less important, action to the primary action</Text>

<preview-window>
  <Button type="secondary" label="Select File" />
</preview-window>

<Heading level={4}>Tertiary</Heading>
<Text>A tertiary button should be used to complete actions within the view such as editing, revealing details, or navigating within the view.</Text>

<preview-window>
  <Button type="tertiary" label="Edit" icon="edit" />
</preview-window>

<Heading level={3}>Learning</Heading>
<Text>Use "learning" buttons to enable user interactions in the goal of learning about Jobber, whether for marketing or coaching purposes.
</Text>

<Heading level={4}>Primary, Secondary, Tertiary</Heading>
<Text>The usage pattern for Learning Actions should follow the same logic as Work Actions for all three levels.
</Text>
<preview-window>
    <Button variation='learning' type="primary" label="Upgrade Now" />
    <Button variation='learning' type="secondary" label="Visit Help Center" />
    <Button variation='learning' type="tertiary" label="Got It" />
</preview-window>

<Heading level={3}>Destructive</Heading>
<Text>"Destructive" actions remove something from Jobber.
</Text>
<Heading level={4}>Primary</Heading>
<Text>A Primary destructive action will permanently destroy an object carrying significant data, such as a job, quote, or client. This destructive action should be contained in a ConfirmationModal triggered by clicking a secondary or tertiary destructive button.
</Text>

<preview-window>
  <Button variation="destructive" type="primary" label="Delete Job" />
</preview-window>

<Heading level={4}>Secondary or Tertiary</Heading>

<Markdown 
  content='A Secondary or tertiary destructive action will either:

  - destroy an item on an object that can be quickly restored, such as a line item on a job
  - trigger a dialog to confirm a Primary destructive action' />

<preview-window>
    <Button variation='destructive' type="secondary" label="Remove Image" />
    <Button variation='destructive' type="tertiary" icon='trash' ariaLabel="Remove Line Item" />
</preview-window>

<Heading level={3}>Subtle</Heading>

<Markdown 
  content='Use a "subtle" button when you want the visual appearance to be more... subtle.
The subdued color allows these buttons to sit comfortably
alongside more prominent content.

Think of icon actions in a navigation bar, buttons to dismiss a modal, or opting
out of completing an action they have triggered.' />

<Text variation='subdued' size="small">Note: This is still known as "Cancel" on mobile. See
[Mobile/Cancel example](../?path=/story/components-actions-button-mobile--cancel).</Text>


<Heading level={4}> Primary, Secondary, and Tertiary</Heading>

<Text>A key distinction between subtle buttons and the other variations is that the
primary/secondary/tertiary scale is styled differently, but the conceptual
hierarchy is the same. Notably, the tertiary subtle button has a transparent
background, allowing it to be <em>extra</em> subtle when placed overtop
`surface--background` elements such as a Modal header.</Text>

<preview-window>
        <Button label="Cancel" type="primary" variation="subtle" />
        <Button label="Dismiss" type="secondary" variation="subtle" />
        <Button label="Maybe Later" type="tertiary" variation="subtle" />
    <div
      style={{
        padding: "var(--space-base)",
      }}
    >
      <Button
        variation="subtle"
        type="tertiary"
        icon="search"
        ariaLabel="search"
      />
      <Button
        variation="subtle"
        type="tertiary"
        icon="cog"
        ariaLabel="settings"
      />
      <Button
        variation="subtle"
        type="tertiary"
        icon="help"
        ariaLabel="help"
      />
      <Button
        variation="subtle"
        type="tertiary"
        icon="more"
        ariaLabel="more"
      />
    </div>
</preview-window>

<Heading level={2}>Content guidelines</Heading>

<Markdown 
  content="Button labels should be title-cased. This means in general, capitalize all words
with the exception of:

- articles (a, an, the)
- coordinating conjunctions (but, for)
- prepositions (at, by, to, etc.)" />

<Table>
  <Header>
    <Cell>✅ Do</Cell>
    <Cell>❌ Don't</Cell>
  </Header>
  <Body>
    <Row>
      <Cell>Go to Visits</Cell>
      <Cell>Go To Visits</Cell>
    </Row>
    <Row>
      <Cell>Save Job</Cell>
      <Cell>SAVE JOB</Cell>
    </Row>
  </Body>
</Table>

<Heading level={3}> & vs and</Heading>

<Markdown 
  content='If you have a Button with "compound" actions such as "Review & Send" or "Approve
& Schedule", use an ampersand (&) for brevity and to reduce the likelihood that
your label will wrap. A non-breaking space should be used between the ampersand
and the second word so that the ampersand wraps with the second word.' />

<Table>
  <Header>
    <Cell>✅ Do</Cell>
    <Cell>❌ Don't</Cell>
  </Header>
  <Body>
    <Row>
      <Cell>Review & Send</Cell>
      <Cell>Review and Send</Cell>
    </Row>
    <Row>
      <Cell>Approve & Schedule</Cell>
      <Cell>Approve and Schedule</Cell>
    </Row>
  </Body>
</Table>

<Heading level={3}>Disabled</Heading>

<Markdown 
  content="As a best practice, do not design with disabled button states. This has negative
impacts on accessibility as well as an increase in complexity for users to
understand why the interface is disabled and how to resolve it.

With that said, if you simply can't design a flow without a disabled state, this is
how you disable a button." />

<preview-window>
  <Button label="Do the Thing" disabled />
</preview-window>

<Heading level={3}>Sizes</Heading>

<Markdown 
  content="Buttons come in three sizes. `Base` is the default and should be used for almost
every use case.

Only use `large` for extremely spacious interfaces such as a login form, and
`small` when the interface has extremely tight size constraints." />

<preview-window>
  <Content>
    <Content>
      <Button label="Small" size="small" />
    </Content>
    <Content>
      <Button label="Base" />
    </Content>
    <Content>
      <Button label="Large" size="large" />
    </Content>
  </Content>
</preview-window>

<Heading level={3}>Icons</Heading>

<Markdown 
  content="You can use icons inside the buttons. They can stand-alone, or appear before,
after, or on top of the button label. They can also be added before or after the
label.

**Note:** If an icon is used in a stand-alone method, an `ariaLabel` must be
present to describe the button." 
/>

<preview-window>
  <Button type="secondary" icon="user" ariaLabel="I'm a person" />
  <Button label="More" type="secondary" icon="more" />
  <Button
    label="Actions"
    type="secondary"
    icon="arrowDown"
    iconOnRight={true}
  />
</preview-window>

<Heading level={3}>Loading</Heading>

<Markdown 
  content="A way to communicate to the user that a background action is being performed." />

<preview-window>
  <Button
    label="Deleting..."
    type="primary"
    variation="destructive"
    loading={true}
  />
  <Button
    label="Loading..."
    type="tertiary"
    variation="learning"
    loading={true}
  />
  <Button label="Canceling..." variation="subtle" loading={true} />
</preview-window>

</Content>
        </Tab>
        <Tab label='Code'>
          <DataList
          title={"Props"}
          data={defaultPropsMapped}
          headers={{
            key: 'Key',
            description: 'Description',
            component: 'Component',
          }}
          // selected={selected}
          // onSelect={setSelected as any}
          // onSelectAll={setSelected as any}
          >
          <DataList.Search
            onSearch={search => console.log(search)}
            placeholder="Search Props"
          />

          <DataList.Layout size="md">
            {(item: any) => (
              <Grid gap>
                <Grid.Cell size={{ xs: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'flex' }}>
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
        </Tab>
      </Tabs>
      </Content>
    </component-documentation>
  );
};

interface OptionInternalProps {
  value: FormattedProp;
  values: Record<string, string>;
  updateValue: (
    propKey: string,
    key: { key: string },
    value: string | (() => void),
  ) => void;
}
export const OptionInternal = ({
  value,
  values,
  updateValue,
}: OptionInternalProps) => {
  return (
    <>
      {value.description && <InlineLabel>{value.description}</InlineLabel>}

      <Select
        placeholder={value.key}
        value={values[value.key]}
        onChange={val => {
          updateValue('options', { key: value.key }, val as string);
        }}>
        {value.options?.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </Select>
    </>
  );
};
/*
{internalProps.map((prop, index) => {
          return (
            <select
              value={prop.selected}
              onChange={e => {
                setInternalProps(oldProps => {
                  const newProps = [...oldProps];
                  newProps[index].selected = e.target.value;
                  return newProps;
                });
              }}>
              {prop.options.map((option: DocOption) => {
                return <option value={option.value}>{option.label}</option>;
              })}
            </select>
          );
        })} */
