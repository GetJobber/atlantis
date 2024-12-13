/**
 *
 * Atlantis Live Code Editor + Preview
 *
 * This file is currently a mess, and that's kind of okay. It's a work in progress.
 *
 * The goal of this file is to provide a live code editor and preview for the Atlantis design system.
 *
 * This huge comment will attempt to explain all that is happening in here so when we come back here in the new year we have a starting point.
 *
 * We're using Code Mirror for the editor, and a simple iframe for the preview.
 *
 * In the simplest terms:
 * Type in the Code Editor, we run the code through Babel to transpile it to browser-safe Javascript.
 * We then take that code, and ask the iframe if it's already been initialized.
 * If not, we initalize the iframe with our Skeleton HTML which is the same for both web and mobile (aside from the import maps which are flagged by a boolean)
 * Once the iframe is initalized (we use two iframes, one for mobile and one for web), we send the code to the iframe.
 * We send the code to the iframe via a postMessage event.
 *
 * The iframe then takes the code, and injects it into the DOM using React. We use properly unload -> reload mechanisms so we don't trigger errors in the browser.
 *
 *
 * Where this file could be improved:
 * 1. It should probably be more than one file, probably in its own section of this codebase. It's a bit more than just a 'Provider'
 * 2. All the pieces relating to the skeletong can probably live on their own
 * 3. The code editor and preview could be split into their own components
 * 4. The code wrappers could be cleaned up and moved to their own files.
 * 5. Clean up the useEffect usage. It's a bit of a mess.
 * 6. The error handling could be improved.
 * 7. The Preview Editor could be cleaned up a fair amount as well. We're interfacing with code mirror bluntly.
 * 8. The iframed COULD (maybe not though) be abstracted into its own component with attached hook functionality (update iframe, etc)
 */

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
import { Theme, useAtlantisTheme } from "@jobber/components";

const language = new Compartment();

const AtlantisPreviewEditorContext = createContext<{
  iframe: React.RefObject<HTMLIFrameElement> | null;
  iframeMobile: React.RefObject<HTMLIFrameElement> | null;
  updateCode: (code: string) => void;
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
    (codeUp: string) => {
      if (codeUp === code) {
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

        if (html === "<html><head></head><body></body></html>") {
          writeSkeleton(selectedFrame.current?.contentDocument, theme);
          selectedFrame?.current?.addEventListener("load", () => {
            if (selectedFrame.current) {
              const iframeDocument = selectedFrame.current.contentDocument;

              if (iframeDocument) {
                selectedFrame.current.style.height =
                  iframeDocument.body.scrollHeight + 60 + "px";
              }
            }
          });
        }

        if (selectedFrame.current) {
          const iframeWindow = selectedFrame.current.contentWindow;

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
  height: 100%;
  width: 99%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 200px;
}
  html[data-type="mobile"] {
  border-radius:10px;
}
</style>
<link rel="stylesheet" href="/styles.css">
<link rel="stylesheet" href="/foundation.css">
<link rel="stylesheet" href="/dark.mode.css">
</head>
      <body>
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
      console.log('ERROR',message, source, lineno, colno, error)
        window.parent.postMessage(JSON.stringify({message, source, lineno, colno, error}), '*')
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
