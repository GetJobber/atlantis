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
  updateCode: (code: string) => void;
  code: string;
  error: string;
}>({
  iframe: null,
  updateCode: () => ({}),
  code: "",
  error: "",
});

export const useAtlantisPreview = () => {
  return useContext(AtlantisPreviewEditorContext);
};

export const AtlantisPreviewEditorProvider = ({
  children,
}: PropsWithChildren) => {
  const iframe = useRef<HTMLIFrameElement>(null);
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  const writeSkeleton = (doc: Document | null | undefined) => {
    if (doc) {
      doc.open();
      doc.write(skeletonHTML);
      doc.close();
    }
  };
  const updateCode = useCallback(
    // eslint-disable-next-line max-statements
    (codeUp: string) => {
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
        const html = iframe.current?.contentDocument?.documentElement.outerHTML;

        if (html === "<html><head></head><body></body></html>") {
          writeSkeleton(iframe.current?.contentDocument);
        }

        if (iframe.current) {
          const iframeWindow = iframe.current.contentWindow;

          if (iframeWindow) {
            const codeWrapper = `
            import {
              AnimatedPresence,
              AnimatedSwitcher,
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
              Content,
              Combobox,
              ConfirmationModal,
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
              ReactDOM
            } from '@jobber/components';

                ${transpiledCode}


          if (rootElement) {
              ReactDOM.unmountComponentAtNode(rootElement);
            }
             if(!rootElement){
              rootElement = document.getElementById('root')
              root = ReactDOM.createRoot(rootElement);
             }
              root.render(React.createElement(App, null));
          `;
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
    [iframe],
  );

  return (
    <AtlantisPreviewEditorContext.Provider
      value={{ iframe, updateCode, code, error }}
    >
      {children}
    </AtlantisPreviewEditorContext.Provider>
  );
};

export const AtlantisPreviewViewer = () => {
  const { iframe } = useAtlantisPreview();

  return <iframe style={{ border: "none", height: "100%" }} ref={iframe} />;
};
const myTheme = EditorView.theme(
  {
    "&": {
      color: "var(--color-text)",
      backgroundColor: "var(--color-surface--background)",
    },
    ".cm-content": {
      caretColor: "var(--color-brand--highlight)",
    },

    "&.cm-focused .cm-selectionBackground, ::selection": {
      backgroundColor: "var(--color-white)",
    },
    ".cm-gutters": {
      backgroundColor: "#045",
      color: "#ddd",
      border: "none",
    },
  },
  { dark: true },
);

export const AtlantisPreviewEditor = () => {
  const { code, updateCode, error } = useAtlantisPreview();
  const editor = useRef(null);
  const editorView = useRef<EditorView | null>(null);

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
    }

    return () => {
      if (editorView.current) {
        editorView.current.destroy();
        editorView.current = null;
      }
    };
  }, [editor, editorView]);

  return (
    <div>
      <div ref={editor}></div>
      {error}
    </div>
  );
};

const skeletonHTML = `

<!DOCTYPE html>
<html>
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
</style>
<link rel="stylesheet" href="/styles.css">
<link rel="stylesheet" href="/foundation.css">
</head>
      <body>
 <script type="importmap">
  {
    "imports": {
      "@jobber/components": "/editorBundle.js",
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
        if (message !== 'Uncaught ReferenceError: TritonExample is not defined'){
          console.log('An error occurred:', message);
        }
        window.parent.postMessage(JSON.stringify({message, source, lineno, colno, error}), '*')
        return true;
      };
      window.addEventListener('message', (event) => {
        const { type, code } = event.data;
        if (type === 'updateCode') {
          const script = document.createElement('script');
          script.type = 'module';
          script.textContent = code;
          const root = document.getElementById('root');
          if (root) {
            root.appendChild(script); // Inject new script
          }
        }
      });
      </script>


      </body>
      </html>`;
