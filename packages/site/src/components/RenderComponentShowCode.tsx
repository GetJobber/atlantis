import { Box, Button, Card } from "@jobber/components";
import reactElementToJSXString from "react-element-to-jsx-string";
import {
  Children,
  PropsWithChildren,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import prism from "prismjs";
import { useStorybookSourceContext } from "./StorybookSourceContext";

let designDocsPromise:
  | Promise<Record<string, { readonly content: string }>>
  | undefined;

function getDesignDocs() {
  if (!designDocsPromise) {
    designDocsPromise = fetch("/staticContent/designDocs.json").then(
      response => {
        if (!response.ok) {
          throw new Error("Failed to load design docs source");
        }

        return response.json() as Promise<
          Record<string, { readonly content: string }>
        >;
      },
    );
  }

  return designDocsPromise;
}

function getComponentName(children: ReactNode) {
  const firstChild = Children.toArray(children)[0];

  if (
    firstChild &&
    typeof firstChild === "object" &&
    "type" in firstChild &&
    typeof firstChild.type === "function"
  ) {
    return (firstChild.type.name || "Anonymous").replace(/\$\d*$/g, "");
  }

  return undefined;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractExportByName(content: string, exportName: string) {
  const exportRegex = new RegExp(
    `^export const ${escapeRegExp(
      exportName,
    )}\\s*=\\s*[\\s\\S]*?(?=^<Canvas\\b|^export const\\s|\\Z)`,
    "m",
  );
  const match = exportRegex.exec(content);

  return match?.[0].trimEnd();
}

/**
 * This is a drop-in replacement for the <Canvas> component from Storybook. It renders the component as provided, and then shows the code for that component.
 * @param param0 {children:ReactNode}
 * @returns ReactNode
 */
export const RenderComponentShowCode = ({
  children,
  code: providedCode,
}: PropsWithChildren<{ readonly code?: string }>) => {
  const [codeVisible, setCodeVisible] = useState(false);
  const [extractedCode, setExtractedCode] = useState<string>();
  const { mdxPath } = useStorybookSourceContext();
  const componentName = useMemo(() => getComponentName(children), [children]);

  const showCode = () => {
    setCodeVisible(!codeVisible);
  };

  useEffect(() => {
    if (providedCode || !mdxPath || !componentName) {
      setExtractedCode(undefined);

      return;
    }

    let active = true;

    getDesignDocs()
      .then(designDocs => {
        const rawContent = designDocs[mdxPath]?.content;
        const nextCode =
          rawContent && extractExportByName(rawContent, componentName);

        if (active) {
          setExtractedCode(nextCode);
        }
      })
      .catch(() => {
        if (active) {
          setExtractedCode(undefined);
        }
      });

    return () => {
      active = false;
    };
  }, [componentName, mdxPath, providedCode]);

  const code =
    providedCode ||
    extractedCode ||
    Children.map(children, child => {
      return reactElementToJSXString(child, {
        displayName: e => {
          if (e && typeof e === "object" && "type" in e) {
            if (typeof e.type === "function") {
              return (e.type.name || "Anonymous").replace(/\$\d*$/g, "");
            }
          }

          return "Anonymous";
        },
      });
    });
  useEffect(() => {
    prism.highlightAll();
  }, [code]);

  return (
    <Card>
      <Box padding={"largest"} direction="column" alignItems="start">
        {children}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
          }}
        >
          <Button
            type="tertiary"
            size="small"
            variation="subtle"
            label={codeVisible ? "Hide Code" : "Show Code"}
            onClick={showCode}
          />
        </div>
      </Box>
      {codeVisible && (
        <pre>
          <code className="language-javascript">{code}</code>
        </pre>
      )}
    </Card>
  );
};
