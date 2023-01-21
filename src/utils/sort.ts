import type { TaskType } from '@/features/tasks';

export type SortCallbackType = (a?: TaskType, b?: TaskType) => number;

const alphabetically: SortCallbackType = (a?, b?) => {
  if (typeof a === 'undefined' || typeof b === 'undefined') return 0;
  return a.name === b.name ? 0 : a.name < b.name ? -1 : 1;
};

const priority: SortCallbackType = (a?, b?) => {
  if (typeof a === 'undefined' || typeof b === 'undefined') return 0;
  return a.priority - b.priority;
};

const dueDate: SortCallbackType = (a?, b?) => {
  if (typeof a === 'undefined' || typeof b === 'undefined') return 0;
  if (!b.due) return -1;
  if (!a.due) return 1;
  return new Date(a.due).getTime() - new Date(b.due).getTime();
};

const dateAdded: SortCallbackType = () => 0;

const defaultSorting = dateAdded;

export const sortMap = {
  alphabetically,
  priority,
  dueDate,
  dateAdded,
  defaultSorting,
};

export type SortName = keyof typeof sortMap;
