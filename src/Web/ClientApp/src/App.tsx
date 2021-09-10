import React, { createContext, useReducer } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Create } from './components/inspection/Create';
import { Details } from './components/inspection/Details';
import { Edit } from './components/inspection/Edit';
import { InspectionGroupCategory } from './components/categories/InspectionGroupCategory';
import { InspectionTypeCategory } from './components/categories/InspectionTypeCategory';
import { ChoicesTemplate } from './components/categories/ChoicesTemplate';
import { InspectionSheetInteractor, InspectionItemInitialState } from './use-cases';
import { InspectionItem, InspectionItemReducer, InspectionSheet, InspectionSheetReducer } from './entities';
import { initialState } from './use-cases';
import { InspectionItemInteractor } from './use-cases/InspectionItemInteractor';
import { IInspectionItemInteractor, IInspectionSheetInteractor } from './interfaces';
import './custom.css'

export const InspectionItemContext = createContext({} as { state: InspectionItem, useCase: IInspectionItemInteractor })
export const InspectionSheetContext = createContext({} as { sheetPresenter: InspectionSheet, sheetController: IInspectionSheetInteractor })

const App = (): JSX.Element => {
  const [inspectionItem, dispatch] = useReducer(InspectionItemReducer, InspectionItemInitialState());
  const inspectionItemInteractor = new InspectionItemInteractor(inspectionItem, dispatch)
  const [inspectionSheet, sheetDispatch] = useReducer(InspectionSheetReducer, initialState());
  const inspectionSheetInteractor = new InspectionSheetInteractor(inspectionSheet, sheetDispatch)

  return (
    <Layout>
      <Route exact path='/' component={Home} />
      <Route path='/group' component={InspectionGroupCategory} />
      <Route path='/types' component={InspectionTypeCategory} />
      <Route path='/choices-template' component={ChoicesTemplate} />
      <InspectionSheetContext.Provider value={{
        sheetPresenter: inspectionSheet,
        sheetController: inspectionSheetInteractor
      }}>
        <InspectionItemContext.Provider value={{
          state: inspectionItem,
          useCase: inspectionItemInteractor
        }}>
          <Route path='/create' component={Create} />
          <Route path='/edit/:id' component={Edit} />
        </InspectionItemContext.Provider>
      </InspectionSheetContext.Provider>
      <Route path='/details/:id' component={Details} />
    </Layout>
  );
}
App.displayName = App.name;
export default App;
