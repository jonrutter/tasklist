import isToday from 'date-fns/isToday';
import isTomorrow from 'date-fns/isTomorrow';
import isBefore from 'date-fns/isBefore';
import startOfToday from 'date-fns/startOfToday';

import type { TaskType } from '@/features/tasks';

export const dueDate =
  (callback: (date: Date) => boolean) => (task: TaskType) =>
    task.due ? callback(task.due) : null;

export const isInPast = (date: Date) => isBefore(date, startOfToday());
export const isInFuture = (date: Date) => !isInPast(date);

export const isDueToday = (task: TaskType) => dueDate(isToday)(task);
export const isDueTomorrow = (task: TaskType) => dueDate(isTomorrow)(task);
export const isDueInFuture = (task: TaskType) => dueDate(isInFuture)(task);
export const isPastDue = (task: TaskType) => dueDate(isInPast)(task);
