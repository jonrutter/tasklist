import { configureStore } from '@reduxjs/toolkit';

// reducers
import { reducer as tasksReducer } from '@/features/tasks';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

// extract root state and dispatch types
export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
