import Quill from 'quill';
import { MutableRefObject } from 'react';
import ReactQuill from 'react-quill';

export function quillGetText(editor: Quill | MutableRefObject<ReactQuill>) {
  const text = editor instanceof Quill ? editor.getText() : editor.current.getEditor().getText();
  return text.slice(0, text.length - 1);
}
