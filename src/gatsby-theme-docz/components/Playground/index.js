/* eslint-disable react/prop-types */
/* eslint-disable max-statements */
/* eslint-disable react/display-name */
/* eslint-disable import/no-extraneous-dependencies */
/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { useCallback, useState } from "react";
import { useConfig } from "docz";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import { Resizable } from "re-resizable";
import copy from "copy-text-to-clipboard";
import ReactResizeDetector from "react-resize-detector";
import { IframeWrapper } from "gatsby-theme-docz/src/components/Playground/IframeWrapper";
import { usePrismTheme } from "gatsby-theme-docz/src/utils/theme";
import * as Icons from "gatsby-theme-docz/src/components/Icons";
import * as styles from "./styles";

const getResizableProps = (width, setWidth) => ({
  minWidth: 260,
  maxWidth: "100vw - 100px",
  size: { width: 800, height: "auto" },
  style: { margin: "0 20px 0 0" },
  enable: { right: true },
  onResizeStop: (e, direction, ref) => setWidth(ref.style.width),
});

const transformCode = code => {
  if (code.startsWith("()") || code.startsWith("class")) return code;
  return `<React.Fragment>${code}</React.Fragment>`;
};

export const Playground = ({
  code,
  scope,
  language,
  isFullWidth = false,
  useScoping = false,
}) => {
  const {
    themeConfig: {
      showPlaygroundEditor,
      showLiveError,
      showLivePreview,
      useScopingInPlayground,
    },
  } = useConfig();

  // Makes sure scope is only given on mount to avoid infinite re-render on hot reloads
  const [scopeOnMount] = useState(scope);
  const [previewHeight, setPreviewHeight] = useState();
  const [editorHeight, setEditorHeight] = useState();
  const [showingCode, setShowingCode] = useState(showPlaygroundEditor);
  const [width, setWidth] = useState(400);
  const theme = usePrismTheme();
  const resizableProps = getResizableProps(width, setWidth);

  const copyCode = () => copy(code);
  const toggleCode = () => setShowingCode(s => !s);

  const Wrapper = useCallback(
    useScoping || useScopingInPlayground
      ? props => <IframeWrapper {...props}>{props.children}</IframeWrapper>
      : props => (
          <Box sx={styles.previewInner(showingCode)}>{props.children}</Box>
        ),
    [useScoping],
  );

  return (
    <Box sx={styles.wrapper(isFullWidth)}>
      <Resizable {...resizableProps} data-testid="playground">
        <LiveProvider
          code={code}
          scope={scopeOnMount}
          transformCode={transformCode}
          language={language}
          theme={theme}
        >
          <Box sx={styles.previewWrapper}>
            <Wrapper height={previewHeight}>
              {showLivePreview && (
                <LivePreview sx={styles.preview} data-testid="live-preview" />
              )}
              <ReactResizeDetector
                handleHeight
                onResize={({ height }) => setPreviewHeight(height)}
              />
            </Wrapper>
            <Box sx={styles.buttons}>
              <button sx={styles.button} onClick={copyCode}>
                <Icons.Clipboard size={12} />
              </button>
              <button sx={styles.button} onClick={toggleCode}>
                <Icons.Code size={12} />
              </button>
            </Box>
          </Box>
          {showingCode && (
            <Wrapper height={editorHeight}>
              <Box sx={styles.editor(theme)}>
                <LiveEditor data-testid="live-editor" />
              </Box>
              <ReactResizeDetector
                handleHeight
                onResize={({ height }) => setEditorHeight(height)}
              />
            </Wrapper>
          )}
          {showLiveError && (
            <LiveError sx={styles.error} data-testid="live-error" />
          )}
        </LiveProvider>
      </Resizable>
    </Box>
  );
};
