import { Modal } from 'antd';
import Text from '../../../reusableComponents/text/Text';
import type { ModalModel } from '../../../common/models/modal.model';

const LogoutModal = ({ isOpen, onOk, onCancel }: ModalModel) => {
  return (
    <Modal
      title={'Sign out of GTMS?'}
      open={isOpen}
      onOk={onOk}
      okButtonProps={{ color: 'danger', variant: 'solid' }}
      onCancel={onCancel}
      okText={'Sign out'}
      cancelText={'Stay signed in'}
      destroyOnHidden
    >
      <Text>You'll need to sign in again to see terminals and incidents.</Text>
    </Modal>
  );
};

export default LogoutModal;
