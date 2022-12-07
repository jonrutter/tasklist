import React from 'react';

// components
import { LabelForm } from './LabelForm';

// store
import { useStore } from '@/store/useStore';

// types
import { LabelType, LabelIncompleteType } from '@/types';

type Props = {
  onClose: () => void;
  onDiscard: () => void;
  label: LabelType;
};

export const UpdateLabel: React.FC<Props> = ({ label, onClose, onDiscard }) => {
  const { dispatch } = useStore();

  const handleSubmit = (data: LabelIncompleteType) => {
    dispatch({
      type: 'UPDATE_LABEL',
      payload: { id: label.id, data },
    });
    onClose();
  };

  return (
    <LabelForm
      title="Update Label"
      onSubmit={handleSubmit}
      onClose={onDiscard}
      defaultValues={label}
    />
  );
};
