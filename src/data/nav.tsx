import React from 'react';

import InboxIcon from '@mui/icons-material/Inbox';
import TodayIcon from '@mui/icons-material/Today';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ScheduleIcon from '@mui/icons-material/Schedule';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  isDueToday,
  isDueTomorrow,
  isDueInFuture,
  isPastDue,
} from '../utils/time';
import { TaskType } from '../types';

const none = () => false;
const all = () => true;

export type NavItemType = {
  title: string;
  to: string;
  listCallback: (_: TaskType) => boolean | null;
  icon: JSX.Element;
};

export const navItems: NavItemType[] = [
  {
    title: 'All Tasks',
    to: '/',
    listCallback: all,
    icon: <InboxIcon fontSize="small" />,
  },
  {
    title: 'Today',
    to: '/today',
    listCallback: isDueToday,
    icon: <TodayIcon fontSize="small" />,
  },
  {
    title: 'Tomorrow',
    to: '/tomorrow',
    listCallback: isDueTomorrow,
    icon: <UpcomingIcon fontSize="small" />,
  },
  {
    title: 'Upcoming',
    to: '/upcoming',
    listCallback: isDueInFuture,
    icon: <EventNoteIcon fontSize="small" />,
  },
  {
    title: 'Past Due',
    to: '/due',
    listCallback: isPastDue,
    icon: <ScheduleIcon fontSize="small" />,
  },
];

export const completed: NavItemType[] = [
  {
    title: 'Completed',
    to: '/completed',
    listCallback: none,
    icon: <DeleteIcon fontSize="small" />,
  },
];
