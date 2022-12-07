import React from 'react';

// lodash helpers
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

// routing
import { useParams, Navigate } from 'react-router-dom';

// react helmet
import { Helmet } from 'react-helmet-async';

// components
import { Layout } from '@/components/layout/Layout';
import { TaskList, TaskCreateDropdown } from '@/features/tasks';

// store
import { useStore } from '../store/useStore';

// types
import { TaskType, TagType } from '../types';

const hasTag = (tag?: TagType) => (listItem: TaskType) =>
  get(listItem, 'tag.name', null) === get(tag, 'name');

export const TagPage: React.FC = () => {
  const { list, tags } = useStore();
  const { tag: paramTagName } = useParams();

  const tag = tags.find((tag) => tag.name === paramTagName);
  const filteredList = list.filter(hasTag(tag));

  if (!tag || isEmpty(tag)) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <Layout>
      <Helmet>
        <title>{tag.name} | TaskList</title>
      </Helmet>
      <TaskList label={`Tag: ${tag.name}`} list={filteredList} />
      <TaskCreateDropdown defaultItem={{ tag: tag }} />
    </Layout>
  );
};
