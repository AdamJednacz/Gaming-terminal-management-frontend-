import { Modal } from 'antd';
import type { ModalModel } from '../../../common/models/modal.model';
import Text from '../../../reusableComponents/text/Text';

const SessionExpiredModal = ({
  isOpen,
  onOk,
}: Omit<ModalModel, 'onCancel'>) => {
  return (
    <Modal
      title={'Your session has expired'}
      open={isOpen}
      onOk={onOk}
      cancelButtonProps={{ style: { display: 'none' } }}
      okText={'Close'}
      destroyOnHidden
    >
      <Text>Sign in again to go back to the application.</Text>
    </Modal>
  );
};

export default SessionExpiredModal;
