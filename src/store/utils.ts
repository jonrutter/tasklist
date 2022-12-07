import { v4 as uuidv4 } from 'uuid';

import type {
  TaskIncompleteType,
  TaskType,
  TagIncompleteType,
  TagType,
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
 * Returns a new, correctly formatted tag object.
 */
export const createTag = (tag: TagIncompleteType): TagType => ({
  ...tag,
  id: tag.id || uuidv4(),
});

/**
 * Returns a copy of the specified array, with the item at the given index removed, and optionally replaced with a new item.
 *
 * Does not mutate the original list.
 */
export const sliceList = <T>(list: T[], index: number, item?: T) =>
  item
    ? [...list.slice(0, index), item, ...list.slice(index + 1)]
    : [...list.slice(0, index), ...list.slice(index + 1)];

/**
 * Returns true or false whether a task has a given tag.
 */
export const taskHasTag = (task: TaskType, tag: TagType): boolean =>
  task.tag?.id === tag.id;

/**
 * Returns a new copy of a task, with an updated tag
 */
export const updateTaskTag = (task: TaskType, newTag?: TagType) => ({
  ...task,
  tag: newTag,
});

/**
 * Returns a new copy of a task without its tag
 */
export const clearTaskTag = (task: TaskType) => updateTaskTag(task, undefined);

/**
 * Updates all references to a tag in a task list.
 */
export const updateTags = (
  list: TaskType[],
  oldTag: TagType,
  newTag: TagType
): TaskType[] =>
  list.map((task) =>
    taskHasTag(task, oldTag) ? updateTaskTag(task, newTag) : task
  );

/**
 * Returns a copy of a list with all references to the tag removed.
 */
export const purgeTag = (list: TaskType[], tag: TagType) =>
  list.map((task) => (taskHasTag(task, tag) ? clearTaskTag(task) : task));
