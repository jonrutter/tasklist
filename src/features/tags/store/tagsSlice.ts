import { createSlice, nanoid } from '@reduxjs/toolkit';

// types
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app';
import type { ColorType } from '@/data/colors';

export interface TagIncompleteType {
  name: string;
  color?: ColorType;
  id?: string;
}
export interface TagType extends TagIncompleteType {
  id: string;
}

type TagState = TagType[];

const initialState: TagState = [];

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    createTag: (state, action: PayloadAction<TagIncompleteType>) => {
      const incompleteTag = action.payload;
      const newTask = {
        ...incompleteTag,
        id: nanoid(),
      };
      state.push(newTask);
    },
    updateTag: (
      state,
      action: PayloadAction<{ id: string; data: TagIncompleteType }>
    ) => {
      const { id, data } = action.payload;
      return state.map((tag) => (tag.id === id ? { ...tag, ...data } : tag));
    },
    deleteTag: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      return state.filter((tag) => tag.id !== id);
    },
  },
});

export const { createTag, updateTag, deleteTag } = tagsSlice.actions;

export const { reducer } = tagsSlice;

export const selectTags = (state: RootState) => state.tags;
