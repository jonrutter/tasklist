import { createSlice } from '@reduxjs/toolkit';

// types
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app';
import type { SortName } from '@/utils/sort';

type SettingsState = {
  sortBy: SortName;
};

// initial state
const initialState: SettingsState = {
  sortBy: 'defaultSorting',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSortBy: (state, action: PayloadAction<SortName>) => {
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
