import { useCallback, useRef } from 'react';
import classNames from 'classnames';
import { SendMessageInput } from '@features/message/send-message';
import { useGlobalListener, useMultipleUploadAndProcessingImages } from '@shared/hooks';
import { CONSTANTS } from '@shared/config';
import { AttachmentInput, AttachmentsPreview } from '@entities/attachment';
import { EmojiPicker } from '@features/emoji/pick-emoji';
import { setEmojiInQuill } from '@entities/input';
import type ReactQuill from 'react-quill';
import type { Connection } from '@shared/types';
import s from './sendmessagewidget.module.css';

type Props = {
  connection: Connection;
  placeholder: string;
};

export const MessageInputWidget: React.FC<Props> = ({ connection, placeholder }): JSX.Element => {
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

  const setEmoji = useCallback((emoji: string) => {
    setEmojiInQuill(inputRef, emoji);
  }, []);

  const handleSend = () => {
    resetImages();
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
        <SendMessageInput
          connection={connection}
          attachments={imageObjects}
          onSend={handleSend}
          inputRef={inputRef}
          placeholder={placeholder}
        />
        <EmojiPicker setEmoji={setEmoji} />
      </div>
    </div>
  );
};
