import React, { useCallback } from 'react';

// routing
import { useParams, Navigate } from 'react-router-dom';

// react helmet
import { Helmet } from 'react-helmet-async';

// tasks
import { TaskList, TaskCreateDropdown } from '@/features/tasks';
import type { TaskType } from '@/features/tasks';

// tags
import { selectTagById } from '@/features/tags';

// store
import { useSelector } from '@/app';

// utils
import { doesTaskHaveTag } from '@/utils/filters';

export const TagPage: React.FC = () => {
  const { tagId } = useParams();
  const tag = useSelector(selectTagById(tagId));
  const filter = useCallback(
    (task?: TaskType) => doesTaskHaveTag(tagId)(task),
    [tagId]
  );

  if (!tagId || !tag) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <Helmet>
        <title>{tag.name} | TaskList</title>
      </Helmet>
      <TaskList label={`Tag: ${tag.name}`} filter={filter} />
      <TaskCreateDropdown defaultItem={{ tag: tagId }} />
    </>
  );
};
