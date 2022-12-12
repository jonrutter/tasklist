import React from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// components
import { Layout } from '@/components/layout/Layout';

// tasks
import { selectList, TaskList, TaskCreateDropdown } from '@/features/tasks';

// store
import { useSelector } from '@/app';

export const HomePage: React.FC = () => {
  const list = useSelector(selectList);

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
