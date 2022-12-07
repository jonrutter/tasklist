import React from 'react';

// components
import { TaskForm } from './TaskForm';

// store
import { useStore } from '@/store/useStore';

// types
import type { TaskIncompleteType } from '@/types';

type Props = {
  onClose: () => void;
  onDiscard: () => void;
};

/**
 * Handles the logic of creating tasks, and composes TaskForm to render the form ui.
 */
export const CreateTask: React.FC<Props> = ({ onClose, onDiscard }) => {
  const { dispatch } = useStore();

  const handleSubmit = (data: TaskIncompleteType) => {
    dispatch({
      type: 'ADD_TASK',
      payload: { ...data },
    });
    onClose();
  };

  return <TaskForm onSubmit={handleSubmit} onClose={onDiscard} />;
};
