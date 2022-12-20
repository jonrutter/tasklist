import React from 'react';

// routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages
import {
  HomePage,
  TodayPage,
  TomorrowPage,
  CompletedPage,
  PastDuePage,
  UpcomingPage,
  TagPage,
} from '@/pages';

// components
import { Layout } from '@/components/layout/Layout';

export const App = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/today" element={<TodayPage />} />
        <Route path="/tomorrow" element={<TomorrowPage />} />
        <Route path="/upcoming" element={<UpcomingPage />} />
        <Route path="/due" element={<PastDuePage />} />
        <Route path="/completed" element={<CompletedPage />} />
        <Route path="/tag/:tagId" element={<TagPage />} />
      </Routes>
    </Layout>
  </Router>
);
