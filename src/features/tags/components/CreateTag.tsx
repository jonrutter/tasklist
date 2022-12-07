import React from 'react';

// components
import { TagForm } from './TagForm';

// store
import { useStore } from '@/store/useStore';

// types
import { TagIncompleteType } from '@/types';

type Props = {
  onClose: () => void;
  onDiscard: () => void;
};

export const CreateTag: React.FC<Props> = ({ onClose, onDiscard }) => {
  const { dispatch } = useStore();

  const handleSubmit = (data: TagIncompleteType) => {
    dispatch({
      type: 'ADD_TAG',
      payload: data,
    });
    onClose();
  };

  return <TagForm onSubmit={handleSubmit} onClose={onDiscard} />;
};
