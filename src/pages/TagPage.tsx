import React from 'react';

// lodash helpers
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

// routing
import { useParams, Navigate } from 'react-router-dom';

// react helmet
import { Helmet } from 'react-helmet-async';

// tasks
import { selectList, TaskList, TaskCreateDropdown } from '@/features/tasks';

// tags
import { selectTags } from '@/features/tags';

// store
import { useSelector } from '@/app';

// types
import type { TaskType } from '@/features/tasks';
import type { TagType } from '@/features/tags';

const hasTag = (tag?: TagType) => (listItem: TaskType) =>
  get(listItem, 'tag.name', null) === get(tag, 'name');

export const TagPage: React.FC = () => {
  const list = useSelector(selectList);
  const tags = useSelector(selectTags);
  const { tag: paramTagName } = useParams();

  const tag = tags.find((tag) => tag.name === paramTagName);
  const filteredList = list.filter(hasTag(tag));

  if (!tag || isEmpty(tag)) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <Helmet>
        <title>{tag.name} | TaskList</title>
      </Helmet>
      <TaskList label={`Tag: ${tag.name}`} list={filteredList} />
      <TaskCreateDropdown defaultItem={{ tag: tag }} />
    </>
  );
};
