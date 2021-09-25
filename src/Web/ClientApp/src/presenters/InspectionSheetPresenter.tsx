import { MenuItem, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import {
  Equipment,
  InspectionSheet,
  InspectionGroup,
  InspectionType,
} from "../entities";
import { IInspectionSheetInteractor } from "../interfaces";
import { IInspectionSheetPresenter } from "../interfaces/presenter";
import { EquipmentForm } from "../components/inspection/form/EquipmentForm";
import { LabelStyle, InputStyle } from "../components/stylesheets";

export class InspectionSheetPresenter implements IInspectionSheetPresenter {
  private readonly useCase: IInspectionSheetInteractor;

  constructor(useCase: IInspectionSheetInteractor) {
    this.useCase = useCase;
  }

  async getAllInspectionSheet(): Promise<Array<InspectionSheet>> {
    const sheets = await this.useCase.getAllInspectionSheet();
    return sheets;
  }

  async getInspectionSheetById(id: number): Promise<void> {
    await this.useCase.getInspectionSheetById(id);
  }

  getState(): InspectionSheet {
    return this.useCase.sheet;
  }

  getEditContent(
    isEdit: boolean,
    groups: Array<InspectionGroup>,
    types: Array<InspectionType>,
    handleAddItem: any,
    handleEditItem: any
    // storeHistory: any
  ): JSX.Element {
    const contents = isEdit ? (
      <Grid item xs={12}>
        <TextField
          sx={InputStyle}
          disabled
          label="点検シートID"
          variant="outlined"
          size="small"
          name="sheetId"
          defaultValue={this.useCase.sheet.sheetId}
          InputProps={{ readOnly: true }}
        />
      </Grid>
    ) : (
      <></>
    );

    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box sx={LabelStyle}>点検シート情報</Box>
        </Grid>
        {contents}
        <Grid item xs={12}>
          <TextField
            sx={InputStyle}
            required
            autoFocus
            label="点検シート名"
            variant="outlined"
            size="small"
            name="sheetName"
            value={this.useCase.sheet.sheetName}
            onChange={(e) => this.useCase.updateField(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={InputStyle}
            select
            label="点検グループ"
            variant="outlined"
            size="small"
            name="inspectionGroupId"
            value={this.useCase.sheet.inspectionGroupId}
            onChange={(e) => this.useCase.updateField(e)}
          >
            {groups.map((option: InspectionGroup) => (
              <MenuItem
                key={option.inspectionGroupId}
                value={option.inspectionGroupId}
              >
                {option.description}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={InputStyle}
            select
            label="点検タイプ"
            variant="outlined"
            size="small"
            name="inspectionTypeId"
            value={this.useCase.sheet.inspectionTypeId}
            onChange={(e) => this.useCase.updateField(e)}
          >
            {types.map((option: InspectionType) => (
              <MenuItem
                key={option.inspectionTypeId}
                value={option.inspectionTypeId}
              >
                {option.description}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {this.useCase.sheet.equipments.map(
          (equipment: Equipment, index: number) => (
            // eslint-disable-next-line
            <Grid item xs={12} key={`equipment-${index}`}>
              <EquipmentForm
                index={index}
                equipment={equipment}
                handleAddItem={handleAddItem}
                handleEditItem={handleEditItem}
                // storeHistory={storeHistory}
              />
            </Grid>
          )
        )}
      </Grid>
    );
  }
}
