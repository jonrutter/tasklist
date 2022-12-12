import React from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// components
import { Layout } from '@/components/layout/Layout';

// tasks
import { selectList, TaskList, TaskCreateDropdown } from '@/features/tasks';

// store
import { useSelector } from '@/app';

// utils
import { isPastDue } from '../utils/time';

export const PastDuePage: React.FC = () => {
  const list = useSelector(selectList);

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
