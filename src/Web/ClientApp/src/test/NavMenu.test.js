import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
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

  const button = document.getElementById('menu-icon-button');
  await act(async () => {
    button.click();
  });

  const menu = document.getElementById('menu-aria');
  await act(async () => {
    menu.click();
    ReactTestUtils.Simulate.keyDown(menu, { key: "Enter", keyCode: 13, which: 13 })
  });
});
