import { DataList, Grid, InputText, Switch } from "@jobber/components";
import { useMemo, useState } from "react";
import { OptionInternal } from "./OptionInternal";
import { ConvertRawPropsToStructured } from "../services/ConvertRawPropsToStructured";

export const PropsTab = ({defaultProps,updateValue,values}) => {

  const [search,setSearch] = useState('');
  const convertedProps = ConvertRawPropsToStructured(defaultProps)
  const defaultPropsMapped = useMemo(() => convertedProps.map((item, index) => {

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
  }), [values,convertedProps,updateValue]);

  const filteredProps = useMemo(() => {
    return defaultPropsMapped.filter(item => {
      return item.key.toLowerCase().includes(search.toLowerCase());
    });
  },[search,defaultPropsMapped]);

  return (
    <DataList
      title={"Props"}
      data={filteredProps}
      headers={{
        key: 'Key',
        description: 'Description',
        component: 'Component',
      }}
    >
      <DataList.Search
        value={search}
        onSearch={search => setSearch(search)}
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

  )
}
