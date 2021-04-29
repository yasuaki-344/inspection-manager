import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { InspectionItemForm } from '../InspectionItemForm';

jest.mock('../InspectionItemRow', () => {
  return {
    InspectionItemRow: (props) => {
      return <></>
    },
  };
});

it('renders without crashing', async () => {
  const equipmentId = 'equipment_id';
  const inspectionItems = [{
    inspection_item_id: 'item_id',
    inspection_content: 'content',
    input_type: 2,
    choices: ['choice1', 'choice2'],
  }];
  render(
    <InspectionItemForm
      equipment_id={equipmentId}
      inspectionItems={inspectionItems}
      editInspectionItem={(equipmentId, inspectionItem) => { }}
      addInspectionItem={(equipmentId) => { }}
    />
  );
});

it('click add item button', async () => {
  const equipmentId = 'equipment_id';
  const inspectionItems = [{
    inspection_item_id: 'item_id',
    inspection_content: 'content',
    input_type: 2,
    choices: ['choice1', 'choice2'],
  }];
  render(
    <InspectionItemForm
      equipment_id={equipmentId}
      inspectionItems={inspectionItems}
      editInspectionItem={(equipmentId, inspectionItem) => { }}
      addInspectionItem={(equipmentId) => { }}
    />
  );
  fireEvent.click(screen.getByTestId('add-item-button'));
});
