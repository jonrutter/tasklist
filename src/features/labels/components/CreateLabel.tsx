import React from 'react';

// components
import { LabelForm } from './LabelForm';

// store
import { useStore } from '@/store/useStore';

// types
import { LabelIncompleteType } from '@/types';

type Props = {
  onClose: () => void;
  onDiscard: () => void;
};

export const CreateLabel: React.FC<Props> = ({ onClose, onDiscard }) => {
  const { dispatch } = useStore();

  const handleSubmit = (data: LabelIncompleteType) => {
    dispatch({
      type: 'ADD_LABEL',
      payload: data,
    });
    onClose();
  };

  return <LabelForm onSubmit={handleSubmit} onClose={onDiscard} />;
};
