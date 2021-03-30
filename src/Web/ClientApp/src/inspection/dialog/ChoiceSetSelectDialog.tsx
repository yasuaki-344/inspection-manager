import React, { useContext, useState, useEffect } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Radio, RadioGroup, FormControl, FormControlLabel,
} from '@material-ui/core';
import { InspectionItemContext } from '../context/InspectionItemContext';

interface ChoiceSetSelectDialogProps {
  open: boolean,
  handleClose: () => void,
};

export const ChoiceSetSelectDialog = (props: ChoiceSetSelectDialogProps): JSX.Element => {
  const context = useContext(InspectionItemContext);
  const [value, setValue] = useState(0);
  const [templates, setTemplates] = useState<any>([]);

  useEffect(() => {
    fetch('choicetemplate')
      .then(res => res.json())
      .then((json: any) => {
        setTemplates(json);
      })
      .catch(console.error);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number((event.target as HTMLInputElement).value));
  };

  const handleSelectTemplate = () => {
    context.setChoices(templates[value].choices);
    props.handleClose();
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>テンプレート選択</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <RadioGroup value={value} onChange={handleChange}>
            {templates.map((template: any, index: number) => (
              <FormControlLabel value={index} control={<Radio />} label={template.choices.join(',')} />
            ))}
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          color='primary'
          onClick={handleSelectTemplate}
        >OK</Button>
        <Button
          variant='contained'
          onClick={props.handleClose}
        >キャンセル</Button>
      </DialogActions>
    </Dialog>
  );
}