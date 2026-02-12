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
 * Remark plugin: extracts H2 headings and stores them in file.data.toc for the
 * recma plugin to inject as a named export (so the compiled MDX exports toc for the sidebar).
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
