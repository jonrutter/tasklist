import { createSlice } from '@reduxjs/toolkit';

// types
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app';

export type SortByOption =
  | 'alphabetically'
  | 'name'
  | 'due date'
  | 'priority'
  | 'date added'
  | 'default';

type SettingsState = {
  sortBy: SortByOption;
};

// initial state
const initialState: SettingsState = {
  sortBy: 'default',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSortBy: (state, action: PayloadAction<SortByOption>) => {
      state.sortBy = action.payload;
    },
  },
});

// export action creators
export const { updateSortBy } = settingsSlice.actions;

// export reducer
export const reducer = settingsSlice.reducer;

// export selectors
export const selectSortBy = (state: RootState) => state.settings.sortBy;
