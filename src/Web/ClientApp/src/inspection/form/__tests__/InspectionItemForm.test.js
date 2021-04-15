import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { InspectionItemForm } from '../InspectionItemForm';

jest.mock('../InspectionItemRow', () => {
  return {
    InspectionItemRow: (props) => {
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
  const equipmentId = 'equipment_id';
  const inspectionItems = [{
    inspection_item_id: 'item_id',
    inspection_content: 'content',
    input_type: 2,
    choices: ['choice1', 'choice2'],
  }];
  await act(async () => {
    render(
      <InspectionItemForm
        equipment_id={equipmentId}
        inspectionItems={inspectionItems}
        editInspectionItem={(equipmentId, inspectionItem) => { }}
        addInspectionItem={(equipmentId) => { }}
      />
      , container);
  });
});
