import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
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
      <InspectionSheetContext.Provider value={{
        inspectionSheet: {
          sheet_id: '',
          sheet_name: '',
          inspection_group: '',
          inspection_type: '',
          equipments: [],
        },
        setSheet: (sheet) => { },
        updateField: (event) => { },
        addEquipment: () => { },
        removeEquipment: (id) => { },
        updateEquipment: (event, id) => { },
        swapEquipment: (srcId, dstId) => { },
        addInspectionItem: (id, item) => { },
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
      , container
    );
  });
});
