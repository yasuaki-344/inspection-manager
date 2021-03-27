import React, { useState, useEffect } from "react";
import {
  BottomNavigation, BottomNavigationAction, IconButton, Button,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Grid, Paper, TextField,

} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';

type ChoiceTemplate = {
  choices: string[],
};

const InitialChoiceTemplate = {
  choices: []
};

export const ChoicesTemplate = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [target, setTarget] = useState<ChoiceTemplate>(InitialChoiceTemplate);
  const [templates, setTemplates] = useState<ChoiceTemplate[]>([]);

  useEffect(() => {
    if (!target.choices.length) {
      setDisabled(true);
    } else {
      setDisabled(target.choices.includes(''));
    }
  }, [target]);

  /**
   * Add new template set.
   */
  const handleAddTemplate = () => {
    setTemplates(templates.concat(target));
    setOpen(false);
  };

  /**
   * Creates new template set.
   */
  const handleCreateTemplate = () => {
    setTarget(InitialChoiceTemplate);
    setOpen(true);
  };

  /**
   * Removes the specified template.
   * @param index The index template to be removed.
   */
  const handleDeleteTemplate = (index: number) => {
    setTemplates(
      templates.filter((value: ChoiceTemplate, i: number) => i !== index)
    )
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <h1>選択肢テンプレート</h1>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>選択肢</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {templates.map((template: ChoiceTemplate, index: number) =>
                  <TableRow key={`template_${index}`}>
                    <TableCell>
                      <IconButton size='small'>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>{template.choices.join(',')}</TableCell>
                    <TableCell align='right'>
                      <IconButton
                        size='small'
                        onClick={() => handleDeleteTemplate(index)}>
                        <CancelIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <BottomNavigation showLabels>
            <BottomNavigationAction
              label="テンプレート追加"
              icon={<AddCircleIcon />}
              onClick={handleCreateTemplate}
            />
          </BottomNavigation>
        </Grid>
      </Grid >
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>選択肢テンプレート編集</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            {target.choices.map((choice: string, index: number) =>
              <Grid item xs={12} key={`choice_${index}`}>
                <TextField
                  required
                  id='outlined-required'
                  label={`選択肢${index + 1}`}
                  variant='outlined'
                  size='small'
                  name='choice'
                  value={choice}
                  onChange={(e) => setTarget({
                    ...target,
                    'choices': target.choices.map((value: string, i: number) => {
                      return i !== index ? value : e.target.value;
                    }),
                  })}
                />
                <IconButton color='primary' size='small'
                  onClick={() => setTarget({
                    ...target,
                    'choices': target.choices.filter(
                      (value: string, i: number) => i !== index
                    ),
                  })}
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
                  onClick={() => setTarget({
                    ...target,
                    'choices': target.choices.concat(''),
                  })}
                />
              </BottomNavigation>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='primary'
            disabled={disabled}
            onClick={() => handleAddTemplate()}
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
ChoicesTemplate.displayName = ChoicesTemplate.name;
