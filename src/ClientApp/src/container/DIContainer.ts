import { createContext, useContext } from "react";
import nameof from "ts-nameof.macro";
import {
  ChoiceTemplateRepository,
  InspectionGroupRepository,
  InspectionSheetRepository,
  InspectionTypeRepository,
} from "../infrastructure";
import {
  IChoiceTemplateInteractor,
  IChoiceTemplateRepository,
  IInspectionGroupInteractor,
  IInspectionGroupRepository,
  IInspectionItemInteractor,
  IInspectionSheetInteractor,
  IInspectionSheetRepository,
  IInspectionTypeInteractor,
  IInspectionTypeRepository,
} from "../interfaces";
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
  // register repositories
  register(
    nameof<IInspectionGroupRepository>(),
    new InspectionGroupRepository()
  );
  register(nameof<IInspectionTypeRepository>(), new InspectionTypeRepository());
  register(nameof<IChoiceTemplateRepository>(), new ChoiceTemplateRepository());
  register(
    nameof<IInspectionSheetRepository>(),
    new InspectionSheetRepository()
  );

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

  register(nameof<IInspectionItemInteractor>(), new InspectionItemInteractor());
  register(
    nameof<IInspectionSheetInteractor>(),
    new InspectionSheetInteractor(
      inject(nameof<IInspectionTypeRepository>()),
      inject(nameof<IInspectionGroupRepository>()),
      inject(nameof<IInspectionSheetRepository>())
    )
  );

  return container;
};
