import React, { createContext, useReducer, useState } from "react";
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
  InspectionGroupInteractor,
  InspectionTypeInteractor,
} from "./use-cases";
import {
  InspectionItemReducer,
  InspectionItemInitialState,
  InspectionSheetReducer,
  InspectionSheetInitialState,
  InspectionGroup,
  InspectionType,
} from "./entities";
import "./custom.css";
import {
  InspectionGroupPresenter,
  InspectionItemPresenter,
  InspectionSheetPresenter,
  InspectionTypePresenter,
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
  IInspectionGroupInteractor,
  IInspectionGroupRepository,
  IInspectionItemController,
  IInspectionItemInteractor,
  IInspectionSheetInteractor,
  IInspectionTypeInteractor,
  IInspectionTypeRepository,
} from "./interfaces";
import {
  IInspectionGroupPresenter,
  IInspectionItemPresenter,
  IInspectionSheetPresenter,
  IInspectionTypePresenter,
} from "./interfaces/presenter";
import { IInspectionSheetController } from "./interfaces/controller";

export const DIContainerContext = createContext<DIContainer>({} as DIContainer);

const App = (): JSX.Element => {
  const [groups, setGroups] = useState<Array<InspectionGroup>>([]);
  const [types, setTypes] = useState<Array<InspectionType>>([]);
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
    nameof<IInspectionGroupInteractor>(),
    new InspectionGroupInteractor(
      groups,
      setGroups,
      container.inject(
        nameof<IInspectionGroupRepository>()
      ) as IInspectionGroupRepository
    )
  );
  container.register(
    nameof<IInspectionTypeInteractor>(),
    new InspectionTypeInteractor(
      types,
      setTypes,
      container.inject(
        nameof<IInspectionTypeRepository>()
      ) as IInspectionTypeRepository
    )
  );
  container.register(
    nameof<IInspectionGroupPresenter>(),
    new InspectionGroupPresenter(
      container.inject(
        nameof<IInspectionGroupInteractor>()
      ) as IInspectionGroupInteractor
    )
  );
  container.register(
    nameof<IInspectionTypePresenter>(),
    new InspectionTypePresenter(
      container.inject(
        nameof<IInspectionTypeInteractor>()
      ) as IInspectionTypeInteractor
    )
  );
  container.register(
    nameof<IInspectionItemInteractor>(),
    new InspectionItemInteractor(inspectionItem, dispatch)
  );
  container.register(
    nameof<IInspectionItemInteractor>(),
    new InspectionSheetInteractor(inspectionSheet, sheetDispatch)
  );
  container.register(
    nameof<IInspectionSheetInteractor>(),
    new InspectionSheetInteractor(inspectionSheet, sheetDispatch)
  );
  container.register(
    nameof<IInspectionSheetPresenter>(),
    new InspectionSheetPresenter(
      container.inject(
        nameof<IInspectionSheetInteractor>()
      ) as IInspectionSheetInteractor
    )
  );
  container.register(
    nameof<IInspectionItemPresenter>(),
    inspectionItemPresenter
  );
  container.register(
    nameof<IInspectionSheetController>(),
    new InspectionSheetController(
      container.inject(
        nameof<IInspectionSheetInteractor>()
      ) as IInspectionSheetInteractor
    )
  );
  container.register(
    nameof<IInspectionItemController>(),
    inspectionItemController
  );

  return (
    <DIContainerContext.Provider value={container}>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/group" component={InspectionGroupCategory} />
        <Route path="/types" component={InspectionTypeCategory} />
        <Route path="/choices-template" component={ChoicesTemplateManager} />
        <Route path="/create" component={Create} />
        <Route path="/edit/:id" component={Edit} />
        <Route path="/details/:id" component={Details} />
      </Layout>
    </DIContainerContext.Provider>
  );
};
App.displayName = App.name;
export default App;
