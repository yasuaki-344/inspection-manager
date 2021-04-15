import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { Edit } from '../Edit';

jest.mock('../form/InspectionSheetForm', () => {
  return {
    InspectionSheetForm: (props) => {
      return <></>
    },
  };
});

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
        <Edit
          match={{ params: { id: 'guid' } }}
        />
      </MemoryRouter>
      , container
    );
  });
});
