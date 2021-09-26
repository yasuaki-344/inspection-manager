import React, { FC, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { ChoiceTemplate, Option } from "../../entities";
import {
  BottomNavigationAdd,
  CancelIconButton,
  OkCancelDialogActions,
} from "../utilities";
import { DialogTitleDesign, InputStyle } from "../stylesheets";

interface ChoiceTemplateEditDialogProps {
  open: boolean;
  target: ChoiceTemplate;
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

  addChoice(): void {
    this.dispatch({
      ...this.state,
      choices: this.state.choices.concat({
        optionId: 0,
        description: "",
      }),
    });
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

  deleteChoice(index: number): void {
    this.dispatch({
      ...this.state,
      choices: this.state.choices.filter(
        (value: Option, i: number) => i !== index
      ),
    });
  }
}

export const ChoiceTemplateEditDialog: FC<ChoiceTemplateEditDialogProps> = (
  props: ChoiceTemplateEditDialogProps
): JSX.Element => {
  const [disabled, setDisabled] = useState(false);
  const editor = new ChoiceTemplateEditor(props.target, props.setTarget);
  useEffect(() => {
    setDisabled(!editor.isValid());
  }, [props.target]);

  const addChoice = (): void => editor.addChoice();

  const updateChoice = (index: number, input: string): void =>
    editor.updateChoice(index, input);

  const deleteChoice = (index: number): void => editor.deleteChoice(index);

  return (
    <Dialog open={props.open} onClose={props.onCancelButtonClick}>
      <DialogTitle sx={DialogTitleDesign}>選択肢テンプレート編集</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} sx={{ pt: 1.5 }}>
          {props.target.choices.map((choice: Option, index: number) => (
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
              <CancelIconButton onClick={() => deleteChoice(index)} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <BottomNavigationAdd label="選択肢追加" onClick={addChoice} />
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
