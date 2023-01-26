import React, { useRef, useCallback } from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// tasks
import { TaskList, TaskCreateDropdown } from '@/features/tasks';

// utils
import { isTaskDueToday } from '@/utils/filters';

export const TodayPage: React.FC = () => {
  // persist the data with useRef, to avoid unsyncing the data between Today and TaskCreateForm on subsequent rerenders (and unnecessarily triggering a warning popup when closing the form)
  const todayDateStringRef = useRef(new Date().toJSON());

  const filter = useCallback(isTaskDueToday, []);
  return (
    <>
      <Helmet>
        <title>Today | TaskList</title>
      </Helmet>
      <TaskList label={'Today'} filter={filter} />
      <TaskCreateDropdown defaultItem={{ due: todayDateStringRef.current }} />
    </>
  );
};
