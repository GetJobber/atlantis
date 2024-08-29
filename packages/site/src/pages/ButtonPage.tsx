import {
  FC,
  ReactElement,
  useMemo,
  useState,
} from 'react';
import {PageWrapper} from '../layout/PageWrapper';
import Post from './Post.mdx';
import {
  Button,
  DataList,
  Grid,
  InlineLabel,
  InputText,
  Link,
  Select,
  Switch,
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
    props: Record<string, {type: {name: string}; description: string}>;
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
    <PageWrapper>
      <Post />
      <Link url="http://localhost:6007/?path=/story/components-layouts-and-structure-actionitem-mobile--basic">
        Mobile
      </Link>
      <Link url="http://localhost:6006/?path=/docs/components-utilities-animatedswitcher-web--docs">
        Web
      </Link>

      <ComponentDocumentation
        Component={Button}
        defaultProps={converted}
        defaultValues={{strings: {label: 'Hello Atlantis!'}}}
      />
    </PageWrapper>
  );
};

interface DocProps {
  defaultProps: Array<FormattedProp>;
  defaultValues: Record<string, Record<string, string | number>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: any;
}
type ValueStateInternals = Record<string, string | number | (() => void)>;
type ValueState = Record<string, ValueStateInternals>;
export const ComponentDocumentation: FC<DocProps> = ({
  Component,
  defaultProps,
  defaultValues,
}: DocProps): ReactElement => {
  const [selected, setSelected] = useState<Array<string>>([]);
  const [values, setValues] = useState<ValueState>(defaultValues);
  const updateValue = (
    propKey: string,
    key: {key: string},
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
    return {...item, component};
  });
  return (
    <component-documentation>
      <preview-window>
        <Component {...mappedProps} />
      </preview-window>

      <DataList
        data={defaultPropsMapped}
        headers={{
          key: 'Key',
          description: 'Description',
          component: 'Component',
        }}
        selected={selected}
        onSelect={setSelected as any}
        onSelectAll={setSelected as any}>
        <DataList.Search
          onSearch={search => console.log(search)}
          placeholder="Search Props"
        />

        <DataList.Layout size="md">
          {(item:any) => (
            <Grid gap>
              <Grid.Cell size={{xs: 2}}>
                <div style={{display: 'flex', alignItems: 'flex'}}>
                  {item.key}
                </div>
              </Grid.Cell>
              <Grid.Cell size={{xs: 3}}>{item.description}</Grid.Cell>
              <Grid.Cell size={{xs: 3}}>{item.component}</Grid.Cell>
            </Grid>
          )}
        </DataList.Layout>

        <DataList.EmptyState
          type="filtered"
          message="No officers found with your search criteria."
        />
      </DataList>
    </component-documentation>
  );
};

interface OptionInternalProps {
  value: FormattedProp;
  values: Record<string, string>;
  updateValue: (
    propKey: string,
    key: {key: string},
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
          updateValue('options', {key: value.key}, val as string);
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
