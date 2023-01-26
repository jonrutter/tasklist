import React, { useCallback } from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// tasks
import { TaskList, TaskCreateDropdown } from '@/features/tasks';

// utils
import { isTaskNotCompleted } from '@/utils/filters';

export const HomePage: React.FC = () => {
  const filter = useCallback(isTaskNotCompleted, []);

  return (
    <>
      <Helmet>
        <title>All Tasks | TaskList</title>
      </Helmet>
      <TaskList label={'All Tasks'} filter={filter} />
      <TaskCreateDropdown />
    </>
  );
};
