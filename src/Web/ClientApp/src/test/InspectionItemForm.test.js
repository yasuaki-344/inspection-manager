import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { InspectionItemForm } from '../inspection/InspectionItemForm';

it('renders without crashing', async () => {
  const tbody = document.createElement('tbody');
  const equipmentId = 'equipment_id';
  const inspectionItem = {
    inspection_item_id: 'item_id',
    inspection_content: 'content',
    input_type: 2,
    choices: ['choice1', 'choice2'],
  };
  ReactDOM.render(
    <MemoryRouter>
      <InspectionItemForm
        equipment_id={equipmentId}
        inspectionItem={inspectionItem}
        removeInspectionItem={(id, itemId) => { }}
        editInspectionItem={() => { }}
      />
    </MemoryRouter>, tbody);
  await new Promise(resolve => setTimeout(resolve, 1000));
});
