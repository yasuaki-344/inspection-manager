import React, { useState, useEffect } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import nameof from "ts-nameof.macro";
import { ChoiceSetSelectDialog } from "./ChoiceSetSelectDialog";
import { CancelIconButton, OkCancelDialogActions } from "../utilities";
import { DialogTitleDesign, InputStyle } from "../stylesheets";
import {
  IInspectionSheetPresenter,
  IInspectionSheetController,
} from "../../interfaces";
import { useDIContext } from "../../container";
import { Choice, useInputTypes } from "../../entities";

interface InspectionDialogProps {
  open: boolean;
  onCancelButtonClick: () => void;
  onOkButtonClick: () => void;
}

export const InspectionItemDialog = (
  props: InspectionDialogProps
): JSX.Element => {
  const inject = useDIContext();
  const controller: IInspectionSheetController = inject(
    nameof<IInspectionSheetController>()
  );
  const presenter: IInspectionSheetPresenter = inject(
    nameof<IInspectionSheetPresenter>()
  );
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(!presenter.isValidInspectionItem());
  }, [presenter.item]);

  return (
    <>
      <Dialog open={props.open} onClose={props.onCancelButtonClick}>
        <DialogTitle sx={DialogTitleDesign}>点検項目編集</DialogTitle>
        <DialogContent>
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
                value={presenter.item.inspectionContent}
                onChange={controller.updateInspectionItemField}
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
                value={presenter.item.inputType}
                onChange={controller.updateInspectionItemField}
              >
                {useInputTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {presenter.item.inputType !== 3 ? (
              <></>
            ) : (
              <>
                {presenter.item.choices.map((choice: Choice, index: number) => (
                  <Grid item xs={12} key={choice.orderIndex}>
                    <Box sx={InputStyle}>
                      <TextField
                        required
                        id="outlined-required"
                        label={`選択肢${index + 1}`}
                        variant="outlined"
                        size="small"
                        name="choice"
                        value={choice.description}
                        onChange={(e) =>
                          controller.updateInspectionItemChoiceField(
                            e,
                            choice.orderIndex
                          )
                        }
                      />
                      <CancelIconButton
                        onClick={() =>
                          controller.removeInspectionItemChoice(
                            choice.orderIndex
                          )
                        }
                      />
                    </Box>
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <BottomNavigation showLabels>
                    <BottomNavigationAction
                      label="選択肢追加"
                      icon={<AddCircleIcon />}
                      onClick={() => controller.addInspectionItemChoice()}
                    />
                    <BottomNavigationAction
                      label="テンプレート選択"
                      icon={<FormatListNumberedIcon />}
                      onClick={() => setOpen(true)}
                    />
                  </BottomNavigation>
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <OkCancelDialogActions
          disabled={disabled}
          onOkButtonClick={props.onOkButtonClick}
          onCancelButtonClick={props.onCancelButtonClick}
        />
      </Dialog>
      <ChoiceSetSelectDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};
