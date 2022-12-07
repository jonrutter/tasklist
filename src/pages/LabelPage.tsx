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
import { TaskType, LabelType } from '../types';

const hasLabel = (label?: LabelType) => (listItem: TaskType) =>
  get(listItem, 'label.name', null) === get(label, 'name');

export const LabelPage: React.FC = () => {
  const { list, labels } = useStore();
  const { label: paramLabelName } = useParams();

  const label = labels.find((label) => label.name === paramLabelName);
  const filteredList = list.filter(hasLabel(label));

  if (!label || isEmpty(label)) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <Layout>
      <Helmet>
        <title>{label.name} | TaskList</title>
      </Helmet>
      <TaskList label={`Label: ${label.name}`} list={filteredList} />
      <TaskCreateDropdown defaultItem={{ label: label }} />
    </Layout>
  );
};
