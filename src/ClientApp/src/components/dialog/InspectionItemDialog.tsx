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
import { IInspectionItemInteractor } from "../../interfaces";
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
  const itemUseCase: IInspectionItemInteractor = inject(
    nameof<IInspectionItemInteractor>()
  );

  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(!itemUseCase.isValidInspectionItem());
  }, [itemUseCase.inspectionItem]);

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
                value={itemUseCase.inspectionItem.inspectionContent}
                onChange={(e) => {
                  const { name, value } = e.target;
                  itemUseCase.updateField(name, value);
                }}
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
                value={itemUseCase.inspectionItem.inputType}
                onChange={(e) => {
                  const { name, value } = e.target;
                  itemUseCase.updateField(name, value);
                }}
              >
                {useInputTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {itemUseCase.inspectionItem.inputType !== 3 ? (
              <></>
            ) : (
              <>
                {itemUseCase.inspectionItem.choices.map(
                  (choice: Choice, index: number) => (
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
                          onChange={(e) => {
                            const { value } = e.target;
                            itemUseCase.updateChoice(choice.orderIndex, value);
                          }}
                        />
                        <CancelIconButton
                          onClick={() =>
                            itemUseCase.removeChoice(choice.orderIndex)
                          }
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
                      onClick={() => itemUseCase.addChoice()}
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
