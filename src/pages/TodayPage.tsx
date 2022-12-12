import React, { useRef } from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// tasks
import { selectList, TaskList, TaskCreateDropdown } from '@/features/tasks';

// store
import { useSelector } from '@/app';

// utils
import { isDueToday } from '../utils/time';

export const TodayPage: React.FC = () => {
  const list = useSelector(selectList);

  const filteredList = list.filter(isDueToday);

  // persist the data with useRef, to avoid unsyncing the data between Today and TaskCreateForm on subsequent rerenders (and unnecessarily triggering a warning popup when closing the form)
  const todayRef = useRef(new Date().getTime());
  return (
    <>
      <Helmet>
        <title>Today | TaskList</title>
      </Helmet>
      <TaskList label={'Today'} list={filteredList} />
      <TaskCreateDropdown defaultItem={{ due: todayRef.current }} />
    </>
  );
};
