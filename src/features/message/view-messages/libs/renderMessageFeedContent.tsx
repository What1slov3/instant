import { Fragment } from 'react';
import { MessageDivider, MessageMemo } from '@entities/message';
import { completeSystemFormating } from '@shared/libs';
import { TimeFormatter, checkIsDifferentDays, checkTimestampOlder } from '@shared/utils';
import type { SliceUserCache, Message, Channel } from '@shared/types';

/**
 * Function to render message feed with time dividers
 * @param message - message to be rendered
 * @param prevMessage - previous message in chat history
 * @param channel - current channel
 * @param user - current user
 * @param usersCache - cached users
 * @returns
 */
export const renderMessageFeedMessageWithDividers = (
  message: Message,
  prevMessage: Message | null,
  channel: Channel,
  usersCache: SliceUserCache
) => {
  const isNewDay = prevMessage && checkIsDifferentDays(message.createdAt, prevMessage.createdAt || 0);
  const isShort =
    !checkTimestampOlder(message.createdAt, prevMessage?.createdAt || 0, 30 * 1000) &&
    !isNewDay &&
    message.senderId === prevMessage?.senderId;
  const tmCreatedAt = new TimeFormatter(message.createdAt);
  const tmUpdatedAt = new TimeFormatter(message.updatedAt);

  return (
    <Fragment key={message.id}>
      {isNewDay && <MessageDivider date={tmCreatedAt.getDateDivider()} />}
      <MessageMemo
        {...message}
        content={
          message.meta?.type
            ? {
                ...message.content,
                text: completeSystemFormating(message.content.text, {
                  channelName: channel.name,
                  username: usersCache[message.meta.data.userId]?.username || 'Undefined',
                }),
              }
            : message.content
        }
        username={message.meta?.type ? channel.name : usersCache[message.senderId]?.username || 'Undefined'}
        updatedAt={tmUpdatedAt.getMessageTimeShort()}
        createdAt={tmCreatedAt.getMessageTimeShort()}
        fullTime={tmCreatedAt.getFullMessageTime()}
        isShort={isShort}
      />
    </Fragment>
  );
};
