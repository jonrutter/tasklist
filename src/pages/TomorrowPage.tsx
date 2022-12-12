import React, { useRef } from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// date-fns
import add from 'date-fns/add';

// components
import { Layout } from '@/components/layout/Layout';

// tasks
import { selectList, TaskList, TaskCreateDropdown } from '@/features/tasks';

// store
import { useSelector } from '@/app';

// utils
import { isDueTomorrow } from '@/utils/time';

export const TomorrowPage: React.FC = () => {
  const list = useSelector(selectList);

  const filteredList = list.filter(isDueTomorrow);

  // persist the data with useRef, to avoid unsyncing the data between Tomorrow and TaskCreateForm on subsequent rerenders (and unnecessarily triggering a warning popup when closing the form)
  const tomorrowRef = useRef(add(new Date(), { days: 1 }).getTime());

  return (
    <Layout>
      <Helmet>
        <title>Tomorrow | TaskList</title>
      </Helmet>
      <TaskList label={'Tomorrow'} list={filteredList} />
      <TaskCreateDropdown defaultItem={{ due: tomorrowRef.current }} />
    </Layout>
  );
};
