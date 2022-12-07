import React from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// components
import { Layout } from '@/components/layout/Layout';
import { TaskList, TaskCreateDropdown } from '@/features/tasks';

// store
import { useStore } from '../store/useStore';

// utils
import { isPastDue } from '../utils/time';

export const PastDuePage: React.FC = () => {
  const { list } = useStore();

  const filteredList = list.filter(isPastDue);
  return (
    <Layout>
      <Helmet>
        <title>Past Due | TaskList</title>
      </Helmet>
      <TaskList label={'Past Due'} list={filteredList} />
      <TaskCreateDropdown />
    </Layout>
  );
};
