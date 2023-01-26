import React from 'react';

// components
import { TagForm } from './TagForm';

// store
import { useDispatch } from '@/app';
import { updateTag } from '../store/tagsSlice';

// types
import type { TagType, TagIncompleteType } from '../store/tagsSlice';

type Props = {
  onClose: () => void;
  onDiscard: () => void;
  tag: TagType;
};

export const UpdateTag: React.FC<Props> = ({ tag, onClose, onDiscard }) => {
  const dispatch = useDispatch();

  const handleSubmit = (data: TagIncompleteType) => {
    dispatch(updateTag({ id: tag.id, data }));
    onClose();
  };

  return (
    <TagForm
      title="Update Tag"
      onSubmit={handleSubmit}
      onClose={onDiscard}
      defaultValues={tag}
    />
  );
};
