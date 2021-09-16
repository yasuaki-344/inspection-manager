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
import { InspectionSheetInteractor, InspectionItemInteractor } from './use-cases';
import {
  InspectionItemReducer, InspectionItemInitialState,
  InspectionSheetReducer, InspectionSheetInitialState
} from './entities';
import './custom.css'
import { InspectionItemPresenter, InspectionSheetPresenter } from './presenters';
import { InspectionItemController, InspectionSheetController } from './controllers';
import { DIContainer } from './container';

export const InspectionItemContext = createContext({} as { itemPresenter: InspectionItemPresenter, itemController: InspectionItemController })
export const InspectionSheetContext = createContext({} as { sheetPresenter: InspectionSheetPresenter, sheetController: InspectionSheetController })

export const DIContainerContext = createContext<DIContainer>({} as DIContainer);

const App = (): JSX.Element => {
  const [inspectionItem, dispatch] = useReducer(InspectionItemReducer, InspectionItemInitialState);
  const inspectionItemInteractor = new InspectionItemInteractor(inspectionItem, dispatch)
  const inspectionItemPresenter = new InspectionItemPresenter(inspectionItemInteractor);
  const inspectionItemController = new InspectionItemController(inspectionItemInteractor);
  const [inspectionSheet, sheetDispatch] = useReducer(InspectionSheetReducer, InspectionSheetInitialState);
  const inspectionSheetInteractor = new InspectionSheetInteractor(inspectionSheet, sheetDispatch);
  const inspectionSheetPresenter = new InspectionSheetPresenter(inspectionSheetInteractor);
  const inspectionSheetController = new InspectionSheetController(inspectionSheetInteractor);

  const container = new DIContainer();

  return (
    <DIContainerContext.Provider value={container}>
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/group' component={InspectionGroupCategory} />
        <Route path='/types' component={InspectionTypeCategory} />
        <Route path='/choices-template' component={ChoicesTemplate} />
        <InspectionSheetContext.Provider value={{
          sheetPresenter: inspectionSheetPresenter,
          sheetController: inspectionSheetController
        }}>
          <InspectionItemContext.Provider value={{
            itemPresenter: inspectionItemPresenter,
            itemController: inspectionItemController
          }}>
            <Route path='/create' component={Create} />
            <Route path='/edit/:id' component={Edit} />
          </InspectionItemContext.Provider>
        </InspectionSheetContext.Provider>
        <Route path='/details/:id' component={Details} />
      </Layout>
    </DIContainerContext.Provider>
  );
}
App.displayName = App.name;
export default App;
