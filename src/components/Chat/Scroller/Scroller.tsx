import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setChatLoadingStatus, thunkGetHistory, useAppSelector } from '@state/index';
import ChatMessage from '@components/Chat/ChatMessage/ChatMessage';
import InfiniteScroll from '@components/InfiniteScroll/InfiniteScroll';
import MessagePreloader from '@layouts/MessagePreloader/MessagePreloader';
import MessageDivider from '../UI/MessageDivider';
import ChatBeginning from '../UI/ChatBeginning';
import ScrollBottomButton from '../UI/ScrollBottomButton';
import CONSTANTS from '@common/constants';
import { checkTimestampOlder, checkTimestampsOtherDays, TimeFormatter } from '@common/utils';
import type { ChatLoadingStatus, FullyLoadedResources, Message, CachedUsers, User } from '@customTypes/index';
import s from './scroller.module.css';

const renderPreloader = () => {
  let result = [];
  for (let i = 0; i * 80 < document.body.clientHeight * 1.5; i++) {
    result.push(<MessagePreloader key={i} />);
  }
  return result;
};

const renderMessage = (message: Message, prevMessage: Message | null, user: User, usersCache: CachedUsers) => {
  const isNewDay = checkTimestampsOtherDays(message.createdAt, prevMessage?.createdAt || 0);
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

  const anchorRef = useRef<HTMLDivElement>(null!); // Ссылка на элемент-якорь в самом низу чата
  const scrollRef = useRef<HTMLDivElement>(null!); // Ссылка на обертку-скролл
  const innerRef = useRef<HTMLDivElement>(null!); // Ссылка на обертку с контентом внутри скролла
  const prevNextScrollTopRef = useRef<number>(0); // Значение scrollTop перед рендером новых сообщений
  const prevNextScrollHeightRef = useRef<number>(0); // Высота элемента перед началом загрузки новых сообщений
  const prevNextHistoryLength = useRef<number>(0); // Количество загруженных сообщений в чате перед начало новой загрузки

  useLayoutEffect(() => {
    prevNextScrollTopRef.current = scrollRef.current?.scrollTop || 0;
    prevNextScrollHeightRef.current = scrollRef.current?.scrollHeight || 0;
    prevNextHistoryLength.current = history.length || 0;
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
    }
  }, [isScrolledBottom]);

  useEffect(() => {
    if (prevNextHistoryLength.current === 0 && chatLoadingStatus.isLoaded) {
      anchorRef.current?.scrollIntoView();
      prevNextHistoryLength.current = history.length;
    } else if (history.length && prevNextHistoryLength.current < history.length && chatLoadingStatus.isLoaded) {
      if (history.length > CONSTANTS.GET_HISTORY_LIMIT) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight - prevNextScrollHeightRef.current + prevNextScrollTopRef.current,
        });
      }
      dispatch(setChatLoadingStatus({ isLoaded: false }));
      setCanHistory(true);
    }
  }, [isScrolledBottom, chatLoadingStatus]);

  const historyNext = useCallback(() => {
    const historyIsLoaded = fullyLoadedResources.chatIds.includes(chatId);
    if (!historyIsLoaded) {
      dispatch(
        thunkGetHistory({
          chatId: chatId!,
          offset: history?.length || 0,
          limit: CONSTANTS.GET_HISTORY_LIMIT,
        })
      );
    }
  }, [fullyLoadedResources, history, canHistory, chatId]);

  const savePrevNextScroll = useCallback(() => {
    prevNextScrollHeightRef.current = scrollRef.current.scrollHeight;
    setCanHistory(false);
  }, []);

  const onScrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollBottom = target.scrollHeight - target.scrollTop - target.clientHeight;
    setShowBottomScroll(scrollBottom > CONSTANTS.SCROLL_TO_SHOW_SCROLL_BUTTON);
    setIsScrolledBottom(scrollBottom === 0);
    if (!chatLoadingStatus.isLoaded) {
      prevNextScrollTopRef.current = target.scrollTop;
    }
  };

  const scrollToBottom = () => {
    anchorRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const renderMessages = () => {
    const messageComponents: JSX.Element[] = [];

    for (let i = history.length - 1; i >= 0; i--) {
      messageComponents.push(renderMessage(history[i], history[i + 1], user, usersCache));
    }

    return messageComponents;
  };

  const renderContent = () => {
    if (!history.length && chatLoadingStatus.loading) {
      return renderPreloader();
    }
    return renderMessages();
  };

  return (
    <>
      <div className={s.chatWindow} ref={scrollRef} onScroll={onScrollHandler}>
        <div className={s.inner} ref={innerRef}>
          <InfiniteScroll
            next={historyNext}
            hasMore={chatLoadingStatus.hasMore}
            loading={chatLoadingStatus.loading && !canHistory}
            getScroll={savePrevNextScroll}
            end={<ChatBeginning chatName={chatName} />}
          >
            {renderContent()}
          </InfiniteScroll>
          <div ref={anchorRef}></div>
        </div>
      </div>
      <ScrollBottomButton show={showBottomScroll} onClick={scrollToBottom} />
    </>
  );
};

export default Scroller;
