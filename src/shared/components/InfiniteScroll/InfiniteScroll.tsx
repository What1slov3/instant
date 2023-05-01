import { Component, useRef } from 'react';
import { useIntersectionObserver } from '@shared/hooks';
import type { FCChildren } from '@shared/types';

type Props = (
  | {
      loader?: JSX.Element | Component; // Прелоадер, показывается, если передан
      next: Function; // Функция загрузки следующих данных
      end?: JSX.Element | Component; // Компонент отображаемый в конце, когда загрузка кончилась
      hasMore: boolean; // Есть ли еще данные для загрузки
      loading: boolean; // Идет ли сейчас загрузка
      getScroll: Function; // Переместиться не предыдущее место скролла, чтобы избежать залипания
      direction: 'top';
    }
  | {
      loader?: JSX.Element | Component; // Прелоадер, показывается, если передан
      next: Function; // Функция загрузки следующих данных
      end?: JSX.Element | Component; // Компонент отображаемый в конце, когда загрузка кончилась
      hasMore: boolean; // Есть ли еще данные для загрузки
      loading: boolean; // Идет ли сейчас загрузка
      getScroll?: never; // Переместиться не предыдущее место скролла, чтобы избежать залипания
      direction: 'bottom';
    }
) &
  FCChildren;

export const InfiniteScroll: React.FC<Props> = ({
  children,
  loader,
  next,
  end,
  hasMore,
  loading,
  getScroll,
  direction,
}): JSX.Element => {
  const topScrollRef = useRef<HTMLDivElement>(null!);

  useIntersectionObserver(topScrollRef.current, (entries) => {
    if (entries[0].isIntersecting && !loading && hasMore) {
      getScroll?.();
      next();
    }
  });

  const renderLogic = () => {
    return (
      <>
        <div ref={topScrollRef}></div>
        {!hasMore && !loading && end}
        {loading && loader}
      </>
    );
  };

  return (
    <div>
      {direction === 'top' && renderLogic()}
      {children}
      {direction === 'bottom' && renderLogic()}
    </div>
  );
};