import { Button } from "@jobber/components/Button";
import { Content } from "@jobber/components/Content";
import { Checkbox } from "@jobber/components/Checkbox";
import { useBool } from "@jobber/hooks/useBool";

export function UseBool() {
  const [checked, on, off, toggle] = useBool(false);

  return (
    <Content>
      <Checkbox checked={checked} onChange={toggle} />
      <br />
      <Button onClick={on} label={"On"} variation="subtle" />
      <br />
      <Button onClick={off} label={"Off"} variation="destructive" />
    </Content>
  );
}
