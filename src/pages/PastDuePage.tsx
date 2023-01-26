import React, { useCallback } from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// tasks
import { TaskList, TaskCreateDropdown } from '@/features/tasks';

// utils
import { isTaskPastDue } from '@/utils/filters';

export const PastDuePage: React.FC = () => {
  const filter = useCallback(isTaskPastDue, []);

  return (
    <>
      <Helmet>
        <title>Past Due | TaskList</title>
      </Helmet>
      <TaskList label={'Past Due'} filter={filter} />
      <TaskCreateDropdown />
    </>
  );
};
