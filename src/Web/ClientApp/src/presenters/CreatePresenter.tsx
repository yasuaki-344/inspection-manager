import { Grid, MenuItem, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import { EquipmentForm } from "../components";
import { InputStyle } from "../components/stylesheets";
import {
  Equipment,
  InspectionGroup,
  InspectionSheet,
  InspectionType,
} from "../entities";
import {
  ICreatePresenter,
  IInspectionGroupInteractor,
  IInspectionSheetInteractor,
  IInspectionTypeInteractor,
} from "../interfaces";

export class CreatePresenter implements ICreatePresenter {
  readonly selectionSheets: InspectionSheet[];

  private readonly typeUseCase: IInspectionTypeInteractor;

  private readonly groupUseCase: IInspectionGroupInteractor;

  private readonly sheetUseCase: IInspectionSheetInteractor;

  /**
   * Initializes a new instance of CreatePresenter class
   * @param typeUseCase IInspectionTypeInteractor object.
   * @param groupUseCase IInspectionGroupInteractor object.
   * @param sheetUseCase IInspectionSheetInteractor object.
   */
  constructor(
    typeUseCase: IInspectionTypeInteractor,
    groupUseCase: IInspectionGroupInteractor,
    sheetUseCase: IInspectionSheetInteractor
  ) {
    this.selectionSheets = sheetUseCase.sheets;
    this.typeUseCase = typeUseCase;
    this.groupUseCase = groupUseCase;
    this.sheetUseCase = sheetUseCase;
  }

  /** @inheritdoc */
  sheetIdInformation(isEdit: boolean): JSX.Element {
    return isEdit ? (
      <Grid item xs={12}>
        <TextField
          sx={InputStyle}
          disabled
          label="点検シートID"
          variant="outlined"
          size="small"
          name="sheetId"
          defaultValue={this.sheetUseCase.sheet.sheetId}
          InputProps={{ readOnly: true }}
        />
      </Grid>
    ) : (
      <></>
    );
  }

  /** @inheritdoc */
  sheetNameInput(
    handleChange: (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
  ): JSX.Element {
    return (
      <Grid item xs={12}>
        <TextField
          sx={InputStyle}
          required
          autoFocus
          label="点検シート名"
          variant="outlined"
          size="small"
          name="sheetName"
          value={this.sheetUseCase.sheet.sheetName}
          onChange={handleChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        />
      </Grid>
    );
  }

  /** @inheritdoc */
  groupIdInput(
    handleChange: (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
  ): JSX.Element {
    return (
      <Grid item xs={12}>
        <TextField
          sx={InputStyle}
          select
          label="点検グループ"
          variant="outlined"
          size="small"
          name="inspectionGroupId"
          value={this.sheetUseCase.sheet.inspectionGroupId}
          onChange={handleChange}
        >
          {this.groupUseCase.groups.map((group: InspectionGroup) => (
            <MenuItem
              key={group.inspectionGroupId}
              value={group.inspectionGroupId}
            >
              {group.description}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    );
  }

  /** @inheritdoc */
  typeIdInput(
    handleChange: (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
  ): JSX.Element {
    return (
      <Grid item xs={12}>
        <TextField
          sx={InputStyle}
          select
          label="点検タイプ"
          variant="outlined"
          size="small"
          name="inspectionTypeId"
          value={this.sheetUseCase.sheet.inspectionTypeId}
          onChange={handleChange}
        >
          {this.typeUseCase.types.map((type: InspectionType) => (
            <MenuItem key={type.inspectionTypeId} value={type.inspectionTypeId}>
              {type.description}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    );
  }

  /** @inheritdoc */
  getEditContent(): JSX.Element {
    return (
      <>
        {this.sheetUseCase.sheet.equipments.map((equipment: Equipment) => (
          <Grid item xs={12} key={equipment.orderIndex}>
            <EquipmentForm
              orderIndex={equipment.orderIndex}
              equipment={equipment}
            />
          </Grid>
        ))}
      </>
    );
  }
}
