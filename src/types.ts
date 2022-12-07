import { ColorType } from './data/colors';

export type PriorityType = 1 | 2 | 3 | 4;

export interface TagIncompleteType {
  name: string;
  color?: ColorType;
  id?: string;
}
export interface TagType extends TagIncompleteType {
  id: string;
}

export interface TaskIncompleteType {
  name: string;
  description: string;
  priority: PriorityType;
  due?: Date;
  tag?: TagType;
  date?: Date;
  id?: string;
}

export interface TaskType extends TaskIncompleteType {
  date: Date;
  id: string;
}
