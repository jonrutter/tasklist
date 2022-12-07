import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, cleanup, waitFor } from '@/utils/test-utils';
import userEvent from '@testing-library/user-event';

// component
import { TaskForm } from '../TaskForm';

afterEach(cleanup);

const mockHandler = () => null;

const Component = (
  <TaskForm onSubmit={mockHandler} onClose={mockHandler} title="Test Title" />
);

const ComponentWithDefaults = (
  <TaskForm
    onSubmit={mockHandler}
    onClose={mockHandler}
    title="Test Title"
    defaultValues={{
      name: 'Test Name',
      description: 'Test Description',
      priority: 1,
      tag: { name: 'Test Tag', color: 'blue', id: 'test-tag-id' },
      due: new Date(),
    }}
  />
);

describe('TaskForm', () => {
  it('renders the component', () => {
    render(Component);
  });
  it('renders the correct content', () => {
    render(Component);
    screen.getByText('Test Title');
    screen.getByText('Schedule');
    screen.getByText('Cancel');
    screen.getByText('Add Task');
  });
  it('renders an empty form', () => {
    render(Component);
    expect(screen.getByLabelText(/task/i)).toHaveValue('');
    // description field
    expect(screen.getByLabelText(/description/i)).toHaveValue('');
    // due date
    expect(screen.getByLabelText(/set due date/i)).toHaveTextContent(
      /schedule/i
    );
    // tag
    expect(screen.getByLabelText(/set tag/i)).toHaveTextContent('');
    // priority
    screen.getByLabelText('Set Priority, priority is currently 4');
  });
  it('correctly renders default data', () => {
    render(ComponentWithDefaults);
    // all fields should display the passed-in default data
    // name field
    expect(screen.getByLabelText(/task \*/i)).toHaveValue('Test Name');
    // description field
    expect(screen.getByLabelText(/description/i)).toHaveValue(
      'Test Description'
    );
    // due date
    expect(screen.getByLabelText(/set due date/i)).toHaveTextContent(/today/i);
    // tag
    expect(screen.getByLabelText(/update tag/i)).toHaveTextContent('Test Tag');
    // priority
    screen.getByLabelText('Set Priority, priority is currently 1');
  });
  it('only disables the submit button when the name input is empty', async () => {
    render(Component);
    const nameInput = screen.getByLabelText(/task \*/i);
    const submitButton = screen.getByText(/add task/i);
    expect(submitButton).toBeDisabled();
    userEvent.type(nameInput, 'Test Name');
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });
  it('supports adding and removing a due date', async () => {
    render(Component);
    // due date popup button should be visible and have text of "SCHEDULE" when no date is selected
    const dueDateButton = screen.getByLabelText(/set due date/i);
    expect(dueDateButton).toHaveTextContent(/schedule/i);

    // trigger popup
    userEvent.click(dueDateButton);
    // wait for popup to be in document
    await waitFor(() => {
      // box should render
      screen.getByTestId('date-popup');
      // date-change buttons should render
      screen.getByText(/today/i);
      screen.getByText(/no date/i);
    });

    // select due date of "TODAY"
    userEvent.click(screen.getByText(/today/i));

    // selecting date should cause popup to unmount
    await waitFor(() => {
      expect(screen.queryByTestId('date-popup')).not.toBeInTheDocument();
    });

    // due date button should now reflect changed due date and have text content of "TODAY"
    expect(dueDateButton).toHaveTextContent(/today/i);

    // should be able to remove due date and see changes reflected
    // open due date popup again
    userEvent.click(dueDateButton);
    await waitFor(() => {
      expect(screen.getByTestId('date-popup')).toBeInTheDocument();
    });

    // remove due date
    userEvent.click(screen.getByText(/no date/i));
    await waitFor(() => {
      expect(screen.queryByTestId('date-popup')).not.toBeInTheDocument();
    });

    // due date should be removed and button should again have text content of "SCHEDULE"
    expect(dueDateButton).toHaveTextContent(/schedule/i);
  });
  it('supports adding and removing tags', async () => {
    render(Component);

    // the tag button should initially show no tag
    const emptyTagButton = screen.getByLabelText(/set tag/i);
    expect(emptyTagButton).toHaveTextContent('');

    // clicking the tag button should open the tag popup
    userEvent.click(emptyTagButton);
    await waitFor(() => {
      // the popup should be visible
      expect(screen.getByTestId('tag-popup')).toBeInTheDocument();
      // the tag popup should display the preloaded test tag,
      screen.getByText(/preloaded test tag/i);
      screen.getByText(/no tag/i);
    });

    // clicking the preloaded test tag should update the form data and close the tag popup
    userEvent.click(screen.getByText(/preloaded test tag/i));
    await waitFor(() => {
      expect(screen.queryByTestId('tag-popup')).not.toBeInTheDocument();
    });

    // the tag button should now show the updated tag
    expect(emptyTagButton).not.toBeInTheDocument();
    const filledTagButton = screen.getByLabelText(/update tag/i);
    expect(filledTagButton).toHaveTextContent(/preloaded test tag/i);

    // clearing the tag should revert the previous changes
    userEvent.click(filledTagButton);
    await waitFor(() => {
      expect(screen.getByTestId('tag-popup')).toBeInTheDocument();
    });
    userEvent.click(screen.getByText(/no tag/i));
    await waitFor(() => {
      expect(screen.queryByTestId('tag-popup')).not.toBeInTheDocument();
    });
    expect(filledTagButton).not.toBeInTheDocument();
    const newEmptyButton = screen.getByLabelText(/set tag/i);
    expect(newEmptyButton).toHaveTextContent('');
  });
  it('supports adding and removing a priority level', async () => {
    render(Component);
    // priority should default to 4
    const priorityButton = screen.getByLabelText(/set priority/i);
    expect(priorityButton).toHaveAccessibleName(
      'Set Priority, priority is currently 4'
    );

    // clicking the priority button should open the priority popup
    userEvent.click(priorityButton);
    await waitFor(() => {
      expect(screen.getByTestId('priority-popup')).toBeInTheDocument();
    });

    // clicking a new priority level option should close the priority popup and update the form data
    userEvent.click(screen.getByText(/priority 1/i));
    await waitFor(() => {
      expect(screen.queryByTestId('priority-popup')).not.toBeInTheDocument();
    });
    // priority button should now reflect the updated value
    expect(priorityButton).toHaveAccessibleName(
      'Set Priority, priority is currently 1'
    );
  });
});
