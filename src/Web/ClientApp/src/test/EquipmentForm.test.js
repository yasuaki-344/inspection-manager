import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { EquipmentForm } from '../inspection/EquipmentForm';

jest.mock('../inspection/InspectionSheetForm', () => {
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
      <EquipmentForm
        equipment={{
          equipment_id: 'id',
          equipment_name: 'equipment',
          inspection_items: []
        }}
      />
      , container
    );
  });
});
