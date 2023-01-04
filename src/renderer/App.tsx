import { MantineProvider } from '@mantine/core';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import mixpanel from 'mixpanel-browser';
import { isDebug } from 'utils/env';
import Layout from './components/Layout';
import Index from './pages';

export default function App() {
  mixpanel.init('4f4b386af0353a1476a660bffc7d513c', { debug: isDebug });

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
        </Router>
      </Layout>
    </MantineProvider>
  );
}
