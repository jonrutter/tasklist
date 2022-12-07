import { useEffect } from 'react';

// store
import { useStore } from '@/store/useStore';

// types
import type { TaskType, LabelType } from '@/types';

type StorageKey = 'list' | 'labels' | 'deleted';
type StorageValue = TaskType[] | LabelType[];

// helper
const setItem = (name: StorageKey, value: StorageValue) =>
  localStorage.setItem(name, JSON.stringify(value));

/**
 * Utility component. Listens for state changes, and updates localStorage with the new state whenever state changes.
 */
export const SaveToStorage = () => {
  const { list, labels, deleted } = useStore();

  useEffect(() => {
    setItem('list', list);
    setItem('labels', labels);
    setItem('deleted', deleted);
    // setItem('sortBy', sortBy);
  }, [list, labels, deleted]);

  return null;
};
