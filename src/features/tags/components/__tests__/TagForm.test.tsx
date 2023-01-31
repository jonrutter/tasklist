import React from 'react';
import { renderWithProviders as render, screen, waitFor } from '@test/utils';
import userEvent from '@testing-library/user-event';
import { vi, it, describe } from 'vitest';

// component
import { TagForm } from '../TagForm';

const onSubmit = vi.fn();
const onClose = vi.fn();

const Component = (
  <TagForm onSubmit={onSubmit} onClose={onClose} title="Test Title" />
);

const ComponentWithDefaults = (
  <TagForm
    onSubmit={onSubmit}
    onClose={onClose}
    title="Test Title"
    defaultValues={{
      name: 'Test Tag',
      color: 'blue',
    }}
  />
);

describe('TagForm', () => {
  it('renders the component', () => {
    render(Component);
  });
  it('renders the correct content', () => {
    render(Component);
    screen.getByText('Test Title');
    screen.getByLabelText(/name/i);
    screen.getByLabelText(/tag color/i);
    screen.getByText(/cancel/i);
    screen.getByText(/add tag/i);
  });
  it('initially renders an empty form', () => {
    render(Component);
    expect(screen.getByLabelText(/name/i)).toHaveValue('');
  });
  it('correctly renders default data', () => {
    render(ComponentWithDefaults);
    expect(screen.getByLabelText(/name/i)).toHaveValue('Test Tag');
    expect(screen.getByLabelText(/tag color/i)).toHaveTextContent('Blue');
  });
  it('only disables the submit button when the name input is empty', async () => {
    render(Component);
    // button should be disabled when name input is empty
    const nameInput = screen.getByLabelText(/name/i);
    const submitButton = screen.getByText(/add tag/i);
    expect(submitButton).toBeDisabled();

    // button should not be disabled when name input has a value
    userEvent.type(nameInput, 'Test Tag');
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });
});
