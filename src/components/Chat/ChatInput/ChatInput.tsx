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
import AttachmentInput from '@components/Attachments/AttachmentInput/AttachmentInput';
import AttachmentsPreview from '@components/Attachments/AttachmentsPreview/AttachmentsPreview';
import { useGlobalListener, useMultipleUploadAndProcessingImages } from '@common/hooks';
import CONSTANTS from '@common/constants';
import type { Connection } from '@customTypes/index';
import type { DeltaStatic } from 'quill';
import s from './chatinput.module.css';

type Props = {
  placeholder?: string;
  connection: Connection;
};

const MessageInput: React.FC<Props> = ({ placeholder, connection }): JSX.Element => {
  const disptach = useDispatch<any>();

  const {
    imageObjects,
    handlers,
    error,
    reset: resetImages,
    processUpload,
  } = useMultipleUploadAndProcessingImages(CONSTANTS.MAX_ATTACHMENTS_COUNT);

  const inputRef = useRef<ReactQuill>(null!);
  const dragEventCountRef = useRef<number>(0);

  useGlobalListener(
    'paste',
    true,
    (e) => {
      processUpload(e.clipboardData!.files);
    },
    []
  );

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
    const text = quillGetText(inputRef).trim();
    const attachments = {
      files: imageObjects.map((imageObject) => imageObject.url),
    };

    if (text || attachments.files.length) {
      disptach(
        thunkSendMessage({
          content: {
            text,
            attachments,
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
      resetImages();
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    dragEventCountRef.current += 1;
    if (dragEventCountRef.current) {
      e.currentTarget.classList.add(s.isDragover);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    dragEventCountRef.current -= 1;
    if (!dragEventCountRef.current) {
      e.currentTarget.classList.remove(s.isDragover);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    dragEventCountRef.current = 0;
    e.currentTarget.classList.remove(s.isDragover);
    handlers.dropHandler(e);
  };

  const handleDragOver = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div
      className={s.wrapper}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <AttachmentsPreview imageObjects={imageObjects} deleteHandler={handlers.deleteHandler} error={error} />
      <div className={classNames(s.messageInput, 'flex flexjcsb')}>
        <AttachmentInput handlers={handlers} />
        <ReactQuill
          className={s.input}
          theme="bubble"
          data-message-input="true"
          ref={inputRef}
          // onChange={(e, delta) => console.log(delta)}
          onKeyDown={keyDownHandler}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // value={value}
          modules={memoModules}
        />
        <Emoji emojiSetter={emojiSetter} />
      </div>
    </div>
  );
};

export default MessageInput;
