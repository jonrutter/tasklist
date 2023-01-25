import React from 'react';

// components
import { TaskForm } from './TaskForm';

// store
import { useDispatch } from '@/app';
import { updateTask } from '../store/tasksSlice';

// types
import type { TaskIncompleteType, TaskType } from '../store/tasksSlice';

type Props = {
  onClose: () => void;
  onDiscard: () => void;
  task: TaskType;
};

/**
 * Handles the logic of updating tasks. Composes TaskForm for rendering the UI.
 */
export const UpdateTask: React.FC<Props> = ({ task, onClose, onDiscard }) => {
  const dispatch = useDispatch();

  const handleSubmit = (data: TaskIncompleteType) => {
    dispatch(updateTask({ id: task.id, data }));
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
