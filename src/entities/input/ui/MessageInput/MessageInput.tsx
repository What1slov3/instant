import { useEffect, useMemo } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { emojiQuill } from '@entities/input/lib/Quill/emoji';
import { quillModules } from '@entities/input/lib/Quill';
import { shortcutInstance } from '../../../..';
import s from './messageinput.module.css';

Quill.register('modules/emoji', emojiQuill);

type Props = {
  placeholder?: string;
  onSend: () => void;
  inputRef: React.MutableRefObject<ReactQuill>;
};

export const MessageInput: React.FC<Props> = ({
  placeholder = 'Написать что-то...',
  onSend,
  inputRef,
}): JSX.Element => {
  useEffect(() => {
    inputRef.current.getEditor().root.dataset.placeholder = placeholder;
  }, [placeholder]);

  const modules = useMemo(() => {
    return quillModules;
  }, []);

  const keyDownHandler = (e: KeyboardEvent) => {
    if (!shortcutInstance.includes('Shift') && e.code === 'Enter') {
      onSend();
      inputRef.current.getEditor().setText('');
    }
  };

  return (
    <ReactQuill
      className={s.input}
      theme="bubble"
      data-message-input="true"
      ref={inputRef}
      onKeyDown={keyDownHandler}
      modules={modules}
    />
  );
};
