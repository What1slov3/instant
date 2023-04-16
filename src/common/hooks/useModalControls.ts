import { useDispatch } from 'react-redux';
import { resetModal, setModal } from '@state/index';
import type { Modal } from '@customTypes/index';

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
