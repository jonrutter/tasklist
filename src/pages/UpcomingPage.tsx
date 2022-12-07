import React from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// components
import { Layout } from '@/components/layout/Layout';
import { TaskList, TaskCreateDropdown } from '@/features/tasks';

// store
import { useStore } from '../store/useStore';

// utils
import { isDueInFuture } from '../utils/time';

export const UpcomingPage: React.FC = () => {
  const { list } = useStore();

  const filteredList = list.filter(isDueInFuture);

  return (
    <Layout>
      <Helmet>
        <title>Upcoming | TaskList</title>
      </Helmet>
      <TaskList label={'Upcoming'} list={filteredList} />
      <TaskCreateDropdown />
    </Layout>
  );
};
