import React, { FC, useContext, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import nameof from "ts-nameof.macro";
import { ChoiceTemplate, toCamelCase } from "../../entities";
import { DIContainerContext } from "../../App";
import { OkCancelDialogActions } from "../common";
import { DialogTitleDesign } from "../stylesheets";
import { IInspectionItemController } from "../../interfaces";

interface ChoiceSetSelectDialogProps {
  open: boolean;
  handleClose: () => void;
}

export const ChoiceSetSelectDialog: FC<ChoiceSetSelectDialogProps> = (
  props: ChoiceSetSelectDialogProps
): JSX.Element => {
  const container = useContext(DIContainerContext);
  const itemController: IInspectionItemController = container.inject(
    nameof<IInspectionItemController>()
  );

  const [value, setValue] = useState(0);
  const [templates, setTemplates] = useState<ChoiceTemplate[]>([]);

  useEffect(() => {
    fetch("choicetemplate")
      .then((res) => toCamelCase(res.json()))
      .then((json: any) => {
        setTemplates(json);
      })
      .catch(console.error);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number((event.target as HTMLInputElement).value));
  };

  const handleSelectTemplate = () => {
    itemController.setChoices(templates[value]);
    props.handleClose();
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle sx={DialogTitleDesign}>テンプレート選択</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <RadioGroup value={value} onChange={handleChange}>
            {templates.map((template: ChoiceTemplate, index: number) => (
              <FormControlLabel
                // eslint-disable-next-line
                key={`label-${index}`}
                value={index}
                control={<Radio data-testid={`radio-${index}`} />}
                label={template.choices.map((x) => x.description).join(",")}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <OkCancelDialogActions
        disabled={false}
        onOkButtonClick={handleSelectTemplate}
        onCancelButtonClick={props.handleClose}
      />
    </Dialog>
  );
};
