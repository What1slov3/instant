import { useRef } from 'react';
import { useIntersectionObserver } from '@shared/hooks';
import type { FCChildren } from '@shared/types';

type Props = (
  | {
      getScroll: Function; // Переместиться нa предыдущее место скролла, чтобы избежать залипания
      direction: 'top';
    }
  | {
      loader?: JSX.Element | React.Component; // Прелоадер, показывается, если передан
      next: Function; // Функция загрузки следующих данных
      end?: JSX.Element | React.Component; // Компонент отображаемый в конце, когда загрузка кончилась
      hasMore: boolean; // Есть ли еще данные для загрузки
      loading: boolean; // Идет ли сейчас загрузка
      getScroll?: never; // Переместиться нa предыдущее место скролла, чтобы избежать залипания
      direction: 'bottom';
    }
) & {
  loader?: JSX.Element | React.Component; // Прелоадер, показывается, если передан
  next: Function; // Функция загрузки следующих данных
  end?: JSX.Element | React.Component; // Компонент отображаемый в конце, когда загрузка кончилась
  hasMore: boolean; // Есть ли еще данные для загрузки
  loading: boolean; // Идет ли сейчас загрузка
  onEveryIntersection?: boolean;
} & FCChildren;

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
  const scrollerRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver(scrollerRef.current, (entries) => {
    if (entries[0].isIntersecting && !loading && hasMore) {
      getScroll?.();
      next();
    }
  });

  const renderLogic = () => {
    return (
      <>
        <div ref={scrollerRef}></div>
        {!hasMore && !loading && end}
        {loading && loader}
      </>
    );
  };

  return (
    <>
      {direction === 'top' && renderLogic()}
      {children}
      {direction === 'bottom' && renderLogic()}
    </>
  );
};
