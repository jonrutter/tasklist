import {
  isInPast,
  isInFuture,
  isTaskPastDue,
  isTaskDueToday,
  isTaskDueTomorrow,
  isTaskDueInFuture,
} from '../time';
import {
  add,
  endOfToday,
  endOfTomorrow,
  endOfYesterday,
  startOfDay,
  startOfToday,
  startOfTomorrow,
  sub,
} from 'date-fns';
import { TaskType } from '@/features/tasks';

const makeTaskWithDueDate = (due?: Date): TaskType => ({
  completed: false,
  name: 'Test Task',
  description: 'Test Description',
  id: '0',
  priority: 4,
  date: new Date().toJSON(),
  due: due ? due.toJSON() : undefined,
});

describe('isInPast util', () => {
  it('correctly identifies past dates', () => {
    // date representing yesterday
    const pastDate = sub(new Date(), { days: 1 });
    expect(isInPast(pastDate)).toBeTruthy();
  });
  it('correctly identifies today as not in the past', () => {
    expect(isInPast(new Date())).toBeFalsy();
  });
  it('correctly identifies future dates as not in the past', () => {
    // date representing tomorrow
    const futureDate = add(new Date(), { days: 1 });
    expect(isInPast(futureDate)).toBeFalsy();
  });
});

describe('isInFuture util', () => {
  it('correctly identifies past dates as not in the future', () => {
    // date representing yesterday
    const pastDate = sub(new Date(), { days: 1 });
    expect(isInFuture(pastDate)).toBeFalsy();
  });
  it('correctly identifies today as a "future date"', () => {
    expect(isInFuture(new Date())).toBeTruthy();
  });
  it('correctly identifies future dates', () => {
    // date representing tomorrow
    const futureDate = add(new Date(), { days: 1 });
    expect(isInFuture(futureDate)).toBeTruthy();
  });
});

describe('isTaskPastDue', () => {
  it('returns true for tasks due in the past', () => {
    const yesterday = sub(new Date(), { days: 1 });
    const task = makeTaskWithDueDate(yesterday);
    expect(isTaskPastDue(task)).toBeTruthy();
  });
  it('returns true for tasks due at the end of yesterday', () => {
    // it should be true for the latest possible date before the start of today
    const yesterday = endOfYesterday();
    const task = makeTaskWithDueDate(yesterday);
    expect(isTaskPastDue(task)).toBeTruthy();
  });
  it('returns false for tasks due at the start of today', () => {
    // it should be false for the earliest possible date after the end of yesterday
    const today = startOfToday();
    const task = makeTaskWithDueDate(today);
    expect(isTaskPastDue(task)).toBeFalsy();
  });
  it('returns false for tasks due in the future', () => {
    const tomorrow = add(new Date(), { days: 1 });
    const task = makeTaskWithDueDate(tomorrow);
    expect(isTaskPastDue(task)).toBeFalsy();
  });
  it('returns false for tasks without a due date', () => {
    const task = makeTaskWithDueDate();
    expect(isTaskPastDue(task)).toBeFalsy();
  });
});

describe('isTaskDueToday util', () => {
  it('returns false for tasks due in the past', () => {
    const lastWeek = sub(new Date(), { weeks: 1 });
    const task = makeTaskWithDueDate(lastWeek);
    expect(isTaskDueToday(task)).toBeFalsy();
  });
  it('returns false for tasks due at the end of yesterday', () => {
    // it should be false for the lastest possible date before the start of today
    const yesterday = endOfYesterday();
    const task = makeTaskWithDueDate(yesterday);
    expect(isTaskDueToday(task)).toBeFalsy();
  });
  it('returns true for tasks due on the start of today', () => {
    // it should be true at the earliest possible time today
    const today = startOfToday();
    const task = makeTaskWithDueDate(today);
    expect(isTaskDueToday(task)).toBeTruthy();
  });
  it('returns true for tasks due at the end of today', () => {
    // it should still be true at the latest possible time today
    const today = endOfToday();
    const task = makeTaskWithDueDate(today);
    expect(isTaskDueToday(task)).toBeTruthy();
  });
  it('returns false for tasks due at the start of tomorrow', () => {
    // it should be false at the earliest possible time after the end of today
    const tomorrow = startOfTomorrow();
    const task = makeTaskWithDueDate(tomorrow);
    expect(isTaskDueToday(task)).toBeFalsy();
  });
  it('returns false for tasks due in the future', () => {
    const tomorrow = add(new Date(), { days: 1 });
    const task = makeTaskWithDueDate(tomorrow);
    expect(isTaskDueToday(task)).toBeFalsy();
  });
  it('returns false for tasks without a due date', () => {
    const task = makeTaskWithDueDate();
    expect(isTaskDueToday(task)).toBeFalsy();
  });
});

describe('isTaskDueTomorrow util', () => {
  it('returns false for tasks due in the past', () => {
    const yesterday = sub(new Date(), { days: 1 });
    const task = makeTaskWithDueDate(yesterday);
    expect(isTaskDueTomorrow(task)).toBeFalsy();
  });
  it('returns false for tasks due at the end of today', () => {
    // it should be false for the latest possible time before the start of tomorrow
    const today = endOfToday();
    const task = makeTaskWithDueDate(today);
    expect(isTaskDueTomorrow(task)).toBeFalsy();
  });
  it('returns true for tasks due at the start of tomorrow', () => {
    // it should be true for the earliest possible time tomorrow
    const tomorrow = startOfTomorrow();
    const task = makeTaskWithDueDate(tomorrow);
    expect(isTaskDueTomorrow(task)).toBeTruthy();
  });
  it('returns true for tasks due at the end of tomorrow', () => {
    // it should be true for the latest possible time tomorrow
    const tomorrow = endOfTomorrow();
    const task = makeTaskWithDueDate(tomorrow);
    expect(isTaskDueTomorrow(task)).toBeTruthy();
  });
  it('returns false for tasks due after tomorrow', () => {
    const dayAfterTomorrow = startOfDay(add(new Date(), { days: 2 }));
    const task = makeTaskWithDueDate(dayAfterTomorrow);
    expect(isTaskDueTomorrow(task)).toBeFalsy();
  });
  it('returns false for tasks without a due date', () => {
    const task = makeTaskWithDueDate();
    expect(isTaskDueTomorrow(task)).toBeFalsy();
  });
});

describe('isTaskDueInFuture', () => {
  it('returns false for tasks due yesterday', () => {
    const yesterday = sub(new Date(), { days: 1 });
    const task = makeTaskWithDueDate(yesterday);
    expect(isTaskDueInFuture(task)).toBeFalsy();
  });
  it('returns true for tasks starting today', () => {
    const today = startOfToday();
    const task = makeTaskWithDueDate(today);
    expect(isTaskDueInFuture(task)).toBeTruthy();
  });
  it('returns false for tasks without a due date', () => {
    const task = makeTaskWithDueDate();
    expect(isTaskDueInFuture(task)).toBeFalsy();
  });
});
