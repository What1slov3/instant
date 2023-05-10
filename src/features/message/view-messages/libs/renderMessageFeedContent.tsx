import { Fragment } from 'react';
import { MessageDivider, MessageMemo } from '@entities/message';
import { completeSystemFormating } from '@shared/libs';
import { UsersCache, Message, User } from '@shared/types';
import { TimeFormatter, checkIsDifferentDays, checkTimestampOlder } from '@shared/utils';

/**
 * Function to render message feed with time dividers
 * @param message - message to be rendered
 * @param prevMessage - previous message in chat history
 * @param channelName - current channel
 * @param user - current user
 * @param usersCache - cached users
 * @returns
 */
export const renderMessageFeedMessageWithDividers = (
  message: Message,
  prevMessage: Message | null,
  channelName: string,
  user: User,
  usersCache: UsersCache
) => {
  const isNewDay = prevMessage && checkIsDifferentDays(message.createdAt, prevMessage.createdAt || 0);
  const isShort =
    !checkTimestampOlder(message.createdAt, prevMessage?.createdAt || 0, 30 * 1000) &&
    !isNewDay &&
    message.senderId === prevMessage?.senderId;
  const tmCreatedAt = new TimeFormatter(message.createdAt);
  const tmUpdatedAt = new TimeFormatter(message.updatedAt);

  return (
    <Fragment key={message._id}>
      {isNewDay && <MessageDivider date={tmCreatedAt.getDateDivider()} />}
      <MessageMemo
        {...message}
        content={
          message.meta?.type
            ? {
                ...message.content,
                text: completeSystemFormating(message.content.text, {
                  channelName,
                  username: usersCache[message.meta.data.userId]?.username || 'Undefined',
                }),
              }
            : message.content
        }
        username={message.meta?.type ? channelName : usersCache[message.senderId]?.username || 'Undefined'}
        updatedAt={tmUpdatedAt.getMessageTimeShort()}
        createdAt={tmCreatedAt.getMessageTimeShort()}
        fullTime={tmCreatedAt.getFullMessageTime()}
        isShort={isShort}
        userIsOwner={user._id === message.senderId}
      />
    </Fragment>
  );
};
