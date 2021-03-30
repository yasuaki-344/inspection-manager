import React from 'react';
import ReactDOM from 'react-dom';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { InspectionSheetForm } from '../inspection/InspectionSheetForm';
import { InspectionSheetContext } from '../inspection/InspectionSheetContext';
import { InspectionSheetOperator } from '../inspection/InspectionSheetOperator';
import { InspectionItemOperator } from '../inspection/InspectionItemOperator';
import { InspectionItemContext } from '../inspection/InspectionItemContext';


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
    ReactDOM.render(
      <InspectionSheetContext.Provider value={InspectionSheetOperator()} >
        <InspectionItemContext.Provider value={InspectionItemOperator()}>
          <InspectionSheetForm
            isEdit={true}
          />
        </InspectionItemContext.Provider>
      </InspectionSheetContext.Provider>
      , container
    );
  });
});
