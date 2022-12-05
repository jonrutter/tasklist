// types
import {
  LabelIncompleteType,
  LabelType,
  TaskIncompleteType,
  TaskType,
} from '../types';

import {
  getItem,
  createLabel,
  createTask,
  purgeLabel,
  sliceList,
  updateLabels,
} from './utils';
import { SortOption } from '../components/TaskListSettings';
import { Reducer } from 'react';

export type StateType = {
  list: TaskType[];
  labels: LabelType[];
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
      type: 'ADD_LABEL';
      payload: LabelIncompleteType;
    }
  | {
      type: 'UPDATE_LABEL';
      payload: { id: string; data: LabelIncompleteType };
    }
  | {
      type: 'DELETE_LABEL';
      payload: { label: LabelType };
    };

export type ReducerType<S, A> = (state: S, action: A) => S;

// default state
export const defaultState = {
  list: (getItem('list') as TaskType[]) || [],
  labels: (getItem('labels') as LabelType[]) || [],
  deleted: (getItem('deleted') as TaskType[]) || [],
  navOpen: false,
  sortBy: localStorage.getItem('sortBy') || 'default',
};

/**
 * Returns the index of the first list item with the given id, or -1 if none found.
 */
const getIndexFromId = (list: TaskType[] | LabelType[], id: string): number => {
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
    // creates a new label
    // payload: { label: {name, color} }
    case 'ADD_LABEL': {
      const incomplete = action.payload;
      const label = createLabel(incomplete);
      const newLabels = [...state.labels, label];
      return { ...state, labels: newLabels };
    }
    // updates an existing label, and updates the task list with the new label
    // payload: { old: {name, color, id}, update: {name, color} }
    case 'UPDATE_LABEL': {
      const { id, data } = action.payload;
      const index = getIndexFromId(state.labels, id);
      if (index < 0) return state;
      const label = { ...state.labels[index], ...data };
      // insert new label into labels array
      const newLabels = sliceList<LabelType>(state.labels, index, label);
      // update task list by updating tasks with new label
      const newList = updateLabels(state.list, state.labels[index], label);
      const newDeleted = updateLabels(
        state.deleted,
        state.labels[index],
        label
      );
      return {
        ...state,
        labels: newLabels,
        list: newList,
        deleted: newDeleted,
      };
    }
    // deletes an existing label, and updates the task list by deleting all references to the old label
    // payload: { label: name, color, id }
    case 'DELETE_LABEL': {
      const { label } = action.payload;
      const index = getIndexFromId(state.labels, label.id);
      if (index < 0) return state;
      const newLabels = sliceList<LabelType>(state.labels, index);
      const newList = purgeLabel(state.list, label);
      const newDeleted = purgeLabel(state.deleted, label);
      return {
        ...state,
        labels: newLabels,
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
