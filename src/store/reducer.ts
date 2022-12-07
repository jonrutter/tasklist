// utils
import {
  getItem,
  createTag,
  createTask,
  purgeTag,
  sliceList,
  updateTags,
} from './utils';

// types
import {
  TagIncompleteType,
  TagType,
  TaskIncompleteType,
  TaskType,
} from '../types';
import type { SortOption } from '../components/TaskListSettings';
import type { Reducer } from 'react';

export type StateType = {
  list: TaskType[];
  tags: TagType[];
  deleted: TaskType[];
  navOpen: boolean;
  sortBy: string;
};

export type ActionType =
  | {
      type: 'ADD_TASK';
      payload: TaskIncompleteType;
    }
  | {
      type: 'UPDATE_TASK';
      payload: { id: string; data: TaskIncompleteType };
    }
  | {
      type: 'DELETE_TASK';
      payload: string;
    }
  | {
      type: 'EMPTY_TRASH';
    }
  | {
      type: 'TOGGLE_NAV';
    }
  | {
      type: 'RESTORE_TASK';
      payload: string;
    }
  | {
      type: 'CLOSE_NAV';
      payload: boolean;
    }
  | {
      type: 'CHANGE_SORT_ORDER';
      payload: SortOption;
    }
  | {
      type: 'ADD_TAG';
      payload: TagIncompleteType;
    }
  | {
      type: 'UPDATE_TAG';
      payload: { id: string; data: TagIncompleteType };
    }
  | {
      type: 'DELETE_TAG';
      payload: { tag: TagType };
    };

export type ReducerType<S, A> = (state: S, action: A) => S;

// default state
export const defaultState: StateType = {
  list: (getItem('list') as TaskType[]) || [],
  tags: (getItem('tags') as TagType[]) || [],
  deleted: (getItem('deleted') as TaskType[]) || [],
  navOpen: false,
  sortBy: localStorage.getItem('sortBy') || 'default',
};

/**
 * Returns the index of the first list item with the given id, or -1 if none found.
 */
const getIndexFromId = (list: TaskType[] | TagType[], id: string): number => {
  return list.findIndex((item) => item.id === id);
};

// reducer
export const reducer: Reducer<StateType, ActionType> = (state, action) => {
  const { type } = action;
  switch (type) {
    // creates a new task and appends it to the list
    case 'ADD_TASK': {
      const incomplete = action.payload;
      const newList = [...state.list, createTask(incomplete)];
      return { ...state, list: newList }; // add item to end of list
    }
    // finds the task with given payload.id, and updates it with payload.data
    case 'UPDATE_TASK': {
      const { id, data } = action.payload;
      const index = getIndexFromId(state.list, id);
      if (index < 0) return state; // don't change the state if the item is not in the list
      const oldTask = { ...state.list[index] };
      const updatedItem = { ...oldTask, ...data }; // get all properties of original item, replace with any conflicting properties in payload data
      const newList = sliceList<TaskType>(state.list, index, updatedItem);
      return { ...state, list: newList };
    }
    case 'DELETE_TASK': {
      // getting the index of the item to delete
      const id = action.payload;
      const index = getIndexFromId(state.list, id);
      if (index < 0) return state; // don't delete if item doesn't exist
      const task = { ...state.list[index] };
      const newDeleted = [task, ...state.deleted].slice(0, 10); // push deleted item to the trash, slicing trash to 10 items
      const newList = sliceList<TaskType>(state.list, index);
      return { ...state, list: newList, deleted: newDeleted };
    }
    case 'RESTORE_TASK': {
      const id = action.payload;
      const index = getIndexFromId(state.deleted, id);
      if (index < 0) return state;
      const task = createTask(state.deleted[index]);
      const newDeleted = sliceList<TaskType>(state.deleted, index);
      const newList = [...state.list, task];
      return { ...state, list: newList, deleted: newDeleted };
    }
    case 'EMPTY_TRASH': {
      return { ...state, deleted: [] };
    }
    case 'CHANGE_SORT_ORDER': {
      const order = action.payload;
      return { ...state, sortBy: order };
    }
    case 'TOGGLE_NAV': {
      return { ...state, navOpen: !state.navOpen };
    }
    case 'CLOSE_NAV': {
      return { ...state, navOpen: false };
    }
    // creates a new tag
    case 'ADD_TAG': {
      const incomplete = action.payload;
      const tag = createTag(incomplete);
      const newTags = [...state.tags, tag];
      return { ...state, tags: newTags };
    }
    // updates an existing tag, and updates the task list with the new tag
    case 'UPDATE_TAG': {
      const { id, data } = action.payload;
      const index = getIndexFromId(state.tags, id);
      if (index < 0) return state;
      const tag = { ...state.tags[index], ...data };
      // insert new tag into tags array
      const newTags = sliceList<TagType>(state.tags, index, tag);
      // update task list by updating tasks with new tag
      const newList = updateTags(state.list, state.tags[index], tag);
      const newDeleted = updateTags(state.deleted, state.tags[index], tag);
      return {
        ...state,
        tags: newTags,
        list: newList,
        deleted: newDeleted,
      };
    }
    // deletes an existing tag, and updates the task list by deleting all references to the old tag
    case 'DELETE_TAG': {
      const { tag } = action.payload;
      const index = getIndexFromId(state.tags, tag.id);
      if (index < 0) return state;
      const newTags = sliceList<TagType>(state.tags, index);
      const newList = purgeTag(state.list, tag);
      const newDeleted = purgeTag(state.deleted, tag);
      return {
        ...state,
        tags: newTags,
        list: newList,
        deleted: newDeleted,
      };
    }
    default: {
      console.warn('Unknown action type');
      return state;
    }
  }
};
