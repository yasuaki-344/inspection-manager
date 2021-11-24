import React, { FC, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import nameof from "ts-nameof.macro";
import { Option } from "../../entities";
import {
  BottomNavigationAdd,
  CancelIconButton,
  OkCancelDialogActions,
} from "../utilities";
import { DialogTitleDesign, InputStyle } from "../stylesheets";
import { useDIContext } from "../../container";
import {
  IChoiceTemplateController,
  IChoiceTemplatePresenter,
} from "../../interfaces";

interface ChoiceTemplateEditDialogProps {
  open: boolean;
  onOkButtonClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onCancelButtonClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export const ChoiceTemplateEditDialog: FC<ChoiceTemplateEditDialogProps> = (
  props: ChoiceTemplateEditDialogProps
): JSX.Element => {
  const inject = useDIContext();
  const controller: IChoiceTemplateController = inject(
    nameof<IChoiceTemplateController>()
  );
  const presenter: IChoiceTemplatePresenter = inject(
    nameof<IChoiceTemplatePresenter>()
  );

  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    setDisabled(!presenter.isTargetValid());
  }, [presenter.target]);

  return (
    <Dialog open={props.open} onClose={props.onCancelButtonClick}>
      <DialogTitle sx={DialogTitleDesign}>選択肢テンプレート編集</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} sx={{ pt: 1.5 }}>
          {presenter.target.choices.map((choice: Option, index: number) => (
            <Grid item xs={12} sx={InputStyle} key={choice.optionId}>
              <TextField
                required
                id="outlined-required"
                label={`選択肢${index + 1}`}
                variant="outlined"
                size="small"
                name="choice"
                value={choice.description}
                onChange={(e) => controller.updateChoice(index, e.target.value)}
              />
              <CancelIconButton
                onClick={() => controller.removeChoice(index)}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <BottomNavigationAdd
              label="選択肢追加"
              onClick={() => controller.addChoice()}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <OkCancelDialogActions
        disabled={disabled}
        onOkButtonClick={props.onOkButtonClick}
        onCancelButtonClick={props.onCancelButtonClick}
      />
    </Dialog>
  );
};
