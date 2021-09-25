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

export const ChoiceTemplateEditDialog: FC<ChoiceTemplateEditDialogProps> = (
  props: ChoiceTemplateEditDialogProps
): JSX.Element => {
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (!props.target.choices.length) {
      setDisabled(true);
    } else {
      const index = props.target.choices.findIndex((x) => x.description === "");
      setDisabled(index !== -1);
    }
  }, [props.target]);

  const addChoice = (): void => {
    props.setTarget({
      ...props.target,
      choices: props.target.choices.concat({
        optionId: 0,
        description: "",
      }),
    });
  };

  const updateChoice = (index: number, input: string): void => {
    props.setTarget({
      ...props.target,
      choices: props.target.choices.map((value: Option, i: number) => {
        return i !== index
          ? value
          : {
              optionId: value.optionId,
              description: input,
            };
      }),
    });
  };

  const deleteChoice = (index: number): void => {
    props.setTarget({
      ...props.target,
      choices: props.target.choices.filter(
        (value: Option, i: number) => i !== index
      ),
    });
  };

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
