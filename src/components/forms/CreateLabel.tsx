import React from 'react';

import { LabelForm } from './LabelForm';

import { LabelIncompleteType } from '../../types';
import { useStore } from '../../store/useStore';

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
