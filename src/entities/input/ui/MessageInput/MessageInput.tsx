import { useEffect, useMemo } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { emojiQuill } from '@entities/input/lib/Quill/emoji';
import { quillModules } from '@entities/input/lib/Quill';
import { ShortcutInstance } from '../../../..';
import 'react-quill/dist/quill.bubble.css';
import s from './messageinput.module.css';

Quill.register('modules/emoji', emojiQuill);

type Props = {
  placeholder?: string;
  onSend: () => void;
  inputRef: React.MutableRefObject<ReactQuill>;
  ControlPanel?: React.ReactNode;
};

export const MessageInput: React.FC<Props> = ({
  placeholder = 'Написать что-то...',
  onSend,
  inputRef,
  ControlPanel,
}): JSX.Element => {
  useEffect(() => {
    inputRef.current.getEditor().root.dataset.placeholder = placeholder;
  }, [placeholder]);

  const modules = useMemo(() => quillModules, []);

  const keyDownHandler = (e: KeyboardEvent) => {
    if (!ShortcutInstance.includes('Shift') && e.code === 'Enter') {
      onSend();
      inputRef.current.getEditor().setText('');
    }
  };

  return (
    <div className={s.wrapper}>
      <ReactQuill
        className={s.input}
        theme="bubble"
        data-message-input="true"
        ref={inputRef}
        onKeyDown={keyDownHandler}
        modules={modules}
      />
      {ControlPanel}
    </div>
  );
};
