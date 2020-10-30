#!/usr/bin/env ts-node  --project ../../tsconfig.bin.json
import { promisify } from "util";
import { sep } from "path";
import { writeFileSync } from "fs";
import glob from "glob";

const pGlob = promisify(glob);

build();

async function build() {
  writeFileSync(`../../docs/Playground.mdx`, await getPlaygroundContent());
}

async function getComponentList() {
  const indices = await pGlob("./src/*/index.ts");
  const content = "";

  return indices.reduce((listContent, entryPoint) => {
    const pathParts = entryPoint.split(sep);
    const moduleName = pathParts[2];
    listContent += `import { ${moduleName} } from "@jobber/components/${moduleName}";\n`;

    return listContent;
  }, content);
}

async function getPlaygroundContent() {
  const list = await getComponentList();
  const result = `---
name: Playground
route: /playground
fullpage: true
---

import { useRef, useState } from "react";
import { Playground, Props } from "docz";
${list}


# Playground

## Welcome to the Playground

Here you can use All the components in the same Playground!

<Playground isFullWidth="true">
  {() => {
    const [nightIsGood, setNightIsGood] = useState(false);
    return (
      <Content>
        {!nightIsGood && (
          <Banner type="notice">
            ☀️ Play nicely with everyone in the sandbox. 🏖
          </Banner>
        )}
        {nightIsGood && (
          <Banner type="error">🌚 Code bugs can really suck. 🧛🏻‍♂️</Banner>
        )}
        <Card>
          <Content>
            <Heading>But Tell Me Really</Heading>
            <Text>The white around here is a little bright, right? 🤔</Text>
            <Checkbox
              checked={nightIsGood}
              label="Dark Mode Engage"
              onChange={setNightIsGood}
            />
          </Content>
        </Card>
      </Content>
    );
  }}
</Playground>
`;
  return result;
}
