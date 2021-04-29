import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { DndProvider } from "react-dnd"
import { HTML5Backend } from 'react-dnd-html5-backend';
import { InspectionItemRow } from '../InspectionItemRow';

it('renders without crashing', async () => {
  render(
    <table>
      <tbody>
        <DndProvider backend={HTML5Backend}>
          <InspectionItemRow
            equipmentId={'id'}
            inspectionItem={{
              inspection_item_id: 'item_id',
              inspection_content: 'content',
              input_type: 1,
              choices: ['choice1', 'choice2']
            }}
          />
        </DndProvider>
      </tbody>
    </table>
  );
});

it('click edit item button', async () => {
  render(
    <table>
      <tbody>
        <DndProvider backend={HTML5Backend}>
          <InspectionItemRow
            equipmentId={'id'}
            inspectionItem={{
              inspection_item_id: 'item_id',
              inspection_content: 'content',
              input_type: 1,
              choices: ['choice1', 'choice2']
            }}
            editInspectionItem={(equipmentId, item) => { }}
          />
        </DndProvider>
      </tbody>
    </table>
  );
  fireEvent.click(screen.getByTestId('edit-item-button'));
});

it('click remove item button', async () => {
  render(
    <table>
      <tbody>
        <DndProvider backend={HTML5Backend}>
          <InspectionItemRow
            equipmentId={'id'}
            inspectionItem={{
              inspection_item_id: 'item_id',
              inspection_content: 'content',
              input_type: 1,
              choices: ['choice1', 'choice2']
            }}
            editInspectionItem={(equipmentId, item) => { }}
          />
        </DndProvider>
      </tbody>
    </table>
  );
  fireEvent.click(screen.getByTestId('remove-item-button'));
});
