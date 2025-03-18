import { effects } from '../../model/effects';
import { MessageInput, quillGetText, quillSetText } from '@entities/input';
import { useAppSelector } from '@shared/state';
import { useEffect, useState } from 'react';
import { MessageEditPanel } from '@entities/input/ui/MessageEditPanel/MessageEditPanel';
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
  const editingMessages = useAppSelector(state => state.ui.messages.editing);

  const [isEditingMode, setIsEditingMode] = useState<boolean>(false);

  useEffect(() => {
    if (inputRef.current && connection.chatId && editingMessages[connection.chatId]?.chatId === connection.chatId) {
      setIsEditingMode(true);
      quillSetText(inputRef, editingMessages[connection.chatId].content.text);
    }

    return () => {
      setIsEditingMode(false);
      quillSetText(inputRef, '');
    };
  }, [editingMessages, connection.chatId]);

  // TODO рефакторинг
  // TODO ВРЕМЕННО БЕЗ КАРТИНОК ПЕРЕДЕЛАТЬ
  const handleSaveEdit = () => {
    const text = quillGetText(inputRef).trim();
    const message = editingMessages[connection.chatId!];
    effects.editMessage(message.id, text, message.content.attachments || {});
  };

  const cancelEdit = () => {
    effects.unmarkEditMessage(connection.chatId!, editingMessages[connection.chatId!].id);
  };

  const handleSend = () => {
    const text = quillGetText(inputRef).trim();
    const processedAttachments = {
      files: attachments.map(imageObject => imageObject.url),
    };

    if (text || processedAttachments.files.length) {
      if (isEditingMode) {
        handleSaveEdit();
      } else {
        effects.sendMessage(connection, text, processedAttachments);
      }
      onSend();
    }
  };

  return (
    <MessageInput
      onSend={handleSend}
      inputRef={inputRef}
      placeholder={placeholder}
      ControlPanel={isEditingMode && <MessageEditPanel onSave={handleSaveEdit} onCancel={cancelEdit} />}
    />
  );
};
