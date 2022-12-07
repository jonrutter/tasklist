import React from 'react';

// components
import { TaskForm } from './TaskForm';

// store
import { useStore } from '@/store/useStore';

// types
import type { TaskIncompleteType, TaskType } from '@/types';

type Props = {
  onClose: () => void;
  onDiscard: () => void;
  task: TaskType;
};

/**
 * Handles the logic of updating tasks. Composes TaskForm for rendering the UI.
 */
export const UpdateTask: React.FC<Props> = ({ task, onClose, onDiscard }) => {
  const { dispatch } = useStore();

  const handleSubmit = (data: TaskIncompleteType) => {
    console.log(data);
    dispatch({
      type: 'UPDATE_TASK',
      payload: { id: task.id, data },
    });
    onClose();
  };

  return (
    <TaskForm
      title="Update Task"
      onSubmit={handleSubmit}
      onClose={onDiscard}
      defaultValues={task}
    />
  );
};
