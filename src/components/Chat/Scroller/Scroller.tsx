import { Fragment, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setChatLoadingStatus, thunkGetHistory, useAppSelector } from '@state/index';
import ChatMessage from '@components/Chat/ChatMessage/ChatMessage';
import InfiniteScroll from '@components/InfiniteScroll/InfiniteScroll';
import MessagesSkeleton from '@components/MessagesSkeleton/MessagesSkeleton';
import MessageDivider from '../UI/MessageDivider';
import ChatBeginning from '../UI/ChatBeginning';
import ScrollBottomButton from '../UI/ScrollBottomButton';
import CONSTANTS from '@config/config';
import { checkTimestampOlder, checkTimestampsOtherDays, TimeFormatter } from '@common/utils';
import type { ChatLoadingStatus, FullyLoadedResources, Message, CachedUsers, User } from '@customTypes/index';
import s from './scroller.module.css';

const renderMessage = (message: Message, prevMessage: Message | null, user: User, usersCache: CachedUsers) => {
  const isNewDay = prevMessage && checkTimestampsOtherDays(message.createdAt, prevMessage.createdAt || 0);
  const isShort =
    !checkTimestampOlder(message.createdAt, prevMessage?.createdAt || 0, 30 * 1000) &&
    !isNewDay &&
    message.senderId === prevMessage?.senderId;
  const tmCreatedAt = new TimeFormatter(message.createdAt);
  const tmUpdatedAt = new TimeFormatter(message.updatedAt);

  return (
    <Fragment key={message._id}>
      {isNewDay && <MessageDivider date={tmCreatedAt.getDateDivider()} />}
      <ChatMessage
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

type Props = {
  chatId: string;
  chatName: string;
  history: Message[];
  chatLoadingStatus: ChatLoadingStatus;
  fullyLoadedResources: FullyLoadedResources;
};

const Scroller: React.FC<Props> = ({
  chatId,
  chatName,
  history,
  chatLoadingStatus,
  fullyLoadedResources,
}): JSX.Element => {
  const dispatch = useDispatch<any>();

  const usersCache = useAppSelector((state) => state.usersCache);
  const user = useAppSelector((state) => state.user);

  const [isScrolledBottom, setIsScrolledBottom] = useState(true); // Чат проскроллен в самый низ
  const [showBottomScroll, setShowBottomScroll] = useState(false); // Показать кнопку скролла в низ
  const [canHistory, setCanHistory] = useState(false); // Показать кнопку скролла в низ
  const [visibleIndex, setVisibleIndex] = useState(1); // Индекс крайнего чанка

  const anchorRef = useRef<HTMLDivElement>(null!); // Ссылка на элемент-якорь в самом низу чата
  const scrollRef = useRef<HTMLDivElement>(null!); // Ссылка на обертку-скролл
  const prevScrollTopRef = useRef<number>(0); // Значение scrollTop перед рендером новых сообщений
  const prevScrollHeightRef = useRef<number>(0); // Высота элемента перед началом загрузки новых сообщений
  const prevHistoryLength = useRef<number>(0); // Количество загруженных сообщений в чате перед начало новой загрузки
  const prevVisibleIndex = useRef<number>(1); // Индекс предыдущего крайнего чанка

  useLayoutEffect(() => {
    prevScrollTopRef.current = scrollRef.current?.scrollTop || 0;
    prevScrollHeightRef.current = scrollRef.current?.scrollHeight || 0;
    prevHistoryLength.current = history.length || 0;
  }, [chatId]);

  useEffect(() => {
    setCanHistory(true);
  }, [chatId]);

  useEffect(() => {
    if (canHistory && !history.length) {
      historyNext();
    }
  }, [canHistory]);

  useEffect(() => {
    if (isScrolledBottom) {
      anchorRef.current?.scrollIntoView();
      setVisibleIndex(1);
    }
  }, [isScrolledBottom]);

  useEffect(() => {
    if (chatLoadingStatus.isLoaded) {
      if (prevHistoryLength.current === 0) {
        anchorRef.current?.scrollIntoView();
        prevHistoryLength.current = history.length;
        return;
      }
      if (history.length && prevHistoryLength.current < history.length) {
        dispatch(setChatLoadingStatus({ isLoaded: false }));
      }
    }
  }, [chatLoadingStatus]);

  useEffect(() => {
    if (prevVisibleIndex.current < visibleIndex) {
      restoreScroll();
      setCanHistory(true);
    }

    return () => {
      prevVisibleIndex.current = visibleIndex;
    };
  }, [visibleIndex]);

  const historyNext = useCallback(() => {
    const maxIndex = Math.floor(history.length / CONSTANTS.CHAT_CHUNK_SIZE);

    if (visibleIndex < maxIndex) {
      setVisibleIndex((prev) => prev + 1);
    } else {
      if (!fullyLoadedResources.chatIds.includes(chatId)) {
        dispatch(
          thunkGetHistory({
            chatId: chatId!,
            offset: history?.length || 0,
            limit: CONSTANTS.GET_HISTORY_LIMIT,
          })
        );
      }
    }
  }, [fullyLoadedResources, history, chatId, visibleIndex]);

  const restoreScroll = () => {
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight - prevScrollHeightRef.current + prevScrollTopRef.current,
    });
  };

  const scrollToBottom = () => {
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight - 2000,
    });
    anchorRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  
  const savePrevScroll = useCallback(() => {
    prevScrollHeightRef.current = scrollRef.current.scrollHeight;
    setCanHistory(false);
  }, []);

  const handleOnScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollBottom = target.scrollHeight - target.scrollTop - target.clientHeight;
    setShowBottomScroll(scrollBottom > CONSTANTS.SCROLL_TO_SHOW_SCROLL_BUTTON);
    setIsScrolledBottom(scrollBottom === 0);
    if (!chatLoadingStatus.isLoaded) {
      prevScrollTopRef.current = target.scrollTop;
    }
  }, []);

  const renderedChunks = useMemo(() => {
    let messageComponents: JSX.Element[] = [];

    const maxIndex = Math.floor(history.length / CONSTANTS.CHAT_CHUNK_SIZE);

    for (let i = history.length - (maxIndex - visibleIndex) * CONSTANTS.CHAT_CHUNK_SIZE - 1; i >= 0; i--) {
      if (history[i]) {
        messageComponents.push(renderMessage(history[i], history[i + 1], user, usersCache));
      }
    }

    return messageComponents;
  }, [history, visibleIndex, user, usersCache]);

  const renderedContent = useMemo(() => {
    if (!history.length && chatLoadingStatus.loading) {
      return <MessagesSkeleton />;
    }
    return renderedChunks;
  }, [history, chatLoadingStatus, visibleIndex, user, usersCache]);

  return (
    <>
      <div className={s.chatWindow} ref={scrollRef} onScroll={handleOnScroll}>
        <div className={s.inner}>
          <InfiniteScroll
            next={historyNext}
            hasMore={chatLoadingStatus.hasMore}
            loading={chatLoadingStatus.loading && !canHistory}
            getScroll={savePrevScroll}
            end={<ChatBeginning chatName={chatName} />}
          >
            {renderedContent}
          </InfiniteScroll>
          <div ref={anchorRef}></div>
        </div>
        <div className={s.anchor}></div>
      </div>
      <ScrollBottomButton show={showBottomScroll} onClick={scrollToBottom} />
    </>
  );
};

export default Scroller;
