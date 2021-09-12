import { Choice, InspectionItem, useInputTypes } from "../entities";
import { IInspectionItemInteractor } from "../interfaces";
import {
  BottomNavigation, BottomNavigationAction,
  Grid, TextField, MenuItem,
} from '@material-ui/core';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import { BottomNavigationAdd, CancelIconButton } from "../components/common";


export class InspectionItemPresenter {
  private readonly useCase: IInspectionItemInteractor

  constructor(useCase: IInspectionItemInteractor) {
    this.useCase = useCase
  }

  getState(): InspectionItem {
    return this.useCase.getState();
  }

  getEditContent(
    onTemplateSelectClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  ): JSX.Element {
    const inspectionItem = this.useCase.getState();
    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            autoFocus
            label='点検項目'
            variant='outlined'
            size='small'
            name='inspection_content'
            value={inspectionItem.inspection_content}
            onChange={(e) => this.useCase.updateField(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            select
            label='点検タイプ'
            variant='outlined'
            size='small'
            name='input_type'
            value={inspectionItem.input_type}
            onChange={(e) => { this.useCase.updateField(e); }}
          >
            {useInputTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem >
            ))}
          </TextField>
        </Grid>

        {(inspectionItem.input_type !== 3) ? <></> :
          <>
            {inspectionItem.choices.map((choice: Choice, index: number) =>
              <Grid item xs={12} key={`${inspectionItem.inspection_item_id}_${index}`}>
                <TextField
                  required
                  id='outlined-required'
                  label={`選択肢${index + 1}`}
                  variant='outlined'
                  size='small'
                  name='choice'
                  value={choice.description}
                  onChange={(e) => this.useCase.updateChoice(e, index)}
                />
                <CancelIconButton
                  onClick={(e) => this.useCase.removeChoice(index)}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <BottomNavigationAdd
                label='選択肢追加'
                onClick={() => this.useCase.addChoice()}
              />
              <BottomNavigation showLabels>
                <BottomNavigationAction
                  label='テンプレート選択'
                  icon={<FormatListNumberedIcon />}
                  onClick={onTemplateSelectClick}
                />
              </BottomNavigation>
            </Grid>
          </>
        }
      </Grid>
    )
  }
}