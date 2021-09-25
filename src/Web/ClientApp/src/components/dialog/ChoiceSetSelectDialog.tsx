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
import { ChoiceTemplate } from "../../entities";
import { DIContainerContext } from "../../App";
import { OkCancelDialogActions } from "../utilities";
import { DialogTitleDesign } from "../stylesheets";
import {
  IChoiceTemplatePresenter,
  IInspectionItemController,
} from "../../interfaces";

interface ChoiceSetSelectDialogProps {
  open: boolean;
  onClose: () => void;
}

export const ChoiceSetSelectDialog: FC<ChoiceSetSelectDialogProps> = (
  props: ChoiceSetSelectDialogProps
): JSX.Element => {
  const container = useContext(DIContainerContext);
  const itemController: IInspectionItemController = container.inject(
    nameof<IInspectionItemController>()
  );
  const templatePresenter: IChoiceTemplatePresenter = container.inject(
    nameof<IChoiceTemplatePresenter>()
  );
  const [value, setValue] = useState(0);

  useEffect(() => {
    templatePresenter.get();
  }, []);

  /**
   * Change selected template choices .
   * @param event Radio button change event
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number((event.target as HTMLInputElement).value));
  };

  /**
   * Sets selected template choices to the inspection item object
   * and closes this dialog.
   */
  const handleSelectTemplate = () => {
    const template = templatePresenter.getByIndex(value);
    if (template != null) {
      itemController.setChoices(template);
    }
    props.onClose();
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle sx={DialogTitleDesign}>テンプレート選択</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <RadioGroup value={value} onChange={handleChange}>
            {templatePresenter.state.map(
              (template: ChoiceTemplate, index: number) => (
                <FormControlLabel
                  key={template.choiceTemplateId}
                  value={index}
                  control={<Radio data-testid={`radio-${index}`} />}
                  label={template.choices.map((x) => x.description).join(",")}
                />
              )
            )}
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <OkCancelDialogActions
        disabled={false}
        onOkButtonClick={handleSelectTemplate}
        onCancelButtonClick={props.onClose}
      />
    </Dialog>
  );
};
