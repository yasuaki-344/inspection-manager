import React, { FC, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import nameof from "ts-nameof.macro";
import { ChoiceTemplate, Option } from "../../entities";
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
  setTarget: React.Dispatch<React.SetStateAction<ChoiceTemplate>>;
  onOkButtonClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onCancelButtonClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

class ChoiceTemplateEditor {
  readonly state: ChoiceTemplate;

  private readonly dispatch: React.Dispatch<
    React.SetStateAction<ChoiceTemplate>
  >;

  constructor(
    state: ChoiceTemplate,
    dispatch: React.Dispatch<React.SetStateAction<ChoiceTemplate>>
  ) {
    this.state = state;
    this.dispatch = dispatch;
  }

  isValid(): boolean {
    if (!this.state.choices.length) {
      return false;
    }
    const index = this.state.choices.findIndex((x) => x.description === "");
    return index === -1;
  }

  updateChoice(index: number, input: string): void {
    this.dispatch({
      ...this.state,
      choices: this.state.choices.map((value: Option, i: number) => {
        return i !== index
          ? value
          : {
              optionId: value.optionId,
              description: input,
            };
      }),
    });
  }
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
  const editor = new ChoiceTemplateEditor(presenter.target, props.setTarget);
  useEffect(() => {
    setDisabled(!editor.isValid());
  }, [presenter.target]);

  const updateChoice = (index: number, input: string): void =>
    editor.updateChoice(index, input);

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
                onChange={(e) => updateChoice(index, e.target.value)}
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
