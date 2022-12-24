import { Button } from '@mantine/core';
import { useEffect } from 'react';
import icon from '../../../assets/icon.svg';
import './index.css';

const Index = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <Button>Donate</Button>
        </a>
      </div>
    </div>
  );
};

export default Index;
