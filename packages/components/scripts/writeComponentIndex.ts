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

Use All the Components!! Maybe this playground needs a button?


## Coming soon, probably:

- "Quick Add" UI to copy in the component example from another MDX file!

---

<Playground>
  {() => {
    const [bannerIsVisible, setBannerIsVisible] = useState(true);
    return (
      <Content>
        {bannerIsVisible && (
          <Banner type="notice">
            ☀️ Play nicely with everything in the sandbox. 🏖
          </Banner>
        )}
        <Card>
          <Checkbox
            checked={bannerIsVisible}
            label="Dark Mode?"
            onChange={setBannerIsVisible}
          />
        </Card>
      </Content>
    );
  }}
</Playground>
`;
  return result;
}
