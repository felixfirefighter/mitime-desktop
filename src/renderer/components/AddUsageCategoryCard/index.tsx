import { Button, Paper, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';

import styles from './index.module.scss';

const AddUsageCategoryCard = () => {
  const [input, setInput] = useState('');

  useEffect(() => {
    window.electron.ipcRenderer.on('add-usage-category', () => {
      setInput('');
    });
  }, []);

  const addUsageCategory = () => {
    if (input === '') {
      return;
    }

    window.electron.ipcRenderer.sendMessage('add-usage-category', {
      title: input,
    });
  };

  return (
    <Paper shadow="sm" p="xl" radius={8} m={16}>
      <div className={styles.inputContainer}>
        <TextInput
          placeholder="Add category"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className={styles.input}
        />
        <Button className={styles.inputButton} onClick={addUsageCategory}>
          Add
        </Button>
      </div>
    </Paper>
  );
};

export default AddUsageCategoryCard;
