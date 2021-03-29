import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { ChoicesTemplate } from '../categories/ChoicesTemplate';

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
  const templates = [
    { choices: ['choice1-1', 'choice1-2'] },
    { choices: ['choice2-1', 'choice2-2'] },
    { choices: ['choice3-1', 'choice3-2'] },
  ];
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(templates)
    })
  );

  await act(async () => {
    render(
      <MemoryRouter>
        <ChoicesTemplate />
      </MemoryRouter>
      , container
    );
  });

  global.fetch.mockRestore();
});
