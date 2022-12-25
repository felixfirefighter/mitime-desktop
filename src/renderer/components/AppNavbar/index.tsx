import { ActionIcon, Navbar } from '@mantine/core';
import { IconHome } from '@tabler/icons';
import './index.scss';

const AppNavbar = () => {
  return (
    <Navbar width={{ sm: 54 }} className="app-navbar" p={8}>
      <div>
        <ActionIcon size="xl" variant="subtle" color="indigo">
          <IconHome size={32} />
        </ActionIcon>
      </div>
    </Navbar>
  );
};

export default AppNavbar;
