import type { Root } from "mdast";
import type { VFile } from "vfile";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import type { ExportNamedDeclaration, ObjectExpression, Program } from "estree";

export interface TocItem {
  id: string;
  label: string;
}

export type RecmaVFile = VFile & {
  data: {
    toc?: TocItem[];
  } & VFile["data"];
};

/** Slugify heading text to match rehype-rewrite ids: component-view-<slug> */
function slugify(text: string): string {
  return text.replace(/\s+/g, "-").toLowerCase();
}

/**
 * Remark plugin: extracts H2 headings in the mdx file and stores them in file.data.toc. This data is then used by @recmaInjectToc to inject as a named export
 * This is allows us to get the table of contents data when we import the MDX file with:
 * import Docs, {  toc as docsToc, } from "someMDXFile.stories.mdx";
 */
export function remarkExtractToc() {
  return (tree: Root, file: VFile) => {
    const toc: TocItem[] = [];

    visit(tree, "heading", node => {
      if (node.depth !== 2) return;
      const label = toString(node).trim();
      if (!label) return;
      toc.push({
        id: "component-view-" + slugify(label),
        label,
      });
    });

    file.data.toc = toc;
  };
}

/**
 * Recma plugin: injects `export const toc = [...]` from file.data.toc so the
 * compiled MDX module exports a TOC for the sidebar.
 * Uses the mdx file that has been processed by remarkExtractToc to get the toc data.
 * It will then generate a named export called "toc" that is an array of objects with the id and label of each heading.
 * This is done by generating the estree nodes for the export declaration and adding it to the tree.
 */
export function recmaInjectToc() {
  return (tree: Program, file: RecmaVFile) => {
    const toc = file.data.toc;
    if (!toc || !Array.isArray(toc)) return;

    const tableOfContents = toc.map(
      item =>
        ({
          type: "ObjectExpression",
          properties: [
            {
              type: "Property",
              kind: "init",
              key: { type: "Identifier", name: "id" },
              value: {
                type: "Literal",
                value: item.id,
                raw: JSON.stringify(item.id),
              },
              method: false,
              shorthand: false,
              computed: false,
            },
            {
              type: "Property",
              kind: "init",
              key: { type: "Identifier", name: "label" },
              value: {
                type: "Literal",
                value: item.label,
                raw: JSON.stringify(item.label),
              },
              method: false,
              shorthand: false,
              computed: false,
            },
          ],
        } satisfies ObjectExpression),
    );

    const exportDecl: ExportNamedDeclaration = {
      type: "ExportNamedDeclaration",
      declaration: {
        type: "VariableDeclaration",
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            id: { type: "Identifier", name: "toc" },
            init: {
              type: "ArrayExpression",
              elements: tableOfContents,
            },
          },
        ],
      },
      specifiers: [],
      attributes: [],
      source: null,
    };

    tree.body.unshift(exportDecl);
  };
}
