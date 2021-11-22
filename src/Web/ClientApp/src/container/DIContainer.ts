import { createContext, useContext } from "react";
import nameof from "ts-nameof.macro";
import {
  ChoiceTemplateController,
  InspectionSheetController,
  DetailController,
  HomeController,
  InspectionGroupController,
  InspectionTypeController,
} from "../controllers";
import {
  ChoiceTemplateRepository,
  InspectionGroupRepository,
  InspectionSheetRepository,
  InspectionTypeRepository,
} from "../infrastructure";
import {
  IChoiceTemplateController,
  IChoiceTemplateInteractor,
  IChoiceTemplatePresenter,
  IChoiceTemplateRepository,
  IInspectionSheetController,
  IInspectionSheetPresenter,
  IDetailController,
  IDetailPresenter,
  IHomeController,
  IHomePresenter,
  IInspectionGroupController,
  IInspectionGroupInteractor,
  IInspectionGroupPresenter,
  IInspectionGroupRepository,
  IInspectionItemInteractor,
  IInspectionSheetInteractor,
  IInspectionSheetRepository,
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
  InspectionTypePresenter,
} from "../presenters";
import { InspectionSheetPresenter } from "../presenters/InspectionSheetPresenter";
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
    new InspectionSheetInteractor(inject(nameof<IInspectionSheetRepository>()))
  );

  // register presenter
  register(
    nameof<IInspectionSheetPresenter>(),
    new InspectionSheetPresenter(
      inject(nameof<IInspectionTypeInteractor>()) as InspectionTypeInteractor,
      inject(
        nameof<IInspectionGroupInteractor>()
      ) as IInspectionGroupInteractor,
      inject(
        nameof<IInspectionSheetInteractor>()
      ) as IInspectionSheetInteractor,
      inject(nameof<IInspectionItemInteractor>()) as IInspectionItemInteractor
    )
  );
  register(
    nameof<IDetailPresenter>(),
    new DetailPresenter(
      inject(
        nameof<IInspectionGroupInteractor>()
      ) as IInspectionGroupInteractor,
      inject(nameof<IInspectionTypeInteractor>()) as InspectionTypeInteractor,
      inject(nameof<IInspectionSheetInteractor>()) as IInspectionSheetInteractor
    )
  );
  register(
    nameof<IHomePresenter>(),
    new HomePresenter(
      inject(nameof<IInspectionTypeInteractor>()) as IInspectionTypeInteractor,
      inject(
        nameof<IInspectionGroupInteractor>()
      ) as IInspectionGroupInteractor,
      inject(nameof<IInspectionSheetInteractor>()) as IInspectionSheetInteractor
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
    nameof<IInspectionSheetController>(),
    new InspectionSheetController(
      inject(nameof<IInspectionTypeInteractor>()) as IInspectionTypeInteractor,
      inject(
        nameof<IInspectionGroupInteractor>()
      ) as IInspectionGroupInteractor,
      inject(
        nameof<IInspectionSheetInteractor>()
      ) as IInspectionSheetInteractor,
      inject(nameof<IInspectionItemInteractor>()) as IInspectionItemInteractor
    )
  );
  register(
    nameof<IDetailController>(),
    new DetailController(
      inject(
        nameof<IInspectionGroupInteractor>()
      ) as IInspectionGroupInteractor,
      inject(nameof<IInspectionTypeInteractor>()) as InspectionTypeInteractor,
      inject(nameof<IInspectionSheetInteractor>()) as IInspectionSheetInteractor
    )
  );
  register(
    nameof<IHomeController>(),
    new HomeController(
      inject(nameof<IInspectionTypeInteractor>()) as IInspectionTypeInteractor,
      inject(
        nameof<IInspectionGroupInteractor>()
      ) as IInspectionGroupInteractor,
      inject(nameof<IInspectionSheetInteractor>()) as IInspectionSheetInteractor
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

  // register presenter
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
