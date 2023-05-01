import { createElement, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { resetModal } from '@shared/state';
import { useGlobalListener } from '@shared/hooks';
import type { Store } from '@shared/types';
import s from './modalrenderer.module.css';
import { MODALS } from '@app/modals/model/modals';

export const ModalRenderer: React.FC = ({}): JSX.Element | null => {
  const dispatch = useDispatch<any>();

  const modalState = useSelector((state: Store) => state.ui.modal);

  const [isShowing, setIsShowing] = useState(false);

  const pointerDownTargetRef = useRef<HTMLElement>();

  useGlobalListener(
    'keydown',
    Boolean(modalState.name),
    (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        dispatch(resetModal());
      }
    },
    []
  );

  useEffect(() => {
    if (modalState.name) {
      setIsShowing(true);
    } else {
      setTimeout(() => setIsShowing(false), 200);
    }
  }, [modalState.name]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerDownTargetRef.current = e.target as HTMLElement;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerDownTargetRef.current?.dataset.overlay && pointerDownTargetRef.current === e.target) {
      dispatch(resetModal());
    }
  };

  const renderModal = () => {
    if (modalState.name) {
      return createElement(MODALS[modalState.name], modalState.payload);
    }
  };

  return isShowing ? (
    <div
      className={classNames(s.overlay, { [s.fading]: !modalState.name })}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      data-overlay="true"
    >
      <div className={s.modalWrapper}>{renderModal()}</div>
    </div>
  ) : null;
};
