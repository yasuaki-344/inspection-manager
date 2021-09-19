import { MenuItem, Grid, TextField } from '@mui/material';
import { Box } from "@mui/system";
import { Equipment, InspectionSheet } from "../entities";
import { IInspectionSheetInteractor } from "../interfaces";
import { EquipmentForm } from "../components/inspection/form/EquipmentForm";
import { InspectionGroup, InspectionType } from "../typescript-fetch";
import { LabelStyle, InputStyle } from './../components/stylesheets';

export class InspectionSheetPresenter {
  private readonly useCase: IInspectionSheetInteractor

  constructor(useCase: IInspectionSheetInteractor) {
    this.useCase = useCase
  }

  getState(): InspectionSheet {
    return this.useCase.getState();
  }

  getEditContent(
    isEdit: boolean,
    groups: Array<InspectionGroup>,
    types: Array<InspectionType>,
    handleAddItem: any,
    handleEditItem: any,
    storeHistory: any
  ): JSX.Element {
    const sheet = this.useCase.getState();

    const contents = isEdit
      ? <Grid item xs={12}>
        <TextField
          sx={InputStyle}
          disabled
          label="点検シートID"
          variant="outlined"
          size="small"
          name="sheet_id"
          defaultValue={sheet.sheet_id}
          InputProps={{ readOnly: true, }}
        />
      </Grid>
      : <></>;

    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box sx={LabelStyle}>
            点検シート情報
          </Box>
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
            name="sheet_name"
            value={sheet.sheet_name}
            onChange={e => this.useCase.updateField(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={InputStyle}
            select
            label='点検グループ'
            variant='outlined'
            size='small'
            name='inspection_group_id'
            value={sheet.inspection_group_id}
            onChange={e => this.useCase.updateField(e)}
          >
            {groups.map((option: InspectionGroup) => (
              <MenuItem key={option.inspection_group_id} value={option.inspection_group_id}>
                {option.description}
              </MenuItem >
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={InputStyle}
            select
            label='点検タイプ'
            variant='outlined'
            size='small'
            name='inspection_type_id'
            value={sheet.inspection_type_id}
            onChange={e => this.useCase.updateField(e)}
          >
            {types.map((option: InspectionType) => (
              <MenuItem key={option.inspection_type_id} value={option.inspection_type_id}>
                {option.description}
              </MenuItem >
            ))}
          </TextField>
        </Grid>
        {sheet.equipments.map((equipment: Equipment, index: number) =>
          <Grid item xs={12} key={`equipment-${index}`}>
            <EquipmentForm
              index={index}
              equipment={equipment}
              handleAddItem={handleAddItem}
              handleEditItem={handleEditItem}
              storeHistory={storeHistory}
            />
          </Grid>
        )}
      </Grid>
    )
  }
}