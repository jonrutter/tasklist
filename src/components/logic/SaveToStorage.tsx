import { useEffect } from 'react';

// store
import { useStore } from '@/store/useStore';

// types
import type { TaskType, TagType } from '@/types';

type StorageKey = 'list' | 'tags' | 'deleted';
type StorageValue = TaskType[] | TagType[];

// helper
const setItem = (name: StorageKey, value: StorageValue) =>
  localStorage.setItem(name, JSON.stringify(value));

/**
 * Utility component. Listens for state changes, and updates localStorage with the new state whenever state changes.
 */
export const SaveToStorage = () => {
  const { list, tags, deleted } = useStore();

  useEffect(() => {
    setItem('list', list);
    setItem('tags', tags);
    setItem('deleted', deleted);
    // setItem('sortBy', sortBy);
  }, [list, tags, deleted]);

  return null;
};
