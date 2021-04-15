import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { DndProvider } from "react-dnd"
import { HTML5Backend } from 'react-dnd-html5-backend';
import { InspectionItemRow } from '../InspectionItemRow';

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
      , container
    );
  });
});
