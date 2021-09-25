import React, { createContext, useReducer } from "react";
import { Route } from "react-router-dom";
import nameof from "ts-nameof.macro";
import { Layout, Home } from "./components";
import { Create } from "./components/inspection";
import { Details } from "./components/inspection/Details";
import { Edit } from "./components/inspection/Edit";
import { InspectionGroupCategory } from "./components/categories/InspectionGroupCategory";
import { InspectionTypeCategory } from "./components/categories/InspectionTypeCategory";
import { ChoicesTemplateManager } from "./components/categories/ChoicesTemplateManager";
import {
  InspectionSheetInteractor,
  InspectionItemInteractor,
} from "./use-cases";
import {
  InspectionItemReducer,
  InspectionItemInitialState,
  InspectionSheetReducer,
  InspectionSheetInitialState,
} from "./entities";
import "./custom.css";
import {
  InspectionItemPresenter,
  InspectionSheetPresenter,
} from "./presenters";
import {
  InspectionItemController,
  InspectionSheetController,
} from "./controllers";
import { DIContainer } from "./container";
import {
  InspectionGroupRepository,
  InspectionTypeRepository,
} from "./infrastructure";
import {
  IInspectionGroupRepository,
  IInspectionItemController,
  IInspectionItemInteractor,
  IInspectionItemPresenter,
  IInspectionSheetController,
  IInspectionSheetInteractor,
  IInspectionSheetPresenter,
  IInspectionTypeRepository,
} from "./interfaces";

export const InspectionItemContext = createContext(
  {} as {
    itemPresenter: InspectionItemPresenter;
    itemController: InspectionItemController;
  }
);
export const InspectionSheetContext = createContext(
  {} as {
    sheetPresenter: InspectionSheetPresenter;
    sheetController: InspectionSheetController;
  }
);

export const DIContainerContext = createContext<DIContainer>({} as DIContainer);

const App = (): JSX.Element => {
  const [inspectionItem, dispatch] = useReducer(
    InspectionItemReducer,
    InspectionItemInitialState
  );
  const [inspectionSheet, sheetDispatch] = useReducer(
    InspectionSheetReducer,
    InspectionSheetInitialState
  );
  const inspectionItemInteractor = new InspectionItemInteractor(
    inspectionItem,
    dispatch
  );
  const inspectionItemPresenter = new InspectionItemPresenter(
    inspectionItemInteractor
  );
  const inspectionItemController = new InspectionItemController(
    inspectionItemInteractor
  );
  const inspectionSheetInteractor = new InspectionSheetInteractor(
    inspectionSheet,
    sheetDispatch
  );
  const inspectionSheetPresenter = new InspectionSheetPresenter(
    inspectionSheetInteractor
  );
  const inspectionSheetController = new InspectionSheetController(
    inspectionSheetInteractor
  );

  const container = new DIContainer();
  container.register(
    nameof<IInspectionGroupRepository>(),
    new InspectionGroupRepository()
  );
  container.register(
    nameof<IInspectionTypeRepository>(),
    new InspectionTypeRepository()
  );
  container.register(
    nameof<IInspectionItemInteractor>(),
    new InspectionItemInteractor(inspectionItem, dispatch)
  );
  container.register(
    nameof<IInspectionSheetInteractor>(),
    new InspectionSheetInteractor(inspectionSheet, sheetDispatch)
  );
  container.register(
    nameof<IInspectionSheetPresenter>(),
    inspectionSheetPresenter
  )
  container.register(
    nameof<IInspectionSheetPresenter>(),
    inspectionSheetPresenter
  )
  container.register(
    nameof<IInspectionItemPresenter>(),
    inspectionItemPresenter
  )
  container.register(
    nameof<IInspectionSheetController>(),
    inspectionSheetController
  )
  container.register(
    nameof<IInspectionItemController>(),
    inspectionItemController
  )

  return (
    <DIContainerContext.Provider value={container}>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/group" component={InspectionGroupCategory} />
        <Route path="/types" component={InspectionTypeCategory} />
        <Route path="/choices-template" component={ChoicesTemplateManager} />
        <InspectionSheetContext.Provider
          value={{
            sheetPresenter: inspectionSheetPresenter,
            sheetController: inspectionSheetController,
          }}
        >
          <InspectionItemContext.Provider
            value={{
              itemPresenter: inspectionItemPresenter,
              itemController: inspectionItemController,
            }}
          >
            <Route path="/create" component={Create} />
            <Route path="/edit/:id" component={Edit} />
          </InspectionItemContext.Provider>
        </InspectionSheetContext.Provider>
        <Route path="/details/:id" component={Details} />
      </Layout>
    </DIContainerContext.Provider>
  );
};
App.displayName = App.name;
export default App;
