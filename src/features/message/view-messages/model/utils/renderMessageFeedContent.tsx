import { MessageDivider, MessageMemo } from '@entities/message';
import { CachedUsers, Message, User } from '@shared/types';
import { TimeFormatter, checkIsDifferentDays, checkTimestampOlder } from '@shared/utils';
import { Fragment } from 'react';

/**
 * Function to render message feed with time dividers
 * @param message - message to be rendered
 * @param prevMessage - previous message in chat history
 * @param user - current user
 * @param usersCache - cached users
 * @returns 
 */
export const renderMessageFeedMessageWithDividers = (message: Message, prevMessage: Message | null, user: User, usersCache: CachedUsers) => {
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
        username={usersCache[message.senderId]?.username || 'Undefined'}
        updatedAt={tmUpdatedAt.getMessageTimeShort()}
        createdAt={tmCreatedAt.getMessageTimeShort()}
        fullTime={tmCreatedAt.getFullMessageTime()}
        isShort={isShort}
        userIsOwner={user._id === message.senderId}
      />
    </Fragment>
  );
};
