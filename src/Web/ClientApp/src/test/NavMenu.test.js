import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { NavMenu } from '../components/NavMenu';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders without crashing', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <NavMenu />
      </MemoryRouter>
      , container
    );
  });
});
