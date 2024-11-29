import { transform } from "@babel/standalone";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Compartment, EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import {
  defaultHighlightStyle,
  syntaxHighlighting,
} from "@codemirror/language";

const language = new Compartment();

const AtlantisPreviewEditorContext = createContext<{
  iframe: React.RefObject<HTMLIFrameElement> | null;
  updateCode: (code: string) => void;
  code: string;
  error: string;
}>({ iframe: null, updateCode: () => ({}), code: "", error: "" });

export const useAtlantisPreview = () => {
  return useContext(AtlantisPreviewEditorContext);
};

export const AtlantisPreviewEditorProvider = ({
  children,
}: PropsWithChildren) => {
  const iframe = useRef<HTMLIFrameElement>(null);
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (iframe.current) {
      const doc = iframe.current.contentDocument;

      if (doc) {
        doc.open();
        doc.write(skeletonHTML);
        doc.close();
      }
    }
  }, [iframe?.current]);

  const updateCode = (codeUp: string) => {
    setCode(codeUp);

    try {
      const transpiledCode = transform(codeUp, {
        presets: [["env", { modules: false }], "react"],
      }).code;
      setError("");

      if (iframe.current) {
        const iframeWindow = iframe.current.contentWindow;

        if (iframeWindow) {
          const codeWrapper = `
            import React from 'react';
            import ReactDOM from 'react-dom/client';
            import {Button} from '@jobber/components';
            import {Chips} from '@jobber/components';
            import {Chip} from '@jobber/components';
            import {Content} from '@jobber/components';
            import {Text} from '@jobber/components';
            import "styles.css";
            import "foundation.css";
            function App(){
                return ${transpiledCode}
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
      }
    } catch (e) {
      setError(e.message as string);
    }
  };

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
          syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
          myTheme,
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
      <body>
 <script type="importmap">
  {
    "imports": {
      "@jobber/components": "/@fs/Users/scottthompson/workspace/atlantis/packages/components/dist/index.mjs",
      "styles.css": "/@fs/Users/scottthompson/workspace/atlantis/packages/components/dist/styles.css",
      "foundation.css": "/@fs/Users/scottthompson/workspace/atlantis/packages/design/dist/foundation.css",
      "react-dom": "/node_modules/.vite/deps/react-dom.js",
      "react-dom/client": "/node_modules/.vite/deps/react-dom_client.js",
      "react": "/node_modules/.vite/deps/react.js"
    }
  }
  </script>
      <div id="root">
      </div>
      <script>
        let root;
        let rootElement;
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
           // ReactDOM.unmountComponentAtNode(root);
            root.appendChild(script); // Inject new script
          }
        }
      });
      </script>
     
    
      </body>
      </html>`;
