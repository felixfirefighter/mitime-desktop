import { AppShell, Aside, Button, Modal, Text } from '@mantine/core';
import { ICheckPermissionRes } from 'entity/check-permission';
import { useEffect, useState } from 'react';
import AppNavbar from '../AppNavbar';
import PermissionModal from '../PermissionModal';
import './index.scss';

interface ILayout {
  children: React.ReactElement;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  const [permission, setPermission] = useState<boolean | null>(null);

  useEffect(() => {
    window.electron.ipcRenderer.on('check-permission', (arg) => {
      const { hasAccessibilityPermission, hasScreenCapturePermission } =
        arg as ICheckPermissionRes;
      if (!hasAccessibilityPermission || !hasScreenCapturePermission) {
        console.log(hasAccessibilityPermission, hasScreenCapturePermission);
        setPermission(false);
        window.electron.ipcRenderer.sendMessage('ask-for-permission');
      }
    });

    window.electron.ipcRenderer.sendMessage('check-permission');
  }, []);

  return (
    <div className="layout">
      <AppShell padding="md">
        <PermissionModal
          permission={permission}
          setPermission={() => setPermission(true)}
        />

        {children}
      </AppShell>
    </div>
  );
};

export default Layout;
