import React, { useCallback, useRef } from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// date-fns
import add from 'date-fns/add';

// tasks
import { TaskList, TaskCreateDropdown } from '@/features/tasks';

// utils
import { isTaskDueTomorrow } from '@/utils/filters';

export const TomorrowPage: React.FC = () => {
  // persist the data with useRef, to avoid unsyncing the data between Tomorrow and TaskCreateForm on subsequent rerenders (and unnecessarily triggering a warning popup when closing the form)
  const tomorrowDateStringRef = useRef(add(new Date(), { days: 1 }).toJSON());

  const filter = useCallback(isTaskDueTomorrow, []);

  return (
    <>
      <Helmet>
        <title>Tomorrow | TaskList</title>
      </Helmet>
      <TaskList label={'Tomorrow'} filter={filter} />
      <TaskCreateDropdown
        defaultItem={{ due: tomorrowDateStringRef.current }}
      />
    </>
  );
};
