import { useEffect } from 'react';

// store
import { useStore } from '../store/useStore';
import { TaskType, LabelType } from '../types';

type StorageKey = 'list' | 'labels' | 'deleted';
type StorageValue = TaskType[] | LabelType[];

const setItem = (name: StorageKey, value: StorageValue) =>
  localStorage.setItem(name, JSON.stringify(value));

/**
 * Utility component. Listens for state changes, and updates localStorage with the new state whenever state changes.
 */
const SaveToStorage = () => {
  const { list, labels, deleted } = useStore();

  useEffect(() => {
    setItem('list', list);
    setItem('labels', labels);
    setItem('deleted', deleted);
    // setItem('sortBy', sortBy);
  }, [list, labels, deleted]);

  return null;
};

export default SaveToStorage;
