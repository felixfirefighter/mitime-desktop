import { ActionIcon, Navbar } from '@mantine/core';
import { IconHome, IconListDetails } from '@tabler/icons';
import classnames from 'classnames';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './index.module.scss';

const AppNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const NAV_ITEMS = [
    {
      id: 1,
      path: '/',
      icon: <IconHome size={32} strokeWidth={1.5} />,
      onClick: () => navigate('/'),
    },
    {
      id: 2,
      path: '/usage-list',
      icon: <IconListDetails size={32} strokeWidth={1.5} />,
      onClick: () => navigate('/usage-list'),
    },
  ];

  return (
    <Navbar width={{ xs: 54 }} className={styles.navbar} p={8}>
      <div>
        {NAV_ITEMS.map(({ id, icon, path, onClick }) => {
          return (
            <ActionIcon
              key={id}
              size="xl"
              variant="transparent"
              className={classnames(styles.navItem, {
                [styles.active]: location.pathname === path,
              })}
              onClick={onClick}
              m={4}
            >
              {icon}
            </ActionIcon>
          );
        })}
      </div>
    </Navbar>
  );
};

export default AppNavbar;
