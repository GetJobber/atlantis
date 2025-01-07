import { transform } from "@babel/standalone";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Compartment, EditorState } from "@codemirror/state";
import { EditorView, lineNumbers } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import {
  defaultHighlightStyle,
  syntaxHighlighting,
} from "@codemirror/language";
import {
  Button,
  Theme,
  Tooltip,
  showToast,
  useAtlantisTheme,
} from "@jobber/components";

/***
 *
 *
 *
 * This code has not yet been documented or tested.
 * It will be done early next week. I just need a break from it.
 *
 *
 *
 *
 */

const language = new Compartment();

const AtlantisPreviewEditorContext = createContext<{
  iframe: React.RefObject<HTMLIFrameElement> | null;
  iframeMobile: React.RefObject<HTMLIFrameElement> | null;
  updateCode: (code: string, forceUpdate?: boolean) => void;
  code: string;
  error: string;
  type: "web" | "mobile";
  updateType: (value: "web" | "mobile") => void;
}>({
  iframe: null,
  iframeMobile: null,
  updateCode: () => ({}),
  code: "",
  error: "",
  type: "web",
  updateType: () => ({}),
});

export const useAtlantisPreview = () => {
  return useContext(AtlantisPreviewEditorContext);
};

export const AtlantisPreviewEditorProvider = ({
  children,
}: PropsWithChildren) => {
  const { theme } = useAtlantisTheme();
  const iframe = useRef<HTMLIFrameElement>(null);
  const iframeMobile = useRef<HTMLIFrameElement>(null);

  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [type, setType] = useState<"web" | "mobile">(
    new URLSearchParams(window.location.search)?.has("mobile")
      ? "mobile"
      : "web",
  );

  const writeSkeleton = (
    doc: Document | null | undefined,
    iframeTheme: Theme,
  ) => {
    if (doc) {
      doc.open();
      doc.write(skeletonHTML(iframeTheme, type));
      doc.close();
    }
  };

  const updateType = (value: "web" | "mobile") => {
    setType(value);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${value === "mobile" ? "mobile" : ""}`,
    );
  };
  const updateCode = useCallback(
    // eslint-disable-next-line max-statements
    (codeUp: string, forceUpdate?: boolean) => {
      if (codeUp === code && !forceUpdate) {
        return;
      }
      setCode(codeUp);

      try {
        const preCode = !codeUp.includes("return ")
          ? `return ${codeUp}`
          : codeUp;
        const transpiledCode = transform(`function App(props){${preCode}}`, {
          presets: [["env", { modules: false }], "react"],
          plugins: [
            ["transform-typescript", { isTSX: true, allExtensions: false }],
          ],
        }).code;
        setError("");
        const selectedFrame = type == "web" ? iframe : iframeMobile;

        const html =
          selectedFrame.current?.contentDocument?.documentElement.outerHTML;

        const updateIframeCode = (currentFrame: HTMLIFrameElement) => {
          const iframeWindow = currentFrame.contentWindow;

          if (iframeWindow) {
            const codeWrapper =
              type == "web"
                ? WebCodeWrapper(transpiledCode)
                : MobileCodeWrapper(transpiledCode);
            iframeWindow.postMessage(
              { type: "updateCode", code: codeWrapper },
              "*",
            );
          }
        };

        if (html === "<html><head></head><body></body></html>") {
          writeSkeleton(selectedFrame.current?.contentDocument, theme);
          selectedFrame?.current?.addEventListener("load", () => {
            if (selectedFrame.current) {
              const iframeDocument = selectedFrame.current.contentDocument;

              if (iframeDocument) {
                selectedFrame.current.style.height =
                  iframeDocument.body.scrollHeight + 60 + "px";
              }
              updateIframeCode(selectedFrame.current);
            }
          });
        } else if (selectedFrame.current) {
          updateIframeCode(selectedFrame.current);
        } else {
          console.log("tried to update iframe");
        }
      } catch (e) {
        setError((e as { message: string }).message as string);
      }
    },
    [iframe, iframeMobile, theme, type],
  );

  useEffect(() => {
    if (iframe.current) {
      const iframeWindow = iframe.current.contentWindow;
      iframeWindow?.postMessage({ type: "updateTheme", theme }, "*");
    }
  }, [theme]);

  return (
    <AtlantisPreviewEditorContext.Provider
      value={{
        iframe,
        iframeMobile,
        updateCode,
        code,
        error,
        type,
        updateType,
      }}
    >
      {children}
    </AtlantisPreviewEditorContext.Provider>
  );
};

export const AtlantisPreviewViewer = () => {
  const { iframe, iframeMobile, type } = useAtlantisPreview();

  return (
    <>
      <iframe
        style={{
          border: "none",
          display: type == "web" ? "block" : "none",
        }}
        ref={iframe}
      />
      <iframe
        style={{
          border: "none",
          display: type == "mobile" ? "block" : "none",
          borderRadius: "var(--radius-base)",
        }}
        ref={iframeMobile}
      />
    </>
  );
};
const myTheme = EditorView.theme(
  {
    "&": {
      color: "var(--color-text)",
      backgroundColor: "var(--color-surface--background)",
      border: "var(--border-base) solid var(--color-border)",
      borderRadius: "var(--radius-base)",
      padding: "var(--space-small)",
    },
    ".ͼi": {
      color: "var(--color-interactive)",
    },
    ".ͼe": {
      color: "var(--color-critical)",
    },
    ".ͼl": {
      color: "var(--color-invoice)",
    },
    ".ͼb": {
      color: "var(--color-quote)",
    },
    ".ͼg": {
      color: "var(--color-task)",
    },
    ".ͼd": {
      color: "var(--color-informative)",
    },
    ".ͼc": {
      color: "var(--color-informative)",
    },
    ".cm-content": {
      caretColor: "var(--color-interactive)",
    },
    ".cm-type": {
      color: "var(--color-text)",
    },
    "&.cm-focused": {
      outline: "transparent",
      boxShadow: "var(--shadow-focus)",
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
      backgroundColor: "var(--color-surface)",
    },
    ".cm-gutters": {
      backgroundColor: "inherit",
      color: "var(--color-text--secondary)",
      border: "none",
    },
  },
  { dark: true },
);

function CopyCodeButton({ code }: { readonly code: string }) {
  return (
    <div style={{ position: "absolute", bottom: "10px", right: "3px" }}>
      <Tooltip message="Copy code to clipboard">
        <Button
          ariaLabel="Copy"
          icon="copy"
          type="secondary"
          variation="subtle"
          size="small"
          onClick={() => {
            navigator.clipboard.writeText(code);
            showToast({
              message: "Copied code to clipboard",
            });
          }}
        ></Button>
      </Tooltip>
    </div>
  );
}

export const AtlantisPreviewEditor = () => {
  const { code, updateCode, error, type } = useAtlantisPreview();
  const editor = useRef(null);
  const editorView = useRef<EditorView | null>(null);
  useEffect(() => {
    if (code && editorView.current?.state.doc.toString() !== code) {
      const transaction = editorView.current?.state.update({
        changes: {
          from: 0,
          to: editorView.current.state.doc.length,
          insert: code,
        },
      });

      if (transaction) {
        editorView.current?.dispatch(transaction);
      }
    }
  }, [type, code]);

  useEffect(() => {
    if (editor.current && !editorView.current) {
      const startState = EditorState.create({
        doc: code,
        extensions: [
          lineNumbers(),
          myTheme,
          syntaxHighlighting(defaultHighlightStyle, { fallback: true }),

          language.of(javascript({ jsx: true, typescript: true })),
          EditorView.updateListener.of(update => {
            if (update.docChanged) {
              updateCode(update.state.doc.toString());
            }
          }),
        ],
      });
      editorView.current = new EditorView({
        state: startState,
        parent: editor.current,
      });
      editorView.current.dispatch({});
    }

    return () => {
      if (editorView.current) {
        editorView.current.destroy();
        editorView.current = null;
      }
    };
  }, [editor, editorView, type]);

  return (
    <div>
      <div ref={editor}></div>
      <CopyCodeButton code={code} />
      {error}
    </div>
  );
};

const skeletonHTML = (theme: Theme, type: "web" | "mobile") => {
  const imports =
    type == "mobile"
      ? `
      "@jobber/hooks":"/editorMobileBundle.js",
      "@jobber/hooks/useIsMounted":"/editorMobileBundle.js",
      "@jobber/components-native":"/editorMobileBundle.js",
      `
      : `
         "@jobber/hooks":"/editorBundle.js",
         "@jobber/hooks/useIsMounted":"/editorBundle.js",
      "@jobber/components":"/editorBundle.js",
      `;

  return `

<!DOCTYPE html>
<html data-theme="${type === "web" ? theme : "light"}" data-type="${type}">
<head>
<style>
html,body,#root {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 280px;
  margin: 0;
  padding: var(--space-smallest);
}
  html[data-type="mobile"] {
  border-radius: var(--radius-base);
}
</style>
<link rel="stylesheet" href="/styles.css">
<link rel="stylesheet" href="/foundation.css">
<link rel="stylesheet" href="/dark.mode.css">
</head>
      <body style="background-color: transparent;">
 <script type="importmap">
  {
    "imports": {
      ${imports}
      "axios": "/axios.js"
    }
  }
  </script>
      <div id="root">
      </div>
      <script>
        var root;
        var rootElement;
      </script>
      <script>
      window.onerror = function(message, source, lineno, colno, error) {
        console.log('ERROR', message, source, lineno, colno, error);
        window.parent.postMessage(JSON.stringify({ message, source, lineno, colno, error }), '*');
        return true;
      };
      window.addEventListener('message', (event) => {
        const { type, code, theme } = event.data;
        if (type === 'updateCode') {
          const script = document.createElement('script');
          script.type = 'module';
          script.textContent = code;
          const root = document.getElementById('root');
          if (root) {
            root.appendChild(script); // Inject new script
          }
        } else if (type === 'updateTheme') {
          document.documentElement.dataset.theme = theme;
        }
      });
      </script>


      </body>
      </html>`;
};
export const WebCodeWrapper = (transpiledCode: string | null | undefined) => `
            import {
              AnimatedPresence,
              AnimatedSwitcher,
              AtlantisThemeContextProvider,
              Autocomplete,
              Avatar,
              Banner,
              Box,
              Button,
              ButtonDismiss,
              Card,
              Checkbox,
              Chip,
              Chips,
              Combobox,
              ConfirmationModal,
              Content,
              Countdown,
              DataDump,
              DataList,
              DataTable,
              DatePicker,
              DescriptionList,
              Disclosure,
              Divider,
              Drawer,
              DrawerGrid,
              DurationPeriod,
              Emphasis,
              FeatureSwitch,
              Flex,
              Form,
              FormatDate,
              FormatEmail,
              FormatFile,
              FormatRelativeDateTime,
              FormatTime,
              FormField,
              Gallery,
              Glimmer,
              Grid,
              Heading,
              Icon,
              InlineLabel,
              InputAvatar,
              InputDate,
              InputEmail,
              InputFile,
              InputGroup,
              InputNumber,
              InputPassword,
              InputPhoneNumber,
              InputText,
              InputTime,
              InputValidation,
              LightBox,
              Link,
              List,
              Markdown,
              Menu,
              Modal,
              MultiSelect,
              Option,
              Page,
              Popover,
              ProgressBar,
              RadioGroup,
              RadioOption,
              RecurringSelect,
              SegmentedControl,
              Select,
              SideDrawer,
              Spinner,
              StatusIndicator,
              StatusLabel,
              Switch,
              Table,
              Header,
              Cell,
              Body,
              Row,
              CellCurrency,
              CellNumeric,
              Footer,
              Tabs,
              Tab,
              Text,
              Toast,
              showToast,
              Tooltip,
              Typography,
              useState,
              useFormState,
              useRef,
              useEffect,
              ReactDOM,
              React
            } from '@jobber/components';
                ${transpiledCode}

            function RootWrapper() {
              return React.createElement(AtlantisThemeContextProvider, null, React.createElement(App));
            }

          if (rootElement) {
              ReactDOM.unmountComponentAtNode(rootElement);
            }
             if(!rootElement){
              rootElement = document.getElementById('root')
              root = ReactDOM.createRoot(rootElement);
             }
              root.render(React.createElement(RootWrapper, null));
          `;

export const MobileCodeWrapper = (
  transpiledCode: string | null | undefined,
) => `
            import {
              ActionItem,
              ActionItemGroup,
              ActionLabel,
              ActivityIndicator,
              AutoLink,
              Banner,
              BottomSheet,
              BottomSheetOption,
              Button,
              ButtonGroup,
              Card,
              Content,
              Checkbox,
              Chip,
              ContentOverlay,
              Disclosure,
              Divider,
              EmptyState,
              Flex,
              Icon,
              StatusLabel,
              Glimmer,
              Heading,
              IconButton,
              Form,
              FormField,
              FormatFile,
              InputCurrency,
              InputDate,
              InputEmail,
              InputFieldWrapper,
              InputNumber,
              InputPassword,
              InputPressable,
              InputSearch,
              InputText,
              Menu,
              ProgressBar,
              Select,
              Option,
              Switch,
              Text,
              TextList,
              ThumbnailList,
              Toast,
              showToast,
              Typography,
              useState,
              forwardRef,
              useEffect,
              useRef,
              Host,
              View,
            } from '@jobber/components-native';
                ${transpiledCode}

            function RootWrapper() {
              return React.createElement(Host, {style:{display:'flex',alignItems:'center',justifyContent:'center', width:'100%'}}, React.createElement(App));
            }

            function IntlWrapper() {
              return React.createElement(IntlProvider, {locale: 'en'}, React.createElement(RootWrapper));
            }

          if (rootElement) {
            //  ReactDOM.unmountComponentAtNode(rootElement);
            }
             if(!rootElement){
              rootElement = document.getElementById('root')
              root = ReactDOM.createRoot(rootElement);
             }
              root.render(React.createElement(IntlWrapper, null));
          `;
