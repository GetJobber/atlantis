import { useEffect, useRef } from "react";
import { EditorView, lineNumbers } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import {
  defaultHighlightStyle,
  syntaxHighlighting,
} from "@codemirror/language";
import { Compartment, EditorState } from "@codemirror/state";
import { useAtlantisPreview } from "./AtlantisPreviewProvider";
import { useAtlantisPreviewCodeTheme } from "./useAtlantisPreviewCodeTheme";
import { CopyCodeButton } from "../components/CodeCopyButton";

const language = new Compartment();

export const AtlantisPreviewEditor = () => {
  const { code, updateCode, error, type } = useAtlantisPreview();

  const { atlantisPreviewCodeTheme } = useAtlantisPreviewCodeTheme();

  const editor = useRef(null);
  const editorView = useRef<EditorView | null>(null);

  useEffect(() => {
    // If the code has changed, but it's not equal to the editor's code, update the editor
    // This happens when we switch tabs
    // Check out the code mirror docs to see how the state is updated with a transaction.
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
    // If the DOM has mounted, but we have not yet initialized the editor.
    if (editor.current && !editorView.current) {
      // Basic CodeMirror setup with a custom theme, line numbers and syntax highlighting.
      const startState = EditorState.create({
        doc: code,
        extensions: [
          lineNumbers(),
          atlantisPreviewCodeTheme,
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
