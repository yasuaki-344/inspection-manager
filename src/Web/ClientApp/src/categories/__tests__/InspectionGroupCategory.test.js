import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { InspectionGroupCategory } from '../InspectionGroupCategory';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(['group1', 'group2'])
    })
  );
  jest.spyOn(window, 'alert').mockImplementation(() => { });
});
afterEach(() => {
  jest.resetAllMocks();
});

it('renders without crashing', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <InspectionGroupCategory />
      </MemoryRouter>
    );
  });
});

it('click add group button', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <InspectionGroupCategory />
      </MemoryRouter>
    );
  });
  fireEvent.click(screen.getByTestId('add-group-button'));
});

it('update group', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <InspectionGroupCategory />
      </MemoryRouter>
    );
  });
  fireEvent.change(
    screen.getByDisplayValue('group1'),
    { target: { value: 'new group' } }
  );
});

it('click remove group button', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <InspectionGroupCategory />
      </MemoryRouter>
    );
  });
  fireEvent.click(screen.getByTestId('remove-group-button-0'));
});

it('click submit type button', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <InspectionGroupCategory />
      </MemoryRouter>
    );
    fireEvent.submit(screen.getByTestId('form'));
  });
});
