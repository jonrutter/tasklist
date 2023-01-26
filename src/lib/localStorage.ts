import type { EntityState } from '@reduxjs/toolkit';

/**
 * Attempts to read a given state key from localStorage, and calls the specified callback function.
 */
export const getItem = <T>(
  key: string,
  onSuccess: (_: unknown) => EntityState<T> | null
): EntityState<T> | null => {
  try {
    // get state from localStorage
    const serializedState = localStorage.getItem('state');
    // if no localStorage entry, just return null
    if (serializedState === null) return null;
    const state = JSON.parse(serializedState);
    // if state is not an object with the given key property, return null
    if (typeof state !== 'object' || state === null || !(key in state))
      return null;
    // return the result of calling the callback function with the parsed state slice
    return onSuccess(state[key]);
  } catch (err) {
    // default to null in case of errors
    return null;
  }
};
