import { List, ListItem } from "@mui/material";
import { Equipment } from "../entities";
import {
  IDetailPresenter,
  IInspectionGroupInteractor,
  IInspectionSheetInteractor,
  IInspectionTypeInteractor,
} from "../interfaces";

export class DetailPresenter implements IDetailPresenter {
  private readonly groupUseCase: IInspectionGroupInteractor;

  private readonly typeUseCase: IInspectionTypeInteractor;

  private readonly sheetUseCase: IInspectionSheetInteractor;

  /**
   * Initializes a new instance of DetailPresenter class
   * @param typeUseCase IInspectionTypeInteractor object.
   * @param groupUseCase IInspectionGroupInteractor object.
   * @param sheetUseCase IInspectionSheetInteractor object.
   */
  constructor(
    groupUseCase: IInspectionGroupInteractor,
    typeUseCase: IInspectionTypeInteractor,
    sheetUseCase: IInspectionSheetInteractor
  ) {
    this.groupUseCase = groupUseCase;
    this.typeUseCase = typeUseCase;
    this.sheetUseCase = sheetUseCase;
  }

  sheetInformationList(): JSX.Element {
    const { sheetId, sheetName, inspectionGroupId, inspectionTypeId } =
      this.sheetUseCase.sheet;
    return (
      <List>
        <ListItem>点検シートID:{sheetId}</ListItem>
        <ListItem>シート名:{sheetName}</ListItem>
        <ListItem>
          点検グループ:
          {this.groupUseCase.getName(inspectionGroupId)}
        </ListItem>
        <ListItem>
          点検種別:
          {this.typeUseCase.getName(inspectionTypeId)}
        </ListItem>
      </List>
    );
  }

  equipments(): Equipment[] {
    return this.sheetUseCase.sheet.equipments;
  }
}
