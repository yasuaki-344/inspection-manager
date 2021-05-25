import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { InspectionSheetForm } from '../InspectionSheetForm';
import { InspectionSheetContext } from '../../context/InspectionSheetContext';
import { InspectionItemContext } from '../../context/InspectionItemContext';

jest.mock('../EquipmentForm', () => {
  return {
    EquipmentForm: (props) => {
      return <></>
    },
  };
});
jest.mock('../../dialog/InspectionItemDialog', () => {
  return {
    InspectionItemDialog: (props) => {
      return <></>
    },
  };
});

it('renders without crashing', async () => {
  render(
    <InspectionSheetContext.Provider value={{
      inspectionSheet: {
        sheet_id: '',
        sheet_name: '',
        inspection_group: '',
        inspection_type: '',
        equipments: [
          {
            equipment_id: '',
            equipment_name: ''
          }
        ],
      },
      setSheet: (sheet) => { },
      updateField: (event) => { },
      addEquipment: () => { },
      removeEquipment: (index) => { },
      updateEquipment: (event, index) => { },
      swapEquipment: (srcIndex, dstIndex) => { },
      addInspectionItem: (index, item) => { },
      removeInspectionItem: (id, itemId) => { },
      updateInspectionItem: (id, item) => { },
      swapInspectionItem: (equipmentId, srcId, dstId) => { },
    }} >
      <InspectionItemContext.Provider value={{
        inspectionItem: {
          inspection_item_id: '',
          inspection_content: '',
          input_type: 0,
          choices: [],
        },
        setItem: (item) => { },
        updateField: (event) => { },
        setChoices: (choices) => { },
        addChoice: () => { },
        removeChoice: (index) => { },
        updateChoice: (event, index) => { }
      }}>
        <InspectionSheetForm
          isEdit={true}
        />
      </InspectionItemContext.Provider>
    </InspectionSheetContext.Provider>
  );
});
