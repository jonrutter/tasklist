// date fns
import isToday from 'date-fns/isToday';
import isTomorrow from 'date-fns/isTomorrow';
import isBefore from 'date-fns/isBefore';
import startOfToday from 'date-fns/startOfToday';

// types
import type { TaskType } from '@/features/tasks';

export const isInPast = (date: Date) => isBefore(date, startOfToday());
export const isInFuture = (date: Date) => !isInPast(date);

export const isTaskPastDue = (task?: TaskType) =>
  task?.due ? isInPast(new Date(task.due)) : false;

export const isTaskDueToday = (task?: TaskType) =>
  task?.due ? isToday(new Date(task.due)) : false;

export const isTaskDueTomorrow = (task?: TaskType) =>
  task?.due ? isTomorrow(new Date(task.due)) : false;

export const isTaskDueInFuture = (task?: TaskType) =>
  task?.due ? !isInPast(new Date(task.due)) : false;
