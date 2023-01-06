/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ColorPicker, DEFAULT_THEME, Popover } from '@mantine/core';
import { useEffect, useState } from 'react';

import styles from './index.module.scss';

interface IAppColorPicker {
  id: number;
  color: string;
}

const AppColorPicker: React.FC<IAppColorPicker> = ({ id, color }) => {
  const [selectedColor, setSelectedColor] = useState(color);
  const [opened, setOpened] = useState(false);

  const updateUsageInfo = (localColor: string) => {
    window.electron.ipcRenderer.sendMessage('update-usage-info', {
      id,
      color: localColor,
    });
  };

  const onColorChanged = (localColor: string) => {
    updateUsageInfo(localColor);
    setOpened((o) => !o);
    setSelectedColor(localColor);
  };

  return (
    <Popover width={300} withArrow opened={opened} onChange={setOpened}>
      <Popover.Target>
        <div
          className={styles.colorSelector}
          style={{ background: selectedColor }}
          onClick={() => setOpened((o) => !o)}
        />
      </Popover.Target>
      <Popover.Dropdown>
        <ColorPicker
          format="hex"
          value={selectedColor}
          onChange={onColorChanged}
          withPicker={false}
          fullWidth
          swatches={[
            ...DEFAULT_THEME.colors.dark,
            ...DEFAULT_THEME.colors.red,
            ...DEFAULT_THEME.colors.violet,
            ...DEFAULT_THEME.colors.blue,
            ...DEFAULT_THEME.colors.green,
            ...DEFAULT_THEME.colors.yellow,
            ...DEFAULT_THEME.colors.orange,
          ]}
        />
      </Popover.Dropdown>
    </Popover>
  );
};

export default AppColorPicker;
