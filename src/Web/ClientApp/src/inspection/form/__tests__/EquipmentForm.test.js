import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { DndProvider } from "react-dnd"
import { HTML5Backend } from 'react-dnd-html5-backend';
import { EquipmentForm } from '../EquipmentForm';

it('renders without crashing', () => {
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
  );
});

it('click remove equipment button', () => {
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
  );
  fireEvent.click(screen.getByTestId('remove-equipment-button'));
});
