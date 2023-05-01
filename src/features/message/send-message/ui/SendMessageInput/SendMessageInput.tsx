import { effects } from '../../model/effects';
import { MessageInput, quillGetText } from '@entities/input';
import type ReactQuill from 'react-quill';
import type { Connection } from '@shared/types';
import type { ImageObject } from '@shared/hooks';

type Props = {
  connection: Connection;
  attachments: ImageObject[];
  onSend: () => void;
  inputRef: React.MutableRefObject<ReactQuill>;
  placeholder: string;
};

export const SendMessageInput: React.FC<Props> = ({
  connection,
  attachments,
  onSend,
  inputRef,
  placeholder,
}): JSX.Element => {
  const handleSend = () => {
    const text = quillGetText(inputRef).trim();
    const processedAttachments = {
      files: attachments.map((imageObject) => imageObject.url),
    };

    if (text || processedAttachments.files.length) {
      effects.sendMessage(connection, text, processedAttachments);
      onSend();
    }
  };

  return <MessageInput onSend={handleSend} inputRef={inputRef} placeholder={placeholder} />;
};
