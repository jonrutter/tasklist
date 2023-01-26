import React from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// tasks
import { CompletedTaskList } from '@/features/tasks';

export const CompletedPage: React.FC = () => (
  <>
    <Helmet>
      <title>Completed | TaskList</title>
    </Helmet>

    <CompletedTaskList label="Completed" />
  </>
);
