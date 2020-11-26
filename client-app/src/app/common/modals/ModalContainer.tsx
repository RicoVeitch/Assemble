import React, { useContext } from 'react';
import { Modal } from 'semantic-ui-react';
import ModalStore from '../../stores/modalStore';
import { observer } from 'mobx-react-lite';

const ModalContainer = () => {
  const modalStore = useContext(ModalStore);
  const { modal: { open, body }, closeModal } = modalStore;
  return (
    <Modal open={open} onClose={closeModal} size='small'>
      <Modal.Content>{body}</Modal.Content>
    </Modal>
  );
};

export default observer(ModalContainer);
