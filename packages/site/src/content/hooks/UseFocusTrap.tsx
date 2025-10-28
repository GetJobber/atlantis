import { useState } from "react";
import { Button } from "@jobber/components/Button";
import { Content } from "@jobber/components/Content";
import { Checkbox } from "@jobber/components/Checkbox";
import { InputText } from "@jobber/components/InputText";
import { useFocusTrap } from "@jobber/hooks/useFocusTrap";

export function UseFocusTrap() {
  const [checked, setChecked] = useState(false);
  const trapRef = useFocusTrap(checked);

  return (
    <>
      <Checkbox checked={checked} onChange={setChecked} label="Trap focus" />
      <div ref={trapRef} tabIndex={0}>
        <Content>
          {checked}
          <InputText placeholder="First Name" name="firstName" />
          <InputText placeholder="Last Name" name="lastName" />
          <Button label="Submit Form" submit={true} />
        </Content>
      </div>
    </>
  );
}
