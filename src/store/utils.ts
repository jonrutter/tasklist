import { v4 as uuidv4 } from 'uuid';

import type {
  TaskIncompleteType,
  TaskType,
  LabelIncompleteType,
  LabelType,
} from '../types';

import type { StateType } from './reducer';

// localstorage
export const getItem = (name: keyof StateType) => {
  const persistedState = localStorage.getItem(name);
  if (typeof persistedState === 'string') {
    const parsedState = JSON.parse(persistedState);
    if (!parsedState) return null;
    if ((name === 'list' || name === 'deleted') && Array.isArray(parsedState)) {
      return parsedState.map((item) => ({
        ...item,
        date: new Date(Date.parse(item.date)),
        due: item.due ? new Date(Date.parse(item.due)) : undefined,
      }));
    } else {
      return parsedState;
    }
  } else {
    return null;
  }
};

/**
 * Returns a new, correctly formatted task object.
 */
export const createTask = (task: TaskIncompleteType): TaskType => ({
  ...task,
  date: task.date || new Date(),
  id: task.id || uuidv4(),
});

/**
 * Returns a new, correctly formatted label object.
 */
export const createLabel = (label: LabelIncompleteType): LabelType => ({
  ...label,
  id: label.id || uuidv4(),
});

/**
 * Returns a copy of the specified array, with the item at the given index removed, and optionally replaced with a new item.
 *
 * Does not mutate the original list.
 */
export const sliceList = (list: unknown[], index: number, item?: unknown) =>
  item
    ? [...list.slice(0, index), item, ...list.slice(index + 1)]
    : [...list.slice(0, index), ...list.slice(index + 1)];

/**
 * Returns true or false whether a task has a given label.
 */
export const taskHasLabel = (task: TaskType, label: LabelType): boolean =>
  task.label?.id === label.id;

/**
 * Returns a new copy of a task, with an updated label
 */
export const updateTaskLabel = (task: TaskType, newLabel?: LabelType) => ({
  ...task,
  label: newLabel,
});

/**
 * Returns a new copy of a task without its label
 */
export const clearTaskLabel = (task: TaskType) =>
  updateTaskLabel(task, undefined);

/**
 * Updates all references to a label in a task list.
 */
export const updateLabels = (
  list: TaskType[],
  oldLabel: LabelType,
  newLabel: LabelType
): TaskType[] =>
  list.map((task) =>
    taskHasLabel(task, oldLabel) ? updateTaskLabel(task, newLabel) : task
  );

/**
 * Returns a copy of a list with all references to the label removed.
 */
export const purgeLabel = (list: TaskType[], label: LabelType) =>
  list.map((task) => (taskHasLabel(task, label) ? clearTaskLabel(task) : task));
