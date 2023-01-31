import React from 'react';
import {
  screen,
  waitFor,
  renderWithProviders as render,
  within,
} from '@test/utils';
import userEvent from '@testing-library/user-event';
import { HomePage } from '../HomePage';
import type { RootState } from '@/app';
import add from 'date-fns/add';

const basePreloadedState: RootState = {
  tasks: {
    ids: [],
    entities: {},
  },
  tags: {
    ids: [],
    entities: {},
  },
  settings: {
    sortBy: 'defaultSorting',
  },
};

const preloadedTags: RootState['tags'] = {
  ids: ['0', '1', '2'],
  entities: {
    '0': {
      name: 'Tag 0',
      id: '0',
      color: 'red',
    },
    '1': {
      name: 'Tag 1',
      id: '1',
      color: 'green',
    },
    '2': {
      name: 'Tag 2',
      id: '2',
      color: 'blue',
    },
  },
};

const preloadedTasks: RootState['tasks'] = {
  ids: ['0'],
  entities: {
    '0': {
      name: 'Test Task',
      description: 'Test Description',
      completed: false,
      date: new Date().toJSON(),
      id: '0',
      priority: 1,
      due: add(new Date(), { days: 1 }).toJSON(),
      tag: '0',
    },
  },
};

/*
TODO: not all tests will pass immediately. These tests are testing intended interactions and semantics, not necessarily how the app works now. Will need future refactors to make sure everything is working correctly.
*/

const addRegex = /(add)|(new) task/i;
const formRegex = /(add)|(create)[ new]? task/i;
const noListRegex = /(your list is empty)|(no tasks)/i;

describe('Home Page', () => {
  it('initially renders the correct content', () => {
    render(<HomePage />);
    // there should be an h1 with a descriptive name'
    screen.getByRole('heading', {
      level: 1,
      name: /(all tasks)|(inbox)/i,
    });
    // when first loading the app, there should be no tasks
    screen.getByText(noListRegex);
    // there should be at least one button with an accessible label that adds a task (but there may be more than one, e.g. in the header)
    const addBtns = screen.getAllByRole('button', {
      name: addRegex,
    });
    expect(addBtns).not.toHaveLength(0);
  });
  it('correctly opens the task creation form', async () => {
    render(<HomePage />, {
      preloadedState: { ...basePreloadedState, tags: preloadedTags },
    });
    // initially there should not be a form
    expect(
      screen.queryByRole('form', { name: formRegex })
    ).not.toBeInTheDocument();
    // clicking the 'add task' button should open a form
    const addButton = screen.getAllByRole('button', {
      name: addRegex,
    })[0];
    await userEvent.click(addButton);
    await screen.findByRole('form', {
      name: formRegex,
    });
  });

  it('supports adding a new task', async () => {
    render(<HomePage />);
    // clicking the 'add task' button should open a form to add a new task
    const addButton = screen.getAllByRole('button', {
      name: addRegex,
    })[0];
    await userEvent.click(addButton);
    const form = await screen.findByRole('form', {
      name: /(add)|(create)[ new]? task/i,
    });
    // get the name input and submit button
    const nameInput = within(form).getByLabelText(/^task/i);
    const descriptionInput = within(form).getByLabelText(/^description/i);
    const dueDateButton = within(form).getByRole('button', {
      name: /[(set)|(add) ]?due date/i,
    });

    const submitButton = within(form).getByRole('button', {
      name: /(submit)|(add task)/i,
    });
    // enter some valid text inputs
    await userEvent.type(nameInput, 'Test Task');
    await userEvent.type(descriptionInput, 'Test Description');
    // add a date
    await userEvent.click(dueDateButton);
    const dueDateDialog = await screen.findByTestId('date-popup');

    const todayButton = within(dueDateDialog).getByRole('button', {
      name: /today/i,
    });
    await userEvent.click(todayButton);

    // the submit button should close the form and create a new task
    await userEvent.click(submitButton);
    await waitFor(() => {
      expect(
        screen.queryByRole('form', { name: /(add)|(create)[ new]? task/i })
      ).not.toBeInTheDocument();
    });
    // the task should now appear, and the 'no tasks' message should disappear
    await waitFor(() => {
      expect(
        screen.queryByText(/(your list is empty)|(no tasks)/i)
      ).not.toBeInTheDocument();
    });
    const task = screen.getByRole('button', { name: /test task/i });
    within(task).getByText(/test task/i);
    within(task).getByText(/test description/i);
    within(task).getByText(/today/i);
  });
  it('supports deleting a task', async () => {
    render(<HomePage />, {
      preloadedState: {
        ...basePreloadedState,
        tags: preloadedTags,
        tasks: preloadedTasks,
      },
    });
    // there should not be a 'no tasks' message
    expect(screen.queryByText(noListRegex)).not.toBeInTheDocument();
    // the preloaded task should appear
    const task = screen.getByRole('button', { name: /test task/i });
    within(task).getByText(/test task/i);
    within(task).getByText(/test description/i);
    within(task).getByText(/tomorrow/i);
    // find the checkbox
    const checkbox = screen.getByLabelText(/delete task/);
    // clicking the checkbox should cause the task to be deleted
    await userEvent.click(checkbox);
    await waitFor(() =>
      expect(
        screen.queryByRole('button', { name: /test task/i })
      ).not.toBeInTheDocument()
    );
    // because there was only one task, the 'no task' message should reappear
    await screen.findByText(noListRegex);
  });
  it('displays a modal dialog with task details', async () => {
    render(<HomePage />, {
      preloadedState: {
        ...basePreloadedState,
        tags: preloadedTags,
        tasks: preloadedTasks,
      },
    });
    // select the preloaded task
    const task = screen.getByRole('button', { name: /test task/i });
    // clicking the task should open a dialog with the full task details
    await userEvent.click(task);
    const modal = await screen.findByRole('dialog', { name: /test task/i });
    // the modal should contain details about the task
    within(modal).getByRole('heading', { name: /test task/i });
    within(modal).getByText(/test description/i);
    within(modal).getByText(/tomorrow/i);
    within(modal).getByText(/priority 1/i);
    within(modal).getByText(/tag 0/i);
    // there should be an update button, which can update the task
    within(modal).getByRole('button', { name: /update/i });
    // there should be a close button, which can close the dialog
    within(modal).getByRole('button', { name: /close/i });
  });
  it('supports editing tasks', async () => {
    render(<HomePage />, {
      preloadedState: {
        ...basePreloadedState,
        tags: preloadedTags,
        tasks: preloadedTasks,
      },
    });
    // select the preloaded task
    const oldTask = screen.getByRole('button', { name: /test task/i });
    // clicking the task should open a dialog with the full task details
    await userEvent.click(oldTask);
    const modal = await screen.findByRole('dialog', { name: /test task/i });
    // there should be an update button, which can update the task
    const updateButton = within(modal).getByRole('button', { name: /update/i });
    // click the update button
    await userEvent.click(updateButton);
    // a form should appear
    await within(modal).findByRole('form', { name: /update task/i });
    // select the form controls
    const nameInput = within(modal).getByLabelText(/task/i);
    const descriptionInput = within(modal).getByLabelText(/description/i);
    const dueDateButton = within(modal).getByRole('button', {
      name: /[(set)|(add) ]?due date/i,
    });
    const tagButton = within(modal).getByRole('button', {
      name: /[(set)|(add) ]?tag/i,
    });
    const priorityButton = within(modal).getByRole('button', {
      name: /[(set)|(add) ]?priority/i,
    });
    // update the text values
    await userEvent.type(nameInput, ' (updated)');
    await userEvent.type(descriptionInput, ' (updated)');
    // update the due date to today
    await userEvent.click(dueDateButton);
    const dueDatePopup = await screen.findByTestId('date-popup');
    await userEvent.click(
      within(dueDatePopup).getByRole('button', { name: /today/i })
    );
    // update the priority to 2
    await userEvent.click(priorityButton);
    const priorityPopup = await screen.findByTestId('priority-popup');
    await userEvent.click(
      within(priorityPopup).getByRole('button', { name: /priority 2/i })
    );
    // set the tag to 1
    await userEvent.click(tagButton);
    const tagPopup = await screen.findByTestId('tag-popup');
    await userEvent.click(
      within(tagPopup).getByRole('button', { name: /tag 1/i })
    );
    // there should be a submit button
    const submit = screen.getByRole('button', { name: /update( task)?/i });
    await userEvent.click(submit);
    // the task should be updated
    const newTask = await screen.findByRole('button', {
      name: /test task (updated)/i,
    });
    within(newTask).getByText(/test description (updated)/i);
    within(newTask).getByText(/today/i);
    within(newTask).getByText(/task 1/i);
    within(newTask).getByText(/priority 2/i);
  });
});
