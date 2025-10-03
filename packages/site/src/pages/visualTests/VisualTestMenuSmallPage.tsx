import { Button, Menu } from "@jobber/components";

export const VisualTestMenuSmallPage = () => {
  const items = [
    {
      label: "Section",
      actions: [{ label: "One" }, { label: "Two" }, { label: "Three" }],
    },
  ];

  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "flex-end" }}>
      <div style={{ width: "100%", padding: 16 }}>
        <Menu activator={<Button label="Open" />} items={items} />
      </div>
    </div>
  );
};

export const VisualTestMenuSmallStickyPage = () => {
  const items = [
    {
      label: "Section",
      actions: [{ label: "One" }, { label: "Two" }, { label: "Three" }],
    },
  ];

  return (
    <div style={{ height: "200vh" }}>
      <div style={{ height: "150vh" }} />
      <div style={{ position: "sticky", bottom: 0 }}>
        <div style={{ padding: 16 }}>
          <Menu activator={<Button label="Sticky Open" />} items={items} />
        </div>
      </div>
    </div>
  );
};
