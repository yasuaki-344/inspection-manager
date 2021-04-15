import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { InspectionTypeCategory } from '../InspectionTypeCategory';

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
  const types = ['type1', 'type2'];
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(types)
    })
  );

  await act(async () => {
    render(
      <MemoryRouter>
        <InspectionTypeCategory />
      </MemoryRouter>
      , container
    );
  });

  global.fetch.mockRestore();
});
