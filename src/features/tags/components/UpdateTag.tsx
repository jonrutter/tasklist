import React from 'react';

// components
import { TagForm } from './TagForm';

// store
import { useStore } from '@/store/useStore';

// types
import { TagType, TagIncompleteType } from '@/types';

type Props = {
  onClose: () => void;
  onDiscard: () => void;
  tag: TagType;
};

export const UpdateTag: React.FC<Props> = ({ tag, onClose, onDiscard }) => {
  const { dispatch } = useStore();

  const handleSubmit = (data: TagIncompleteType) => {
    dispatch({
      type: 'UPDATE_TAG',
      payload: { id: tag.id, data },
    });
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
