import React from 'react';
import { DndProvider } from "react-dnd"
import { HTML5Backend } from 'react-dnd-html5-backend';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { EquipmentForm } from '../EquipmentForm';

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
        <EquipmentForm
          equipment={{
            equipment_id: 'id',
            equipment_name: 'equipment',
            inspection_items: []
          }}
          handleAddItem={(equipmentId) => { }}
          handleEditItem={(equipmentId, inspectionItem) => { }}
        />
      </DndProvider>
      , container
    );
  });
});
