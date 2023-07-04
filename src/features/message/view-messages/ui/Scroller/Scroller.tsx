import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useAppSelector } from '@shared/state';
import { config } from '@shared/config';
import { MessagesSkeletonPreloader } from '@entities/preloaders';
import { MessageFeedBeginning, ScrollBottomButton } from '@entities/message';
import { InfiniteScroll } from '@shared/components';
import { renderMessageFeedMessageWithDividers } from '../../libs/renderMessageFeedContent';
import { effects } from '../../model/effects';
import type { ChatLoadingStatus, FullyLoadedResources, Message } from '@shared/types';
import s from './scroller.module.css';

type Props = {
  chatId: string;
  chatName: string;
  channelName: string;
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
  channelName,
}): JSX.Element => {
  const usersCache = useAppSelector((state) => state.usersCache);
  const user = useAppSelector((state) => state.user);

  const [isScrolledBottom, setIsScrolledBottom] = useState(true); // Чат проскроллен в самый низ
  const [showBottomScroll, setShowBottomScroll] = useState(false); // Показать кнопку скролла в низ
  const [canHistory, setCanHistory] = useState(false); // Возможность загрузки новой порции сообщений
  const [visibleChunkIndex, setVisibleChunkIndex] = useState(1); // Индекс видимого крайнего чанка

  const anchorRef = useRef<HTMLDivElement>(null!); // Ссылка на элемент-якорь в самом низу чата
  const scrollRef = useRef<HTMLDivElement>(null!); // Ссылка на обертку-скролл
  const prevScrollTopRef = useRef<number>(0); // Значение scrollTop перед рендером новых сообщений
  const prevScrollHeightRef = useRef<number>(0); // Высота элемента перед началом загрузки новых сообщений
  const prevHistoryLength = useRef<number>(0); // Количество загруженных сообщений в чате перед началом новой загрузки
  const prevVisibleChunkIndex = useRef<number>(1); // Индекс предыдущего видимого крайнего чанка

  // Общее количество чанков в загруженной истории
  const totalChunksCount = Math.ceil(history.length / config.CHAT_CHUNK_SIZE);

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
      setVisibleChunkIndex(1);
    }
  }, [isScrolledBottom]);

  // ? Реагируем на статус загрузки сообщений
  // Если сообщения были загружены и до этого не было сообщений
  // то скроллим вниз
  useEffect(() => {
    if (chatLoadingStatus.isLoaded) {
      if (!prevHistoryLength.current) {
        anchorRef.current?.scrollIntoView();
        prevHistoryLength.current = history.length;
        return;
      }
      if (history.length && prevHistoryLength.current < history.length) {
        setVisibleChunkIndex((prev) => prev + 1);
      }
      prevHistoryLength.current = history.length;
      setCanHistory(true);
    }
  }, [chatLoadingStatus]);

  // ? Реагируем на смену текущего чанка
  // Если индекс чанка увеличился - ресторим скролл в предыдущую позицию
  // и устанавлием предыдущий индекс как текущий
  useEffect(() => {
    if (prevVisibleChunkIndex.current < visibleChunkIndex) {
      restoreScroll();
      setCanHistory(true);
    }

    return () => {
      prevVisibleChunkIndex.current = visibleChunkIndex;
    };
  }, [visibleChunkIndex]);

  // ? Загрузка истории
  // Если индекс текущего чанка, меньше чем есть в истории, то увеличиваем индекс
  // и проверяем, хватает ли сообщений для следующего чанка, если нет, то догружаем до лимита
  // иначе пытаемся загрузить сообщения, если чат не был уже загружен полностью
  const historyNext = useCallback(() => {
    if (visibleChunkIndex < totalChunksCount) {
      if (
        !fullyLoadedResources.chatIds.includes(chatId) &&
        history.length - visibleChunkIndex * config.CHAT_CHUNK_SIZE < config.CHAT_CHUNK_SIZE
      ) {
        effects.getHistory(
          chatId!,
          history.length,
          Math.abs(history.length - totalChunksCount * config.CHAT_CHUNK_SIZE)
        );
      } else {
        setVisibleChunkIndex((prev) => prev + 1);
      }
    } else if (!fullyLoadedResources.chatIds.includes(chatId)) {
      effects.getHistory(chatId!, history.length || 0);
    }
  }, [fullyLoadedResources, history, chatId, visibleChunkIndex]);

  // ? Возврат скролла на место, до загрузки последнего чанка
  const restoreScroll = () => {
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight - prevScrollHeightRef.current + prevScrollTopRef.current,
    });
  };

  // ? Перемотка в конец истории (новые сообщения)
  const scrollToBottom = () => {
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight - 2000,
    });
    anchorRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // ? Сохранить текущую высоту скролла и запретить загрузку новых сообщений
  const savePrevScroll = useCallback(() => {
    prevScrollHeightRef.current = scrollRef.current.scrollHeight;
    setCanHistory(false);
  }, []);

  // ? Обработка скролл-ивента
  // Отображает кнопку скролла вниз, при достижении высоты-триггера,
  // определяет, когда скролл находится в крайнем нижнем состоянии
  // и запоминает высоту скролла во время загрузки новых сообщений
  // для плавного его рестора после загрузки новых сообщений
  const handleOnScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollBottom = target.scrollHeight - target.scrollTop - target.clientHeight;
    setShowBottomScroll(scrollBottom > config.SCROLL_TO_SHOW_SCROLL_BUTTON);
    setIsScrolledBottom(scrollBottom === 0);
    if (!chatLoadingStatus.isLoaded) {
      prevScrollTopRef.current = target.scrollTop;
    }
  }, []);

  // ? Рендер чанков сообщений
  // Обрезаем сообщения по чанкам, начиная с конца и отдаем в функцию-рендер
  const renderedChunks = useMemo(() => {
    let messages: JSX.Element[] = [];

    for (let i = Math.min(visibleChunkIndex * config.CHAT_CHUNK_SIZE - 1, history.length); i >= 0; i--) {
      if (history[i]) {
        messages.push(renderMessageFeedMessageWithDividers(history[i], history[i + 1], channelName, user, usersCache));
      }
    }

    return messages;
  }, [history, visibleChunkIndex, user, usersCache]);

  // ? Рендерим нужный контент
  // Если сообщений нет и идет загрузка, показваем лоадер
  // иначе рендерим сообщения
  const renderedContent = useMemo(() => {
    if (!history.length && chatLoadingStatus.loading) {
      return <MessagesSkeletonPreloader />;
    }
    return renderedChunks;
  }, [history, chatLoadingStatus, visibleChunkIndex, user, usersCache]);

  return (
    <>
      <div className={s.chatWindow} ref={scrollRef} onScroll={handleOnScroll}>
        <div className={s.inner}>
          <InfiniteScroll
            next={historyNext}
            hasMore={chatLoadingStatus.hasMore || visibleChunkIndex < totalChunksCount}
            loading={chatLoadingStatus.loading || !canHistory}
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
