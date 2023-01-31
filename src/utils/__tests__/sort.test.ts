import { sortMap } from '../sort';
import type { TaskType } from '@/features/tasks';
import { add } from 'date-fns';

const { alphabetically, priority, dueDate, dateAdded, defaultSorting } =
  sortMap;

const taskOne: TaskType = {
  name: 'Task 2',
  description: '',
  priority: 3,
  id: '1',
  date: add(new Date(), { days: 2 }).toJSON(),
  due: add(new Date(), { days: 3 }).toJSON(),
  completed: false,
};

const taskTwo: TaskType = {
  name: 'Task 1',
  description: '',
  priority: 4,
  id: '0',
  date: add(new Date(), { days: 1 }).toJSON(),
  due: add(new Date(), { days: 2 }).toJSON(),
  completed: false,
};

describe('alphabetical sort method', () => {
  it('sorts tasks alphabetically', () => {});
});
