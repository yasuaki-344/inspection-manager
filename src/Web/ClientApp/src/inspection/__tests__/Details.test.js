import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { Details } from '../Details';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve({
        sheet_id: 'sheet id',
        sheet_name: 'sheet name',
        inspection_group: 'group',
        inspection_type: 'type',
        equipments: [
          {
            equipment_id: 'equipment id',
            equipment_name: 'equipment name',
            inspection_items: [
              {
                inspection_item_id: 'inspection item id',
                inspection_content: 'inspection content',
                input_type: 0,
                choices: [
                  'choice1', 'choice2'
                ]
              }
            ]
          }
        ]
      })
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
        <Details match={{ params: { id: 'guid' } }} />
      </MemoryRouter>
    );
  });
});
