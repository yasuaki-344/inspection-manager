import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { Box } from "@mui/system";
import { Choice, InspectionItem, useInputTypes } from "../entities";
import {
  IInspectionItemInteractor,
  IInspectionItemPresenter,
} from "../interfaces";
import { CancelIconButton } from "../components/common";
import { InputStyle } from "../components/stylesheets";

export class InspectionItemPresenter implements IInspectionItemPresenter {
  private readonly useCase: IInspectionItemInteractor;

  constructor(useCase: IInspectionItemInteractor) {
    this.useCase = useCase;
  }

  getState(): InspectionItem {
    return this.useCase.inspectionItem;
  }

  isValidInspectionItem(): boolean {
    return this.useCase.isValidInspectionItem();
  }

  getEditContent(
    onTemplateSelectClick: (
      event: React.MouseEvent<HTMLElement, MouseEvent>
    ) => void
  ): JSX.Element {
    return (
      <Grid container spacing={1} sx={{ pt: 1.5 }}>
        <Grid item xs={12}>
          <TextField
            sx={InputStyle}
            required
            fullWidth
            autoFocus
            label="点検項目"
            variant="outlined"
            size="small"
            name="inspectionContent"
            value={this.useCase.inspectionItem.inspectionContent}
            onChange={(e) => this.useCase.updateField(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={InputStyle}
            required
            fullWidth
            select
            label="点検タイプ"
            variant="outlined"
            size="small"
            name="inputType"
            value={this.useCase.inspectionItem.inputType}
            onChange={(e) => this.useCase.updateField(e)}
          >
            {useInputTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {this.useCase.inspectionItem.inputType !== 3 ? (
          <></>
        ) : (
          <>
            {this.useCase.inspectionItem.choices.map(
              (choice: Choice, index: number) => (
                <Grid
                  item
                  xs={12}
                  // eslint-disable-next-line
                  key={`${this.useCase.inspectionItem.inspectionItemId}_${index}`}
                >
                  <Box sx={InputStyle}>
                    <TextField
                      required
                      id="outlined-required"
                      label={`選択肢${index + 1}`}
                      variant="outlined"
                      size="small"
                      name="choice"
                      value={choice.description}
                      onChange={(e) => this.useCase.updateChoice(e, index)}
                    />
                    <CancelIconButton
                      onClick={() => this.useCase.removeChoice(index)}
                    />
                  </Box>
                </Grid>
              )
            )}
            <Grid item xs={12}>
              <BottomNavigation showLabels>
                <BottomNavigationAction
                  label="選択肢追加"
                  icon={<AddCircleIcon />}
                  onClick={() => this.useCase.addChoice()}
                />
                <BottomNavigationAction
                  label="テンプレート選択"
                  icon={<FormatListNumberedIcon />}
                  onClick={onTemplateSelectClick}
                />
              </BottomNavigation>
            </Grid>
          </>
        )}
      </Grid>
    );
  }
}
