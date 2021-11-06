import { createContext, useContext, useReducer } from "react";
import nameof from "ts-nameof.macro";
import {
  ChoiceTemplateController,
  DetailController,
  HomeController,
  InspectionGroupController,
  InspectionItemController,
  InspectionSheetController,
  InspectionTypeController,
} from "../controllers";
import {
  InspectionItemInitialState,
  InspectionItemReducer,
  InspectionSheetInitialState,
  InspectionSheetReducer,
} from "../entities";
import {
  ChoiceTemplateRepository,
  InspectionGroupRepository,
  InspectionTypeRepository,
} from "../infrastructure";
import {
  IChoiceTemplateController,
  IChoiceTemplateInteractor,
  IChoiceTemplatePresenter,
  IChoiceTemplateRepository,
  IDetailController,
  IDetailPresenter,
  IHomeController,
  IHomePresenter,
  IInspectionGroupController,
  IInspectionGroupInteractor,
  IInspectionGroupPresenter,
  IInspectionGroupRepository,
  IInspectionItemController,
  IInspectionItemInteractor,
  IInspectionItemPresenter,
  IInspectionSheetController,
  IInspectionSheetInteractor,
  IInspectionSheetPresenter,
  IInspectionTypeController,
  IInspectionTypeInteractor,
  IInspectionTypePresenter,
  IInspectionTypeRepository,
} from "../interfaces";
import {
  ChoiceTemplatePresenter,
  DetailPresenter,
  HomePresenter,
  InspectionGroupPresenter,
  InspectionItemPresenter,
  InspectionSheetPresenter,
  InspectionTypePresenter,
} from "../presenters";
import {
  ChoiceTemplateInteractor,
  InspectionGroupInteractor,
  InspectionItemInteractor,
  InspectionSheetInteractor,
  InspectionTypeInteractor,
} from "../use-cases";

export const DIContainerContext = createContext({} as { [key: string]: any });

export const useDIContext = () => {
  const context = useContext(DIContainerContext);
  const inject = (key: string): any => {
    if (key in context) {
      return context[key];
    }
    throw new Error(`${key} is not registered as dependency`);
  };
  return inject;
};

export const setUpDIContainer = () => {
  const container: { [key: string]: any } = {};

  const register = (key: string, object: any) => {
    container[key] = object;
  };

  const inject = (key: string): any => {
    if (key in container) {
      return container[key];
    }
    throw new Error(`${key} is not registered as dependency`);
  };

  // Register objects to DI container.
  const [inspectionItem, dispatch] = useReducer(
    InspectionItemReducer,
    InspectionItemInitialState
  );
  const [inspectionSheet, sheetDispatch] = useReducer(
    InspectionSheetReducer,
    InspectionSheetInitialState
  );

  // register repositories
  register(
    nameof<IInspectionGroupRepository>(),
    new InspectionGroupRepository()
  );
  register(nameof<IInspectionTypeRepository>(), new InspectionTypeRepository());
  register(nameof<IChoiceTemplateRepository>(), new ChoiceTemplateRepository());

  // register use-case interactor
  register(
    nameof<IInspectionGroupInteractor>(),
    new InspectionGroupInteractor(
      inject(nameof<IInspectionGroupRepository>()) as IInspectionGroupRepository
    )
  );
  register(
    nameof<IInspectionTypeInteractor>(),
    new InspectionTypeInteractor(
      inject(nameof<IInspectionTypeRepository>()) as IInspectionTypeRepository
    )
  );
  register(
    nameof<IChoiceTemplateInteractor>(),
    new ChoiceTemplateInteractor(inject(nameof<IChoiceTemplateRepository>()))
  );

  register(
    nameof<IInspectionItemInteractor>(),
    new InspectionItemInteractor(inspectionItem, dispatch)
  );
  register(
    nameof<IInspectionSheetInteractor>(),
    new InspectionSheetInteractor(inspectionSheet, sheetDispatch)
  );

  // register presenter
  register(
    nameof<IHomePresenter>(),
    new HomePresenter(
      inject(nameof<IInspectionTypeInteractor>()) as IInspectionTypeInteractor,
      inject(nameof<IInspectionGroupInteractor>()) as IInspectionGroupInteractor
    )
  );
  register(
    nameof<IDetailPresenter>(),
    new DetailPresenter(
      inject(nameof<IInspectionGroupInteractor>()),
      inject(nameof<IInspectionTypeInteractor>()),
      inject(nameof<IInspectionSheetInteractor>())
    )
  );
  register(
    nameof<IInspectionGroupPresenter>(),
    new InspectionGroupPresenter(
      inject(nameof<IInspectionGroupInteractor>()) as IInspectionGroupInteractor
    )
  );
  register(
    nameof<IInspectionTypePresenter>(),
    new InspectionTypePresenter(
      inject(nameof<IInspectionTypeInteractor>()) as IInspectionTypeInteractor
    )
  );

  // register controller
  register(
    nameof<IHomeController>(),
    new HomeController(
      inject(nameof<IInspectionTypeInteractor>()) as IInspectionTypeInteractor,
      inject(nameof<IInspectionGroupInteractor>()) as IInspectionGroupInteractor
    )
  );
  register(
    nameof<IDetailController>(),
    new DetailController(
      inject(nameof<IInspectionGroupInteractor>()),
      inject(nameof<IInspectionTypeInteractor>()),
      inject(nameof<IInspectionSheetInteractor>())
    )
  );
  register(
    nameof<IInspectionGroupController>(),
    new InspectionGroupController(
      inject(nameof<IInspectionGroupInteractor>()) as IInspectionGroupInteractor
    )
  );
  register(
    nameof<IInspectionTypeController>(),
    new InspectionTypeController(
      inject(nameof<IInspectionTypeInteractor>()) as IInspectionTypeInteractor
    )
  );

  register(
    nameof<IInspectionSheetPresenter>(),
    new InspectionSheetPresenter(
      inject(nameof<IInspectionSheetInteractor>()) as IInspectionSheetInteractor
    )
  );
  register(
    nameof<IInspectionItemPresenter>(),
    new InspectionItemPresenter(inject(nameof<IInspectionItemInteractor>()))
  );
  register(
    nameof<IInspectionSheetController>(),
    new InspectionSheetController(
      inject(nameof<IInspectionSheetInteractor>()) as IInspectionSheetInteractor
    )
  );
  register(
    nameof<IInspectionItemController>(),
    new InspectionItemController(inject(nameof<IInspectionItemInteractor>()))
  );

  register(
    nameof<IChoiceTemplatePresenter>(),
    new ChoiceTemplatePresenter(inject(nameof<IChoiceTemplateInteractor>()))
  );
  register(
    nameof<IChoiceTemplateController>(),
    new ChoiceTemplateController(inject(nameof<IChoiceTemplateInteractor>()))
  );

  return container;
};
