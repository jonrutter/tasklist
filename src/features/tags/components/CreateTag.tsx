import React from 'react';

// components
import { TagForm } from './TagForm';

// store
import { useDispatch } from '@/app';
import { createTag } from '../store/tagsSlice';

// types
import type { TagIncompleteType } from '../store/tagsSlice';

type Props = {
  onClose: () => void;
  onDiscard: () => void;
};

export const CreateTag: React.FC<Props> = ({ onClose, onDiscard }) => {
  const dispatch = useDispatch();

  const handleSubmit = (data: TagIncompleteType) => {
    dispatch(createTag(data));
    onClose();
  };

  return <TagForm onSubmit={handleSubmit} onClose={onDiscard} />;
};
