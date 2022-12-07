import React from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// components
import { Layout } from '@/components/layout/Layout';
import { TaskList, TaskCreateDropdown } from '@/features/tasks';

// store
import { useStore } from '../store/useStore';

export const HomePage: React.FC = () => {
  const { list } = useStore();

  return (
    <Layout>
      <Helmet>
        <title>All Tasks | TaskList</title>
      </Helmet>
      <TaskList label={'All Tasks'} list={list} />
      <TaskCreateDropdown />
    </Layout>
  );
};
