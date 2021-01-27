/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { useState } from "react";
import { useConfig } from "docz";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import { Resizable } from "re-resizable";
// @ts-expect-error
import { usePrismTheme } from "gatsby-theme-docz/src/utils/theme";
import * as styles from "./styles";

interface PlaygroundProps {
  readonly code: string;
  readonly scope: Record<string, any>;
  /**
   * The language prop type comes from deep within dependecies,
   * instead of adding to peerDependecies, I have chosen to any
   * it for the time being
   */
  readonly language: any;
}

export function Playground({ code, scope, language }: PlaygroundProps) {
  const {
    themeConfig: { showLiveError, containerWidth, sideBarWidth },
  } = useConfig();

  // Makes sure scope is only given on mount to avoid infinite re-render on hot reloads
  const [scopeOnMount] = useState(scope);
  const theme = usePrismTheme();
  const [width, setWidth] = useState(containerWidth);
  const resizableProps = getResizableProps();

  return (
    <Box sx={styles.playground(containerWidth, sideBarWidth)}>
      <Resizable {...resizableProps} data-testid="playground">
        <LiveProvider
          code={code}
          scope={scopeOnMount}
          transformCode={transformCode}
          language={language}
          theme={theme}
        >
          <Box>
            <LivePreview sx={styles.preview} />
          </Box>

          <Box sx={styles.editor}>
            <LiveEditor data-testid="live-editor" />
          </Box>

          {showLiveError && <LiveError sx={styles.error} />}
        </LiveProvider>
      </Resizable>
    </Box>
  );

  function getResizableProps() {
    return {
      minWidth: 260,
      maxWidth: "100%",
      size: { width: width, height: "auto" },
      style: { margin: "0 auto" },
      enable: { right: true },
      onResizeStop: (e: Event, direction: string, ref: any) =>
        setWidth(ref.style.width),
    };
  }
}

function transformCode(code: string) {
  if (code.startsWith("()") || code.startsWith("class")) {
    return code;
  }
  return `<React.Fragment>${code}</React.Fragment>`;
}
