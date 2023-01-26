import { createSlice, nanoid, createEntityAdapter } from '@reduxjs/toolkit';
import { readTasks } from './localStorage';

// tag actions
import { deleteTag } from '@/features/tags';

// types
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app';
import type { FilterType } from '@/utils/filters';
import { sortMap } from '@/utils/sort';

// types
export type PriorityType = 1 | 2 | 3 | 4;

export interface TaskIncompleteType {
  name: string;
  description: string;
  priority: PriorityType;
  due?: string;
  tag?: string;
  date?: string;
  id?: string;
  completed?: boolean;
}

export interface TaskType extends TaskIncompleteType {
  date: string;
  due?: string;
  id: string;
  completed: boolean;
}

// entity adapter
const tasksAdapter = createEntityAdapter<TaskType>({
  selectId: (task: TaskType) => task.id as string, // assert ids to be type string, since all ids are generated as strings by nanoid
});

// initial state
const persistedState = readTasks();

const initialState = persistedState
  ? tasksAdapter.getInitialState(persistedState)
  : tasksAdapter.getInitialState();

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    createTask: (state, action: PayloadAction<TaskIncompleteType>) => {
      const incompleteTask = action.payload;
      const newTask = {
        date: new Date().toJSON(),
        ...incompleteTask,
        id: nanoid(),
        completed: false,
      };
      tasksAdapter.addOne(state, newTask);
    },
    updateTask: (
      state,
      action: PayloadAction<{ id: string; data: TaskIncompleteType }>
    ) => {
      const { id, data } = action.payload;
      tasksAdapter.updateOne(state, { id, changes: data });
    },
    markTaskCompleted: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      tasksAdapter.updateOne(state, { id, changes: { completed: true } });
    },
    unmarkTaskCompleted: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      tasksAdapter.updateOne(state, { id, changes: { completed: false } });
    },
    deleteCompletedTasks: (state) => {
      const keysToRemove = state.ids.filter(
        (id) => state.entities[id]?.completed
      );
      tasksAdapter.removeMany(state, keysToRemove);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteTag, (state, action) => {
      const deletedTagId = action.payload;
      const affectedTaskIds = state.ids.filter(
        (id) => state.entities[id]?.tag === deletedTagId
      );
      const updated = affectedTaskIds.map((id) => ({
        id,
        changes: { ...state.entities[id], tag: undefined },
      }));
      tasksAdapter.updateMany(state, updated);
    });
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
export const selectTasks = (state: RootState) => state.tasks;

export const selectTaskIds = (state: RootState) => state.tasks.ids as string[];

export const selectFilteredTaskIds =
  (filterCallback: FilterType) => (state: RootState) =>
    state.tasks.ids.filter((id) =>
      filterCallback(state.tasks.entities[id])
    ) as string[];

export const selectTaskById = (id: string) => (state: RootState) =>
  state.tasks.entities[id];

export const selectNumberOfTasks =
  (filterCallback: FilterType) => (state: RootState) =>
    state.tasks.ids.filter((id) => filterCallback(state.tasks.entities[id]))
      .length;

export const selectSortedFilteredTaskIds =
  (filterCallback: FilterType) => (state: RootState) => {
    const sortBy = sortMap[state.settings.sortBy];
    const { ids, entities } = state.tasks;
    const filteredIds = ids.filter((id) => filterCallback(entities[id]));
    const sortedIds = filteredIds.sort((a, b) =>
      sortBy(entities[a], entities[b])
    );
    return sortedIds as string[];
  };
