import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputDate } from "@jobber/components/InputDate";
import { Content } from "@jobber/components/Content";
import { Grid } from "@jobber/components/Grid";
import { Button } from "@jobber/components/Button";

export default {
  title: "Components/Forms and Inputs/InputDate/Web",
  component: InputDate,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof InputDate>;

const BasicTemplate: ComponentStory<typeof InputDate> = args => {
  const [date, setDate] = useState(new Date("11/11/2011"));

  return (
    <Content>
      <textarea />
      <InputDate
        {...args}
        value={date}
        onChange={d => {
          if (!d) {
            console.log(`🔥 InputDate onChange NO VALUE`);

            return;
          }
          setDate(d);
          console.log(`🔥 InputDate onChange`, d);
        }}
      />
    </Content>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  placeholder: "Start Date",
};

const MinMaxTemplate: ComponentStory<typeof InputDate> = args => {
  const minDate = new Date("11/06/2011");
  const maxDate = new Date("11/25/2011");
  const [date, setDate] = useState(new Date("11/11/2011"));

  return (
    <InputDate
      {...args}
      minDate={minDate}
      maxDate={maxDate}
      value={date}
      onChange={setDate}
    />
  );
};

export const MinMax = MinMaxTemplate.bind({});
MinMax.args = {
  placeholder: "Start Date",
};

export const VersionComparison = () => {
  const [dates, setDates] = React.useState({
    basic: new Date(),
    rightAligned: new Date(),
    centerAligned: new Date(),
    disabled: new Date(),
    readonly: new Date(),
    inline: new Date(),
    small: new Date(),
    large: new Date(),
  });
  const [disabled, setDisabled] = React.useState(false);
  const [readonly, setReadonly] = React.useState(false);
  const [inline, setInline] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();
  const [description, setDescription] = React.useState<string>("");
  const [showIcon, setShowIcon] = React.useState(true);

  const extraProps = {
    error: errorMessage,
    disabled,
    // For version 1
    readonly: readonly,
    // For version 2
    readOnly: readonly,
    showIcon,
    inline,
    description,
  };

  const handleChange = (field: keyof typeof dates) => (value: Date) => {
    setDates(prev => ({ ...prev, [field]: value }));
  };

  const renderBothVersions = (
    title: string,
    props: Record<string, unknown>,
    field: keyof typeof dates,
  ) => (
    <Grid>
      <Grid.Cell size={{ xs: 12 }}>
        <h3>{title}</h3>
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <InputDate
          {...props}
          value={dates[field]}
          onChange={handleChange(field)}
        />
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <InputDate
          {...props}
          version={2}
          value={dates[field]}
          onChange={handleChange(field)}
        />
      </Grid.Cell>
    </Grid>
  );

  return (
    <Content>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <Grid>
          <Grid.Cell size={{ xs: 6 }}>
            <h2>V1</h2>
          </Grid.Cell>
          <Grid.Cell size={{ xs: 6 }}>
            <h2>V2</h2>
          </Grid.Cell>
        </Grid>

        {renderBothVersions(
          "Basic",
          {
            placeholder: "Select a date",
            ...extraProps,
          },
          "basic",
        )}

        {renderBothVersions(
          "Right Aligned",
          {
            placeholder: "Right aligned date",
            align: "right",
            ...extraProps,
          },
          "rightAligned",
        )}

        {renderBothVersions(
          "Center Aligned",
          {
            placeholder: "Center aligned date",
            align: "center",
            ...extraProps,
          },
          "centerAligned",
        )}

        {renderBothVersions(
          "Small Size",
          {
            placeholder: "Small date picker",
            size: "small",
            ...extraProps,
          },
          "small",
        )}

        {renderBothVersions(
          "Large Size",
          {
            placeholder: "Large date picker",
            size: "large",
            ...extraProps,
          },
          "large",
        )}

        {renderBothVersions(
          "Inline",
          {
            placeholder: "Samll Inline date picker",
            size: "small",
            ...extraProps,
            inline: true,
          },
          "inline",
        )}

        {renderBothVersions(
          "Readonly",
          {
            placeholder: "Readonly date picker",
            ...extraProps,
            // For version 1
            readonly: true,
            // For version 2
            readOnly: true,
          },
          "readonly",
        )}

        {renderBothVersions(
          "Disabled",
          {
            placeholder: "Disabled date picker",
            ...extraProps,
            disabled: true,
          },
          "disabled",
        )}
      </div>

      <Grid>
        <Grid.Cell size={{ xs: 6 }}>
          <Button label="Toggle Inline" onClick={() => setInline(!inline)} />
        </Grid.Cell>
        <Grid.Cell size={{ xs: 6 }}>
          <Button
            label="Toggle Readonly"
            onClick={() => setReadonly(!readonly)}
          />
        </Grid.Cell>
        <Grid.Cell size={{ xs: 6 }}>
          <Button
            label="Toggle Disabled"
            onClick={() => setDisabled(!disabled)}
          />
        </Grid.Cell>
        <Grid.Cell size={{ xs: 6 }}>
          <Button
            label="Toggle Error message"
            onClick={() => {
              if (errorMessage) {
                setErrorMessage(undefined);
              } else {
                setErrorMessage("This is an error message");
              }
            }}
          />
        </Grid.Cell>
        <Grid.Cell size={{ xs: 6 }}>
          <Button
            label="Toggle Description"
            onClick={() => {
              setDescription(description ? "" : "This is a description");
            }}
          />
        </Grid.Cell>
        <Grid.Cell size={{ xs: 6 }}>
          <Button
            label="Toggle Show Icon"
            onClick={() => setShowIcon(prev => !prev)}
          />
        </Grid.Cell>
      </Grid>
    </Content>
  );
};
