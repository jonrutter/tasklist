import React from 'react';
import {
  screen,
  waitFor,
  renderWithProviders as render,
  within,
} from '@test/utils';
import userEvent from '@testing-library/user-event';
import type { RootState } from '@/app';
import type { TaskType } from '../../store/tasksSlice';
import { TaskForm } from '../TaskForm';
import { vi, it, describe } from 'vitest';

const preloadedStateWithTags: RootState = {
  tasks: {
    ids: [],
    entities: {},
  },
  tags: {
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
  },
  settings: {
    sortBy: 'defaultSorting',
  },
};

const defaultValues: Partial<TaskType> = {
  name: 'Default Name',
  description: 'Default Description',
  date: new Date().toJSON(),
  priority: 1,
  tag: '0',
};

const formRegex = /(add)|(create)[ new]? task/i;

// mocks
const onSubmit = vi.fn();
const onClose = vi.fn();

const Component = <TaskForm {...{ onSubmit, onClose }} />;
const ComponentWithDefaults = (
  <TaskForm {...{ onSubmit, onClose, defaultValues }} />
);

describe('TaskForm', () => {
  it('renders correctly', async () => {
    render(Component);
    // there should be a form with an accessible name
    screen.getByRole('form', {
      name: formRegex,
    });
    // there should be relevant form controls
    const nameInput = screen.getByLabelText(/^task/i);
    screen.getByLabelText(/description/i);
    screen.getByRole('button', {
      name: /[(set)|(add) ]?due date/i,
    });
    screen.getByRole('button', {
      name: /[(set)|(add) ]?tag/i,
    });
    screen.getByRole('button', {
      name: /[(set)|(add) ]?priority/i,
    });
    // there should be a cancel and submit button
    screen.getByRole('button', { name: /cancel/i });
    const submitButton = screen.getByRole('button', {
      name: /(submit)|(add task)/i,
    });
    // the submit button should initially be disabled
    expect(submitButton).toBeDisabled();
    // when there is a valid name value, the submit button should no longer be disabled
    await userEvent.type(nameInput, 'Test Task');
    await waitFor(() => expect(submitButton).not.toBeDisabled());
    // clicking the submit button should submit the form
    await userEvent.click(submitButton);
    expect(onSubmit).toBeCalled();
  });
  it('supports updating the text input values', async () => {
    render(Component);
    // select the text inputs should be relevant form controls
    const nameInput = screen.getByLabelText(/^task/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    // inputs should initially be empty
    expect(nameInput).toHaveValue('');
    expect(descriptionInput).toHaveValue('');
    // typing in the inputs should update their values
    await userEvent.type(nameInput, 'Test Task');
    await userEvent.type(descriptionInput, 'Test Description');
    // the values should be reflected in the inputs
    expect(nameInput).toHaveValue('Test Task');
    expect(descriptionInput).toHaveValue('Test Description');
  });
  it('supports updating the due date', async () => {
    render(Component);
    const dueDateButton = screen.getByRole('button', {
      name: /[(set)|(add) ]?due date/i,
    });
    // the due date button should reflect the current value, and default to 'schedule'
    expect(dueDateButton).toHaveTextContent(/schedule/i);
    // clicking the button should open a dialog with a due date text input
    await userEvent.click(dueDateButton);
    await screen.findByTestId('date-popup');
    // clicking one of the preselected date buttons should update the value and close the dialog
    await userEvent.click(screen.getByRole('button', { name: /today/i }));
    await waitFor(() => {
      expect(screen.queryByLabelText(/^due date/i)).not.toBeInTheDocument();
    });
    expect(dueDateButton).toHaveTextContent(/today/i);
    // the due date can be cleared by pressing the 'no date' button
    await userEvent.click(dueDateButton);
    await userEvent.click(
      screen.getByRole('button', { name: /no (due )?date/i })
    );
    await waitFor(() => {
      expect(dueDateButton).toHaveTextContent(/schedule/i);
    });
  });
  it('supports updating the tag', async () => {
    render(Component, { preloadedState: preloadedStateWithTags });
    const tagButton = screen.getByRole('button', {
      name: /[(set)|(add) ]?tag/i,
    });
    // there should not be any tags visible
    expect(screen.queryAllByText(/tag (0|1|2)/i)).toHaveLength(0);
    // clicking the tag button should open a dialog
    await userEvent.click(tagButton);
    await screen.findByTestId('tag-popup');
    // there should be buttons for each tag
    const tagButtonOne = screen.getByRole('button', { name: /tag 0/i });
    expect(screen.getAllByRole('button', { name: /tag (1|2)/i })).toHaveLength(
      2
    );
    screen.getByRole('button', { name: /no tag/i });
    // clicking a button should set the tag and close the dialog
    await userEvent.click(tagButtonOne);
    await waitFor(() =>
      expect(screen.queryByText('Tag')).not.toBeInTheDocument()
    );
    // now there should be a button to update the tag, with text reflecting the current tag
    const updateButton = screen.getByRole('button', { name: /update tag/i });
    expect(updateButton).toHaveTextContent(/tag 0/i);
    // clicking the 'no tag' button should clear the tag
    await userEvent.click(updateButton);
    const noTagButton = await screen.findByRole('button', { name: /no tag/i });
    await userEvent.click(noTagButton);
    await screen.findByRole('button', { name: /[(set)|(add) ]?tag/i });
  });
  it('supports updating the priority', async () => {
    render(Component);
    const priorityButton = screen.getByRole('button', {
      name: /[(set)|(add) ]?priority/i,
    });
    // should initially be priority 4
    within(priorityButton).getByText(/4/i);
    // clicking the button should bring up a menu
    await userEvent.click(priorityButton);
    const menu = await screen.findByTestId('priority-popup');
    // there should be an option for each priority level within the menu
    const p1 = within(menu).getByRole('button', { name: /priority 1/i });
    within(menu).getByRole('button', { name: /priority 2/i });
    within(menu).getByRole('button', { name: /priority 3/i });
    within(menu).getByRole('button', { name: /priority 4/i });
    // clicking a priority button should change the priority and close the dialog
    await userEvent.click(p1);
    await waitFor(() =>
      expect(screen.queryByTestId('priority-popup')).not.toBeInTheDocument()
    );
    within(priorityButton).getByText(/1/i);
  });
  it('passes through default values', () => {
    render(ComponentWithDefaults, { preloadedState: preloadedStateWithTags });
    // get the inputs
    const nameInput = screen.getByLabelText(/^task/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const dueDateButton = screen.getByRole('button', {
      name: /[(set)|(add) ]?due date/i,
    });
    const tagButton = screen.getByRole('button', { name: /update tag/i });
    const priorityButton = screen.getByRole('button', {
      name: /[(set)|(add) ]?priority/i,
    });
    // the inputs should have the default values
    expect(nameInput).toHaveValue('Default Name');
    expect(descriptionInput).toHaveValue('Default Description');
    expect(dueDateButton).toHaveTextContent(/today/i);
    expect(tagButton).toHaveTextContent(/tag 0/i);
    expect(priorityButton).toHaveTextContent(/1/i);
  });
});
