import {
  IHomePresenter,
  IInspectionGroupInteractor,
  IInspectionTypeInteractor,
} from "../interfaces";

export class HomePresenter implements IHomePresenter {
  private readonly typeUseCase: IInspectionTypeInteractor;

  private readonly groupUseCase: IInspectionGroupInteractor;

  constructor(
    typeUseCase: IInspectionTypeInteractor,
    groupUseCase: IInspectionGroupInteractor
  ) {
    this.typeUseCase = typeUseCase;
    this.groupUseCase = groupUseCase;
  }

  getGroupIds(keyword: string): number[] {
    return this.groupUseCase.getIds(keyword);
  }

  getGroupName(id: number): string | undefined {
    return this.groupUseCase.getName(id);
  }
}
