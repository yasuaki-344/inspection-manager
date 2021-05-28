import React, { FC, useState, useEffect } from 'react';
import {
  BottomNavigation, BottomNavigationAction, IconButton, Button,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Grid, Paper, TextField,

} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import { ChoiceTemplate, Option } from '../inspection/Types';

export const ChoicesTemplate: FC = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [templates, setTemplates] = useState<ChoiceTemplate[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [target, setTarget] = useState<ChoiceTemplate>({
    choice_template_id: 0,
    choices: []
  });

  useEffect(() => {
    fetch('choicetemplate')
      .then(res => res.json())
      .then((json: ChoiceTemplate[]) => setTemplates(json))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!target.choices.length) {
      setDisabled(true);
    } else {
      const index = target.choices.findIndex(x => x.description === '');
      setDisabled(index !== -1);
    }
  }, [target]);

  /**
   * Creates new template set.
   */
  const handleAddTemplate = () => {
    setTarget({
      choice_template_id: 0,
      choices: [],
    });
    setIsUpdate(false);
    setOpen(true);
  };

  /**
   * Edit the specified template.
   * @param id The template ID to be edited.
   */
  const handleUpdateTemplate = (id: number) => {
    const template = templates.find((x: ChoiceTemplate) => x.choice_template_id === id);
    if (template != null) {
      setTarget(template);
      setIsUpdate(true);
      setOpen(true);
    }
  };

  /**
   * Add new template set.
   */
  const handleRegistration = () => {
    if (isUpdate) {
      fetch(`choicetemplate/${target.choice_template_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(target)
      })
        .then((res) => {
          if (!res.ok) {
            alert('登録に失敗しました')
          }
          return res.json();
        })
        .then((json: ChoiceTemplate) => {
          setTemplates(templates.map(x => {
            if (x.choice_template_id === json.choice_template_id) {
              return json;
            } else {
              return x;
            }
          }));
        })
        .catch(console.error);
    } else {
      fetch('choicetemplate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(target)
      })
        .then((res) => {
          if (!res.ok) {
            alert('登録に失敗しました')
          }
          return res.json();
        })
        .then((json: ChoiceTemplate) => {
          setTemplates(templates.concat(json));
        })
        .catch(console.error);
    }
    setOpen(false);
  };

  /**
   * Removes the specified template.
   * @param id The template ID to be removed.
   */
  const handleDeleteTemplate = (id: number) => {
    fetch(`choicetemplate/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((json: ChoiceTemplate) => {
        setTemplates(templates.filter((x: ChoiceTemplate) =>
          x.choice_template_id !== json.choice_template_id));
      })
      .catch(console.error);
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h1>選択肢テンプレート</h1>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>選択肢</TableCell>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell>&nbsp;</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {templates.map((template: ChoiceTemplate, index: number) =>
                      <TableRow key={template.choice_template_id}>
                        <TableCell>
                          {template.choices.map(x => x.description).join(',')}
                        </TableCell>
                        <TableCell padding='checkbox'>
                          <IconButton
                            data-testid={`edit-template-button-${index}`}
                            size='small'
                            color='primary'
                            onClick={() => handleUpdateTemplate(template.choice_template_id)}
                          >
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell padding='checkbox'>
                          <IconButton
                            data-testid={`remove-template-button-${index}`}
                            size='small'
                            color='secondary'
                            onClick={() => handleDeleteTemplate(template.choice_template_id)}
                          >
                            <CancelIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <BottomNavigation showLabels>
            <BottomNavigationAction
              data-testid='add-template-button'
              label='テンプレート追加'
              icon={<AddCircleIcon />}
              onClick={handleAddTemplate}
            />
          </BottomNavigation>
        </Grid>
      </Grid >
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>選択肢テンプレート編集</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            {target.choices.map((choice: Option, index: number) =>
              <Grid item xs={12} key={choice.option_id}>
                <TextField
                  required
                  id='outlined-required'
                  label={`選択肢${index + 1}`}
                  variant='outlined'
                  size='small'
                  name='choice'
                  value={choice.description}
                  onChange={(e) => setTarget({
                    ...target,
                    'choices': target.choices.map((value: Option, i: number) => {
                      return i !== index ? value : {
                        option_id: value.option_id,
                        description: e.target.value
                      };
                    }),
                  })}
                />
                <IconButton color='primary' size='small'
                  data-testid={`remove-choice-${index}`}
                  onClick={() => setTarget({
                    ...target,
                    'choices': target.choices.filter(
                      (value: Option, i: number) => i !== index
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
                  data-testid='add-choice-button'
                  label='選択肢追加'
                  icon={<AddCircleIcon />}
                  onClick={() => setTarget({
                    ...target,
                    'choices': target.choices.concat({
                      option_id: 0,
                      description: ''
                    }),
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
            onClick={() => handleRegistration()}
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
