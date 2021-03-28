import React, { useContext, useState, useEffect } from 'react';
import {
  Button, BottomNavigation, BottomNavigationAction,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Radio, RadioGroup, FormControl, FormControlLabel,
  IconButton, Grid, TextField, MenuItem,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import { useInputTypes } from './Types';
import { InspectionItemContext } from './InspectionItemContext';
import { isValidInspectionItem } from './InspectionItemOperator';

interface InspectionDialogProps {
  open: boolean,
  handleClose: () => void,
  handleInspectionItem: () => void,
};

export const InspectionItemDialog = (props: InspectionDialogProps): JSX.Element => {
  const context = useContext(InspectionItemContext);
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [templates, setTemplates] = useState<any>([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    fetch('choicetemplate')
      .then(res => res.json())
      .then((json: any) => {
        setTemplates(json);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    setDisabled(!isValidInspectionItem(context.inspectionItem));
  }, [context.inspectionItem]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number((event.target as HTMLInputElement).value));
  };

  const handleUseTemplate = () => {
    context.setChoices(templates[value].choices);
    setOpen(false);
  };

  return (
    <>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>点検項目編集</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                autoFocus
                id='outlined-required'
                label='点検項目'
                variant='outlined'
                size='small'
                name='inspection_content'
                value={context.inspectionItem.inspection_content}
                onChange={(e) => context.updateField(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                select
                id='outlined-required'
                label='点検タイプ'
                variant='outlined'
                size='small'
                name='input_type'
                value={context.inspectionItem.input_type}
                onChange={(e) => { context.updateField(e); }}
              >
                {useInputTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem >
                ))}
              </TextField>
            </Grid>
            {(context.inspectionItem.input_type !== 2) ? <></> :
              <>
                {context.inspectionItem.choices.map((choice: string, index: number) =>
                  <Grid item xs={12} key={`${context.inspectionItem.inspection_item_id}_${index}`}>
                    <TextField
                      required
                      id='outlined-required'
                      label={`選択肢${index + 1}`}
                      variant='outlined'
                      size='small'
                      name='choice'
                      value={choice}
                      onChange={(e) => context.updateChoice(e, index)}
                    />
                    <IconButton color='primary' size='small'
                      onClick={() => context.removeChoice(index)}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <BottomNavigation showLabels>
                    <BottomNavigationAction
                      label='選択肢追加'
                      icon={<AddCircleIcon />}
                      onClick={context.addChoice}
                    />
                    <BottomNavigationAction
                      label='テンプレート選択'
                      icon={<FormatListNumberedIcon />}
                      onClick={() => setOpen(true)}
                    />
                  </BottomNavigation>
                </Grid>
              </>
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='primary'
            disabled={disabled}
            onClick={props.handleInspectionItem}
          >OK</Button>
          <Button
            variant='contained'
            onClick={props.handleClose}
          >キャンセル</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={() => setOpen(false)}>
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
            onClick={() => handleUseTemplate()}
          >OK</Button>
          <Button
            variant='contained'
            onClick={() => setOpen(false)}
          >キャンセル</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}