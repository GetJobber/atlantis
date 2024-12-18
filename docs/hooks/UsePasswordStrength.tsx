import React, { useState } from "react";
import { Content } from "@jobber/components/Content";
import { DataDump } from "@jobber/components/DataDump";
import { InputText } from "@jobber/components/InputText";
import { usePasswordStrength } from "@jobber/hooks/usePasswordStrength";

export function UsePasswordStrength() {
  const [password, setPassword] = useState("atlantis_is_a_strong_password");
  const resultWithoutDict = usePasswordStrength(password);
  const resultWithDict = usePasswordStrength(password, [
    "atlantis",
    "atlantis_is_a_strong_password",
  ]);

  return (
    <Content>
      <InputText
        placeholder="Password"
        defaultValue="atlantis_is_a_strong_password"
        onChange={setPassword}
      />
      <DataDump
        label="Password Strength (with Dictionary)"
        data={resultWithDict}
        defaultOpen
      />
      <DataDump
        label="Password Strength (without Dictionary)"
        data={resultWithoutDict}
        defaultOpen
      />
    </Content>
  );
}
