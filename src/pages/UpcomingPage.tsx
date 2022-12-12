import React from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// tasks
import { selectList, TaskList, TaskCreateDropdown } from '@/features/tasks';

// store
import { useSelector } from '@/app';

// utils
import { isDueInFuture } from '../utils/time';

export const UpcomingPage: React.FC = () => {
  const list = useSelector(selectList);

  const filteredList = list.filter(isDueInFuture);

  return (
    <>
      <Helmet>
        <title>Upcoming | TaskList</title>
      </Helmet>
      <TaskList label={'Upcoming'} list={filteredList} />
      <TaskCreateDropdown />
    </>
  );
};
