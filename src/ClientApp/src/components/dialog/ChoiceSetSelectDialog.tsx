import React, { FC, useState, useEffect } from "react";
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
import { OkCancelDialogActions } from "../utilities";
import { DialogTitleDesign } from "../stylesheets";
import {
  IChoiceTemplateInteractor,
  IInspectionItemInteractor,
} from "../../interfaces";
import { useDIContext } from "../../container";

interface ChoiceSetSelectDialogProps {
  open: boolean;
  onClose: () => void;
}

export const ChoiceSetSelectDialog: FC<ChoiceSetSelectDialogProps> = (
  props: ChoiceSetSelectDialogProps
): JSX.Element => {
  const inject = useDIContext();
  const useCase: IChoiceTemplateInteractor = inject(
    nameof<IChoiceTemplateInteractor>()
  );
  const itemUseCase: IInspectionItemInteractor = inject(
    nameof<IInspectionItemInteractor>()
  );

  const [value, setValue] = useState(0);

  useEffect(() => {
    useCase.fetchAllChoiceTemplates();
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
    const template = useCase.templates[value];
    if (template != null) {
      itemUseCase.setChoices(template);
    }
    props.onClose();
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle sx={DialogTitleDesign}>テンプレート選択</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <RadioGroup value={value} onChange={handleChange}>
            {useCase.templates.map(
              (template: ChoiceTemplate, index: number) => (
                <FormControlLabel
                  key={template.id}
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
