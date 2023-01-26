import type { TaskType } from '@/features/tasks';

import {
  isTaskPastDue as _isTaskPastDue,
  isTaskDueToday as _isTaskDueToday,
  isTaskDueTomorrow as _isTaskDueTomorrow,
  isTaskDueInFuture as _isTaskDueInFuture,
} from './time';

export type FilterType = (_?: TaskType) => boolean;

/** Filters to completed tasks */
export const isTaskCompleted: FilterType = (task?: TaskType) =>
  typeof task !== 'undefined' && task.completed === true;

/** Filters to incomplete tasks */
export const isTaskNotCompleted: FilterType = (task?: TaskType) =>
  typeof task !== 'undefined' && task.completed === false;

/** Filters to incomplete tasks with the given tag id */
export const doesTaskHaveTag =
  (id?: string): FilterType =>
  (task?: TaskType) =>
    typeof task !== 'undefined' && task.tag === id && isTaskNotCompleted(task);

/** Filters to incomplete tasks that are past due */
export const isTaskPastDue: FilterType = (task?: TaskType) =>
  _isTaskPastDue(task) && isTaskNotCompleted(task);
/** Filters to incomplete tasks that are due today */
export const isTaskDueToday: FilterType = (task?: TaskType) =>
  _isTaskDueToday(task) && isTaskNotCompleted(task);
/** Filters to incomplete tasks that are due tomorrow */
export const isTaskDueTomorrow: FilterType = (task?: TaskType) =>
  _isTaskDueTomorrow(task) && isTaskNotCompleted(task);
/** Filters to incomplete tasks that are due in the future */
export const isTaskDueInFuture: FilterType = (task?: TaskType) =>
  _isTaskDueInFuture(task) && isTaskNotCompleted(task);
