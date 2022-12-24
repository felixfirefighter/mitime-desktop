import { MantineProvider } from '@mantine/core';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Index from './pages';

export default function App() {
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
