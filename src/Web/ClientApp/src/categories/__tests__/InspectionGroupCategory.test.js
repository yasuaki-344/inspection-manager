import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { InspectionGroupCategory } from '../InspectionGroupCategory';

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
  const groups = ['group1', 'group2'];
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(groups)
    })
  );

  await act(async () => {
    render(
      <MemoryRouter>
        <InspectionGroupCategory />
      </MemoryRouter>
      , container
    );
  });

  global.fetch.mockRestore();
});
