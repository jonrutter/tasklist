import { configureStore } from '@reduxjs/toolkit';
import { reducer as tasksReducer } from '@/features/tasks';
import { reducer as tagsReducer } from '@/features/tags';
import { reducer as settingsReducer } from '@/features/settings';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    tags: tagsReducer,
    settings: settingsReducer,
  },
});

// extract root state and dispatch types
export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export type AppStore = typeof store;
