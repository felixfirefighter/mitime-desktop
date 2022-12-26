import { Button, Modal, Text } from '@mantine/core';
import styles from './index.module.scss';

interface IPermissionModal {
  permission: boolean | null;
  setPermission: () => void;
}

const PermissionModal: React.FC<IPermissionModal> = ({
  permission,
  setPermission,
}) => {
  const relaunch = () => {
    window.electron.ipcRenderer.sendMessage('relaunch');
  };

  return (
    <Modal
      opened={permission === false}
      withCloseButton={false}
      onClose={setPermission}
      centered
      size="xs"
    >
      <div className={styles.modalBody}>
        <Text mb="xl">
          MiTime needs <strong>Screen Recording</strong> and{' '}
          <strong>Accessibility</strong> permission to track app usage
          automatically.
        </Text>
        <Button color="indigo" variant="outline" onClick={relaunch}>
          Restart App
        </Button>
      </div>
    </Modal>
  );
};

export default PermissionModal;
