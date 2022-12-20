import React from 'react';

// icons
import InboxIcon from '@mui/icons-material/Inbox';
import TodayIcon from '@mui/icons-material/Today';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ScheduleIcon from '@mui/icons-material/Schedule';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import DeleteIcon from '@mui/icons-material/Delete';

// utils
import {
  isTaskDueToday,
  isTaskDueTomorrow,
  isTaskDueInFuture,
  isTaskPastDue,
  isTaskCompleted,
  isTaskNotCompleted,
} from '@/utils/filters';

// types
import type { TaskType } from '@/features/tasks';
import type { FilterType } from '@/utils/filters';

export type NavItemType = {
  title: string;
  to: string;
  filter: FilterType;
  icon: JSX.Element;
};

export const navItems: NavItemType[] = [
  {
    title: 'All Tasks',
    to: '/',
    filter: isTaskNotCompleted,
    icon: <InboxIcon fontSize="small" />,
  },
  {
    title: 'Today',
    to: '/today',
    filter: (task?: TaskType) =>
      isTaskNotCompleted(task) && isTaskDueToday(task),
    icon: <TodayIcon fontSize="small" />,
  },
  {
    title: 'Tomorrow',
    to: '/tomorrow',
    filter: (task?: TaskType) =>
      isTaskNotCompleted(task) && isTaskDueTomorrow(task),
    icon: <UpcomingIcon fontSize="small" />,
  },
  {
    title: 'Upcoming',
    to: '/upcoming',
    filter: (task?: TaskType) =>
      isTaskNotCompleted(task) && isTaskDueInFuture(task),
    icon: <EventNoteIcon fontSize="small" />,
  },
  {
    title: 'Past Due',
    to: '/due',
    filter: (task?: TaskType) =>
      isTaskNotCompleted(task) && isTaskPastDue(task),
    icon: <ScheduleIcon fontSize="small" />,
  },
];

export const completed: NavItemType = {
  title: 'Completed',
  to: '/completed',
  filter: isTaskCompleted,
  icon: <DeleteIcon fontSize="small" />,
};
