import React, { useCallback } from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// tasks
import { TaskList, TaskCreateDropdown } from '@/features/tasks';

// utils
import { isTaskDueInFuture } from '@/utils/filters';

export const UpcomingPage: React.FC = () => {
  const filter = useCallback(isTaskDueInFuture, []);

  return (
    <>
      <Helmet>
        <title>Upcoming | TaskList</title>
      </Helmet>
      <TaskList label={'Upcoming'} filter={filter} />
      <TaskCreateDropdown />
    </>
  );
};
