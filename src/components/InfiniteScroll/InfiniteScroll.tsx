import { Component, useRef } from 'react';
import { FCChildren } from '@customTypes/index';
import { useIntersectionObserver } from '@common/hooks';
import s from './infinitescroll.module.css';

type Props = {
  loader?: JSX.Element | Component; // Прелоадер, показывается, если передан
  next: Function; // Функция загрузки следующих данных
  end?: JSX.Element | Component; // Компонент отображаемый в конце, когда загрузка кончилась
  hasMore: boolean; // Есть ли еще данные для загрузки
  loading: boolean; // Идет ли сейчас загрузка
  getScroll: Function; // Переместиться не предыдущее место скролла, чтобы избежать залипания
} & FCChildren;

const InfiniteScroll: React.FC<Props> = ({ children, loader, next, end, hasMore, loading, getScroll }): JSX.Element => {
  const topScrollRef = useRef<HTMLDivElement>(null!);

  useIntersectionObserver(topScrollRef.current, (entries) => {
    if (entries[0].isIntersecting && !loading && hasMore) {
      getScroll();
      next();
    }
  });

  return (
    <div className={s.wrapper}>
      <div className={s.item_wrapper}>
        <>
          <div ref={topScrollRef} className={s.scrollTop}></div>
          {!hasMore && !loading && end}
          {loading && loader}
          {children}
        </>
      </div>
    </div>
  );
};

export default InfiniteScroll;
