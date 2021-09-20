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
import { ChoiceTemplate } from "../../../typescript-fetch";
import { InspectionItemContext } from "../../../App";
import { OkCancelDialogActions } from "../../common";
import { DialogTitleDesign } from "../../stylesheets";

interface ChoiceSetSelectDialogProps {
  open: boolean;
  handleClose: () => void;
}

export const ChoiceSetSelectDialog: FC<ChoiceSetSelectDialogProps> = ({
  open,
  handleClose,
}): JSX.Element => {
  const { itemController } = useContext(InspectionItemContext);
  const [value, setValue] = useState(0);
  const [templates, setTemplates] = useState<ChoiceTemplate[]>([]);

  useEffect(() => {
    fetch("choicetemplate")
      .then((res) => res.json())
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
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={DialogTitleDesign}>テンプレート選択</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <RadioGroup value={value} onChange={handleChange}>
            {templates.map((template: ChoiceTemplate, index: number) => (
              <FormControlLabel
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
        onCancelButtonClick={handleClose}
      />
    </Dialog>
  );
};
