import { createContext, useContext, useReducer, useState } from "react";
import nameof from "ts-nameof.macro";
import {
  ChoiceTemplateController,
  InspectionGroupController,
  InspectionItemController,
  InspectionSheetController,
  InspectionTypeController,
} from "../controllers";
import {
  ChoiceTemplate,
  InspectionGroup,
  InspectionItemInitialState,
  InspectionItemReducer,
  InspectionSheetInitialState,
  InspectionSheetReducer,
  InspectionType,
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

  // register repositories
  register(
    nameof<IInspectionGroupRepository>(),
    new InspectionGroupRepository()
  );
  register(nameof<IInspectionTypeRepository>(), new InspectionTypeRepository());
  register(
    nameof<IInspectionGroupInteractor>(),
    new InspectionGroupInteractor(
      groups,
      setGroups,
      inject(nameof<IInspectionGroupRepository>()) as IInspectionGroupRepository
    )
  );
  register(
    nameof<IInspectionTypeInteractor>(),
    new InspectionTypeInteractor(
      types,
      setTypes,
      inject(
        nameof<IInspectionTypeRepository>()
      ) as IInspectionTypeRepository
    )
  );
  register(
    nameof<IInspectionGroupPresenter>(),
    new InspectionGroupPresenter(
      inject(nameof<IInspectionGroupInteractor>()) as IInspectionGroupInteractor
    )
  );
  register(
    nameof<IInspectionGroupController>(),
    new InspectionGroupController(
      inject(nameof<IInspectionGroupInteractor>()) as IInspectionGroupInteractor
    )
  );
  register(
    nameof<IInspectionTypePresenter>(),
    new InspectionTypePresenter(
      inject(nameof<IInspectionTypeInteractor>()) as IInspectionTypeInteractor
    )
  );
  register(
    nameof<IInspectionTypeController>(),
    new InspectionTypeController(
      inject(nameof<IInspectionTypeInteractor>()) as IInspectionTypeInteractor
    )
  );
  register(
    nameof<IInspectionItemInteractor>(),
    new InspectionItemInteractor(inspectionItem, dispatch)
  );
  register(
    nameof<IInspectionSheetInteractor>(),
    new InspectionSheetInteractor(inspectionSheet, sheetDispatch)
  );
  register(
    nameof<IInspectionSheetInteractor>(),
    new InspectionSheetInteractor(inspectionSheet, sheetDispatch)
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
  const [templates, setTemplates] = useState<Array<ChoiceTemplate>>([]);
  register(nameof<IChoiceTemplateRepository>(), new ChoiceTemplateRepository());
  register(
    nameof<IChoiceTemplateInteractor>(),
    new ChoiceTemplateInteractor(
      templates,
      setTemplates,
      inject(nameof<IChoiceTemplateRepository>())
    )
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
