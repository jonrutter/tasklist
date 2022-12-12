import React from 'react';

// routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// components
import { Box } from '@mui/material';
import { Header } from '@/components/layout/Header';
import { Nav } from '@/components/layout/Nav';
import { PageChange } from '@/components/logic/PageChange';

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

export const App = () => (
  <Router>
    <Box sx={{ display: 'flex' }}>
      <PageChange />
      <Header />
      <Nav />
      <Box component="main" sx={{ width: '100%' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/today" element={<TodayPage />} />
          <Route path="/tomorrow" element={<TomorrowPage />} />
          <Route path="/upcoming" element={<UpcomingPage />} />
          <Route path="/due" element={<PastDuePage />} />
          <Route path="/completed" element={<CompletedPage />} />
          <Route path="/tag/:tag" element={<TagPage />} />
        </Routes>
      </Box>
    </Box>
  </Router>
);
