import { useCallback, useEffect, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import classNames from 'classnames';
import Delta from 'quill-delta';
import { useDispatch } from 'react-redux';
import 'react-quill/dist/quill.bubble.css';
import Emoji from '@components/Emoji/Emoji';
import { thunkSendMessage } from '@state/index';
import { quillGetText, quillModules } from '@common/Quill';
import { shortcutInstance } from '../../..';
import type { Connection } from '@customTypes/index';
import type { DeltaStatic } from 'quill';
import s from './chatinput.module.css';

type Props = {
  placeholder?: string;
  connection: Connection;
};

const MessageInput: React.FC<Props> = ({ placeholder, connection }): JSX.Element => {
  const disptach = useDispatch<any>();

  const inputRef = useRef<ReactQuill>(null!);

  useEffect(() => {
    inputRef.current.getEditor().root.dataset.placeholder = placeholder || 'Написать что-то...';
  }, [placeholder]);

  const memoModules = useMemo(() => {
    return quillModules;
  }, []);

  const emojiSetter = useCallback((emoji: string) => {
    const editor = inputRef.current.getEditor();
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
  }, []);

  const send = () => {
    const messageText = quillGetText(inputRef).trim();
    if (messageText) {
      disptach(
        thunkSendMessage({
          content: {
            text: messageText,
          },
          context: {
            channelId: connection.channelId!,
            chatId: connection.chatId!,
          },
        })
      );
    }
  };

  const keyDownHandler = (e: KeyboardEvent) => {
    if (!shortcutInstance.includes('Shift') && e.code === 'Enter') {
      send();
      inputRef.current.getEditor().setText('');
    }
  };

  return (
    <div className={classNames(s.messageInput, 'flex flexjcsb')}>
      <i className={classNames(s.attachment, 'fa-solid fa-paperclip')}></i>
      <ReactQuill
        className={s.input}
        theme="bubble"
        data-message-input="true"
        ref={inputRef}
        // onChange={handleChange}
        onKeyDown={keyDownHandler}
        // onFocus={onFocus}
        // onBlur={onBlur}
        // value={value}
        modules={memoModules}
      />
      <Emoji emojiSetter={emojiSetter} />
    </div>
  );
};

export default MessageInput;
