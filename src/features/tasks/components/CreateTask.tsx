import React from 'react';

// components
import { TaskForm } from './TaskForm';

// store
import { useDispatch } from '@/app';
import { createTask } from '../store/tasksSlice';

// types
import type { TaskIncompleteType, TaskType } from '../store/tasksSlice';

type Props = {
  onClose: () => void;
  onDiscard: () => void;
  defaultItem?: Partial<TaskType>;
};

/**
 * Handles the logic of creating tasks, and composes TaskForm to render the form ui.
 */
export const CreateTask: React.FC<Props> = ({
  onClose,
  onDiscard,
  defaultItem,
}) => {
  const dispatch = useDispatch();

  const handleSubmit = (data: TaskIncompleteType) => {
    dispatch(createTask(data));
    onClose();
  };

  return (
    <TaskForm
      onSubmit={handleSubmit}
      onClose={onDiscard}
      defaultValues={defaultItem}
    />
  );
};
