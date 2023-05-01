import Quill from 'quill';
import Delta from 'quill-delta';
import type { DeltaStatic } from 'quill';
import ReactQuill from 'react-quill';

export function quillGetText(editor: Quill | React.MutableRefObject<ReactQuill>) {
  const text = editor instanceof Quill ? editor.getText() : editor.current.getEditor().getText();
  return text.slice(0, text.length - 1);
}

export const setEmojiInQuill = (editor: Quill | React.MutableRefObject<ReactQuill>, emoji: string) => {
  editor = editor instanceof Quill ? editor : editor.current.getEditor();
  editor.focus();
  const selection = editor.getSelection()?.index;

  editor.updateContents(
    new Delta()
      .retain(typeof selection === 'number' ? selection : editor.getLength() - 1)
      .insert(emoji) as unknown as DeltaStatic,
    'user'
  );

  if (typeof selection === 'number') {
    editor.setSelection(selection + 2, 0);
  }
};
