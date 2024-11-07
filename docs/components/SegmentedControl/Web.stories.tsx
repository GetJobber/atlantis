import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { SegmentedControl } from "@jobber/components/SegmentedControl";

const meta: Meta = {
  title: "Components/Selections/SegmentedControl/Web",
  component: SegmentedControl,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
  },
};
export default meta;

type Story = StoryFn<typeof SegmentedControl>;
const options = [
  { value: "pizza", label: "Pizza" },
  { value: "tacos", label: "Tacos" },
  { value: "sushi", label: "Sushi" },
  { value: "burgers", label: "Burgers" },
];

export const BasicControlled: Story = () => {
  const [activeOption, setActiveOption] = useState("pizza");

  return (
    <SegmentedControl
      selectedValue={activeOption}
      onSelectValue={setActiveOption}
    >
      {options.map(option => (
        <SegmentedControl.Option key={option.value} value={option.value}>
          {option.label}
        </SegmentedControl.Option>
      ))}
    </SegmentedControl>
  );
};

// export const OnSelectValue = () => {
//   const [activeOption, setActiveOption] = useState<string>("tacos");

//   const handleSelectValue = (value: string) => {
//     setActiveOption(value);

//     if (value === "pizza") {
//       console.log("Pizza selected!");
//     } else if (value === "tacos") {
//       console.log("Tacos selected!");
//     } else if (value === "sushi") {
//       console.log("Sushi selected!");
//     } else if (value === "burgers") {
//       console.log("Burgers selected!");
//     }
//   };

//   return (
//     <SegmentedControl<string>
//       selectedValue={activeOption}
//       onSelectValue={handleSelectValue}
//     >
//       {options.map(option => (
//         <SegmentedControl.Option<string>
//           key={option.value}
//           value={option.value}
//         >
//           {option.label}
//         </SegmentedControl.Option>
//       ))}
//     </SegmentedControl>
//   );
// };

export const BasicUncontrolled: Story = () => {
  return (
    <SegmentedControl defaultValue="pizza">
      {options.map(option => (
        <SegmentedControl.Option key={option.value} value={option.value}>
          {option.label}
        </SegmentedControl.Option>
      ))}
    </SegmentedControl>
  );
};
