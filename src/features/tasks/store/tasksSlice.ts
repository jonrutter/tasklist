// TODO: subscribe to tag updating/deleting actions

import { createSlice, nanoid } from '@reduxjs/toolkit';

// types
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app';
import type { TagType } from '@/features/tags';

// types

export type PriorityType = 1 | 2 | 3 | 4;

export interface TaskIncompleteType {
  name: string;
  description: string;
  priority: PriorityType;
  due?: Date;
  tag?: TagType;
  date?: Date;
  id?: string;
  completed?: boolean;
}

export interface TaskType extends TaskIncompleteType {
  date: Date;
  id: string;
  completed: boolean;
}

type TaskState = TaskType[];

const initialState: TaskState = [];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    createTask: (state, action: PayloadAction<TaskIncompleteType>) => {
      const incompleteTask = action.payload;
      const newTask = {
        date: new Date(),
        ...incompleteTask,
        id: nanoid(),
        completed: false,
      };
      state.push(newTask);
    },
    updateTask: (
      state,
      action: PayloadAction<{ id: string; data: TaskIncompleteType }>
    ) => {
      const { id, data } = action.payload;
      // updating the list with the given id with the new data
      return state.map((item) =>
        item.id === id
          ? {
              ...item,
              ...data,
            }
          : item
      );
    },
    markTaskCompleted: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      return state.map((item) =>
        item.id === id ? { ...item, completed: true } : item
      );
    },
    unmarkTaskCompleted: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      return state.map((item) =>
        item.id === id ? { ...item, completed: false } : item
      );
    },
    deleteCompletedTasks: (state) => {
      return state.filter((item) => !item.completed);
    },
  },
});

// export action creators
export const {
  createTask,
  updateTask,
  markTaskCompleted,
  unmarkTaskCompleted,
  deleteCompletedTasks,
} = tasksSlice.actions;

// export reducer
export const { reducer } = tasksSlice;

// export selectors
export const selectList = (state: RootState) =>
  state.tasks.filter((i) => !i.completed);

export const selectCompleted = (state: RootState) =>
  state.tasks.filter((i) => i.completed);

export const selectTask = (id: string) => (state: RootState) =>
  state.tasks.find((item) => item.id === id);
