import { parse } from 'react-docgen-typescript';
import { writeFileSync } from 'fs';

const parseAndWriteDocs = (componentPath, outputPath) => {
  console.log('parsing component at:',componentPath)
  const documentation = parse(componentPath);
  console.log('writing documentation to:',outputPath)
  writeFileSync(
    outputPath,
    JSON.stringify(documentation, null),
  );
}

const buildPaths = (baseComponentDir, baseOutputDir, componentName) => {
  const componentPath = `${baseComponentDir}/${componentName}/${componentName}.tsx`;
  const outputPath = `${baseOutputDir}/${componentName}/${componentName}.props.json`;
  return { componentPath, outputPath };
}

const baseComponentDir = `../components/src`;
const baseOutputDir = './src/content';

const buildComponentDocs = (name) => {

  const { componentPath, outputPath } = buildPaths(baseComponentDir, baseOutputDir, name);
  parseAndWriteDocs(componentPath, outputPath)
}

buildComponentDocs('Button');
buildComponentDocs('Chip');
buildComponentDocs('StatusLabel');
