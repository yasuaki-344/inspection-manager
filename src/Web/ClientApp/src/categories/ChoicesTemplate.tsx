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
  const [disabled, setDisabled] = useState(false);
  const [target, setTarget] = useState<ChoiceTemplate>({
    choice_template_id: 0,
    choices: []
  });
  const [templates, setTemplates] = useState<ChoiceTemplate[]>([]);

  useEffect(() => {
    fetch('choicetemplate')
      .then(res => res.json())
      .then((json: ChoiceTemplate[]) => {
        setTemplates(json);
      })
      .catch(console.error);
  }, []);

  // useEffect(() => {
  //   if (!target.choices.length) {
  //     setDisabled(true);
  //   } else {
  //     setDisabled(target.choices.includes(''));
  //   }
  // }, [target]);

  /**
   * Add new template set.
   */
  const handleAddTemplate = () => {
    // if (templates.some((x: ChoiceTemplate) => x.choice_template_id === target.choice_template_id)) {
    //   setTemplates(templates.map((e: ChoiceTemplate) => {
    //     if (e.choice_template_id === target.choice_template_id) {
    //       return target;
    //     } else {
    //       return e;
    //     }
    //   }));
    // } else {
    //   setTemplates(templates.concat(target));
    // }
    // setOpen(false);
  };

  /**
   * Creates new template set.
   */
  const handleCreateTemplate = () => {
    setTarget({
      choice_template_id: 0,
      choices: [],
    });
    setOpen(true);
  };

  /**
   * Edit the specified template.
   * @param id The template ID to be edited.
   */
  const handleEditTemplate = (id: number) => {
    // const template = templates.find((x: ChoiceTemplate) => x.choice_template_id === id);
    // if (template != null) {
    //   setTarget(template);
    //   setOpen(true);
    // }
  };

  /**
   * Removes the specified template.
   * @param id The template ID to be removed.
   */
  const handleDeleteTemplate = (id: number) => {
    // setTemplates(
    //   templates.filter((x: ChoiceTemplate) => x.choice_template_id !== id)
    // )
  };

  /**
   * Implement the process to submit choice templates
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    // fetch('choicetemplate', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(templates)
    // })
    //   .then((res) => {
    //     if (res.ok) {
    //       alert('登録に成功しました');
    //     } else {
    //       alert('登録に失敗しました')
    //     }
    //     return res.json();
    //   })
    //   .then((json: ChoiceTemplate[]) => {
    //     setTemplates(json);
    //   })
    //   .catch(console.error);
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h1>選択肢テンプレート</h1>
        </Grid>
        <Grid item xs={12}>
          <form data-testid='form' onSubmit={handleSubmit}>
            <Grid container spacing={1}>
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
                        <TableRow key={template.choice_template_id}>
                          <TableCell>
                            <IconButton
                              data-testid={`edit-template-button-${index}`}
                              size='small'
                              onClick={() => handleEditTemplate(template.choice_template_id)}
                            >
                              <EditIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            {template.choices.map(x => x.description).join(',')}
                          </TableCell>
                          <TableCell align='right'>
                            <IconButton
                              data-testid={`remove-template-button-${index}`}
                              size='small'
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
          </form>
        </Grid>
        <Grid item xs={12}>
          <BottomNavigation showLabels>
            <BottomNavigationAction
              data-testid='add-template-button'
              label='テンプレート追加'
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
                  // onChange={(e) => setTarget({
                  //   ...target,
                  //   'choices': target.choices.map((value: string, i: number) => {
                  //     return i !== index ? value : e.target.value;
                  //   }),
                  // })}
                />
                <IconButton color='primary' size='small'
                  data-testid={`remove-choice-${index}`}
                  // onClick={() => setTarget({
                  //   ...target,
                  //   'choices': target.choices.filter(
                  //     (value: string, i: number) => i !== index
                  //   ),
                  // })}
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
