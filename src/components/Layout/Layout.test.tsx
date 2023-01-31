import React from 'react';
import { renderWithProviders as render, screen, within } from '@test/utils';
import { it, describe } from 'vitest';
import { Layout } from '.';
import userEvent from '@testing-library/user-event';

const Component = (
  <Layout>
    <p>Hello, world!</p>
  </Layout>
);

describe('Layout', () => {
  it('correctly renders the header', async () => {
    render(Component);
    // there should be a header
    const header = screen.getByRole('banner');
    // there should be a logo
    within(header).getByRole('img');
    // there should be a link to the home page
    const homeLink = within(header).getByRole('link', {
      name: /(tasklist)|(home)/i,
    });
    expect(homeLink).toHaveAttribute('href', '/');
    // there should be a button to create a task
    const addButton = within(header).getByRole('button', {
      name: /(add)|(create)( new)? task/i,
    });
    // clicking the new task button should open a dialog with a task create form
    await userEvent.click(addButton);
    const modal = await screen.findByRole('dialog');
    within(modal).getByRole('form', { name: /(create)|(add)( new)? task/i });
  });
  it('correctly renders the navigation', () => {
    render(Component);
    // there should be a nav landmark
    const nav = screen.getByRole('navigation');
    // there should be a link to the inbox/all tasks page
    const homeLink = within(nav).getByRole('link', {
      name: /(inbox)|(all tasks)/i,
    });
    expect(homeLink).toHaveAttribute('href', '/');
    // there should be a link to tasks due today
    const todayLink = within(nav).getByRole('link', {
      name: /today/i,
    });
    expect(todayLink).toHaveAttribute('href', '/today');
    // there should be a link to upcoming tasks
    const upcomingLink = within(nav).getByRole('link', {
      name: /upcoming/i,
    });
    expect(upcomingLink).toHaveAttribute('href', '/upcoming');
    // there should be a link to tags
    // TODO: uncomment below when refactoring nav tags
    // const tagsLink = within(nav).getByRole('link', {
    //   name: /tags/i,
    // });
    // expect(tagsLink).toHaveAttribute('href', '/tags');
    // there should be a link to completed tasks
    const completedLink = within(nav).getByRole('link', {
      name: /(completed)|(finished)|(trash)|(deleted)/i,
    });
    expect(completedLink).toHaveAttribute('href', '/completed');
  });
  it('correctly renders children', () => {
    render(Component);
    screen.getByText(/hello, world/i);
  });
});
