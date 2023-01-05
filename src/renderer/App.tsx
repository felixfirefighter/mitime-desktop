import { MantineProvider } from '@mantine/core';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import mixpanel from 'mixpanel-browser';
import { isDebug } from 'utils/env';
import { useState } from 'react';
import Layout from './components/Layout';
import Index from './pages';
import UsageListPage from './pages/usage-list';

export default function App() {
  mixpanel.init('4f4b386af0353a1476a660bffc7d513c', { debug: isDebug });

  return (
    <MantineProvider withCSSVariables withGlobalStyles withNormalizeCSS>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/usage-list" element={<UsageListPage />} />
          </Routes>
        </Layout>
      </Router>
    </MantineProvider>
  );
}
