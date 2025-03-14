import Quill from 'quill';
import Delta from 'quill-delta';
import ReactQuill from 'react-quill';

const isQuillRef = (quill: unknown): quill is React.MutableRefObject<ReactQuill> => {
  return quill?.hasOwnProperty('current') ?? false;
};

export function quillGetText(editor: Quill | React.MutableRefObject<ReactQuill>) {
  const text = isQuillRef(editor) ? editor.current.getEditor().getText() : editor.getText();
  return text.slice(0, text.length - 1);
}

export const setEmojiInQuill = (editor: Quill | React.MutableRefObject<ReactQuill>, emoji: string) => {
  editor = isQuillRef(editor) ? editor.current.getEditor() : editor;
  editor.focus();
  const selection = editor.getSelection()?.index;

  editor.updateContents(
    new Delta().retain(typeof selection === 'number' ? selection : editor.getLength() - 1).insert(emoji),
    'user'
  );

  if (typeof selection === 'number') {
    editor.setSelection(selection + 2, 0);
  }
};
