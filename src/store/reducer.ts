// action types
import * as ACTION from './actions';

// types
import { LabelType, TaskType } from '../types';

import {
  getItem,
  createLabel,
  createTask,
  purgeLabel,
  sliceList,
  updateLabels,
} from './utils';

export type StateType = {
  list: TaskType[];
  labels: LabelType[];
  deleted: TaskType[];
  navOpen: boolean;
  sortBy: string;
};

export type ActionType = {
  type: string;
  payload?: any;
};

export type ReducerType<S, A> = (state: S, action: A) => S;

// action types
const {
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  EMPTY_TRASH,
  TOGGLE_NAV,
  RESTORE_TASK,
  CLOSE_NAV,
  CHANGE_SORT_ORDER,
  ADD_LABEL,
  UPDATE_LABEL,
  DELETE_LABEL,
} = ACTION;

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
const getIndexFromId = (list: any[], id: number): number => {
  return list.findIndex((item) => item.id === id);
};

// reducer
export const reducer: ReducerType<StateType, ActionType> = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    // creates a new task and appends it to the list
    case ADD_TASK: {
      const newList = [...state.list, createTask(payload)];
      return { ...state, list: newList }; // add item to end of list
    }
    // finds the task with given payload.id, and updates it with payload.data
    case UPDATE_TASK: {
      const { id, data } = payload;
      const index = getIndexFromId(state.list, id);
      if (index < 0) return state; // don't change the state if the item is not in the list
      const oldTask = { ...state.list[index] };
      const updatedItem = { ...oldTask, ...data }; // get all properties of original item, replace with any conflicting properties in payload data
      const newList = sliceList(state.list, index, updatedItem);
      return { ...state, list: newList };
    }
    case DELETE_TASK: {
      // getting the index of the item to delete
      const index = getIndexFromId(state.list, payload);
      if (index < 0) return state; // don't delete if item doesn't exist
      const task = { ...state.list[index] };
      const newDeleted = [task, ...state.deleted].slice(0, 10); // push deleted item to the trash, slicing trash to 10 items
      const newList = sliceList(state.list, index);
      return { ...state, list: newList, deleted: newDeleted };
    }
    case RESTORE_TASK: {
      const index = getIndexFromId(state.deleted, payload);
      if (index < 0) return state;
      const task = createTask(state.deleted[index]);
      const newDeleted = sliceList(state.deleted, index);
      const newList = [...state.list, task];
      return { ...state, list: newList, deleted: newDeleted };
    }
    case EMPTY_TRASH: {
      return { ...state, deleted: [] };
    }
    case CHANGE_SORT_ORDER: {
      return { ...state, sortBy: payload };
    }
    case TOGGLE_NAV: {
      return { ...state, navOpen: !state.navOpen };
    }
    case CLOSE_NAV: {
      return { ...state, navOpen: false };
    }
    // creates a new label
    // payload: { label: {name, color} }
    case ADD_LABEL: {
      const label = createLabel(payload.data);
      const newLabels = [...state.labels, label];
      return { ...state, labels: newLabels };
    }
    // updates an existing label, and updates the task list with the new label
    // payload: { old: {name, color, id}, update: {name, color} }
    case UPDATE_LABEL: {
      const { id, data } = payload;
      const index = getIndexFromId(state.labels, id);
      if (index < 0) return state;
      const label = { ...state.labels[index], ...data };
      // insert new label into labels array
      const newLabels = sliceList(state.labels, index, label);
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
    case DELETE_LABEL: {
      const { label } = payload;
      const index = getIndexFromId(state.labels, label.id);
      if (index < 0) return state;
      const newLabels = sliceList(state.labels, index);
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
