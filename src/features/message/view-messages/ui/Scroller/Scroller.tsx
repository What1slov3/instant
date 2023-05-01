import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setChatLoadingStatus, thunkGetHistory, useAppSelector } from '@shared/state';
import { CONSTANTS } from '@shared/config';
import { renderMessageFeedMessageWithDividers } from '../../model/utils/renderMessageFeedContent';
import { MessagesSkeletonPreloader } from '@entities/preloaders';
import { MessageFeedBeginning, ScrollBottomButton } from '@entities/message';
import { InfiniteScroll } from '@shared/components';
import type { ChatLoadingStatus, FullyLoadedResources, Message } from '@shared/types';
import s from './scroller.module.css';

type Props = {
  chatId: string;
  chatName: string;
  history: Message[];
  chatLoadingStatus: ChatLoadingStatus;
  fullyLoadedResources: FullyLoadedResources;
};

export const Scroller: React.FC<Props> = ({
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
    let messages: JSX.Element[] = [];

    const maxIndex = Math.floor(history.length / CONSTANTS.CHAT_CHUNK_SIZE);

    for (let i = history.length - (maxIndex - visibleIndex) * CONSTANTS.CHAT_CHUNK_SIZE - 1; i >= 0; i--) {
      if (history[i]) {
        messages.push(renderMessageFeedMessageWithDividers(history[i], history[i + 1], user, usersCache));
      }
    }

    return messages;
  }, [history, visibleIndex, user, usersCache]);

  const renderedContent = useMemo(() => {
    if (!history.length && chatLoadingStatus.loading) {
      return <MessagesSkeletonPreloader />;
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
            end={<MessageFeedBeginning chatName={chatName} />}
            direction="top"
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
