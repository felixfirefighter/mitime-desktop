import { AppShell, Aside } from '@mantine/core';
import AppNavbar from '../AppNavbar';
import './index.scss';

interface ILayout {
  children: React.ReactElement;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <div className="layout">
      <AppShell padding="md">{children}</AppShell>
    </div>
  );
};

export default Layout;
