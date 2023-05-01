import { useDispatch } from 'react-redux';
import { resetModal, setModal } from '@shared/state';
import type { Modal } from '@shared/types';

export const useModalControls = () => {
  const dispatch = useDispatch();

  const openByName = (options: Modal) => {
    dispatch(setModal(options));
  };

  const openByDataset = (elem: HTMLElement) => {
    const modalName = elem.dataset.modal;
    if (modalName) {
      dispatch(setModal({ name: modalName as keyof Omit<Modal['name'], 'deleteMessage'> }));
    }
  };

  const close = () => {
    dispatch(resetModal());
  };

  return { close, open: openByName, openByDataset };
};
