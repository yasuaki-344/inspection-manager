import React, { FC, useState, useEffect } from 'react';
import {
  BottomNavigation, BottomNavigationAction, Button,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Grid, Paper, TextField,

} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { ChoiceTemplatesApi, ChoiceTemplate, Option } from '../../typescript-fetch';
import { CancelIconButton, EditIconButton } from '../common';

const api = new ChoiceTemplatesApi();

export const ChoicesTemplate: FC = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [templates, setTemplates] = useState<ChoiceTemplate[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [target, setTarget] = useState<ChoiceTemplate>({
    choice_template_id: 0,
    choices: []
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    api.choiceTemplatesGet()
      .then(res => { setTemplates(res); })
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
      api.choiceTemplatesChoiceTemplateIdPut({
        'choiceTemplateId': target.choice_template_id,
        'choiceTemplate': target
      })
        .then(res => {
          setTemplates(templates.map(x => {
            if (x.choice_template_id === res.choice_template_id) {
              return res;
            } else {
              return x;
            }
          }));
          setSuccessMessage('更新に成功しました');
          setErrorMessage('');
        })
        .catch(error => {
          console.error(error);
          setSuccessMessage('');
          setErrorMessage('更新に失敗しました');
        })
    } else {
      api.choiceTemplatesPost({
        choiceTemplate: target
      })
        .then(res => {
          setTemplates(templates.concat(res));
          setSuccessMessage('追加に成功しました');
          setErrorMessage('');
        })
        .catch(error => {
          console.error(error);
          setSuccessMessage('');
          setErrorMessage('追加に失敗しました');
        });
    }
    setOpen(false);
  };

  /**
   * Removes the specified template.
   * @param id The template ID to be removed.
   */
  const handleDeleteTemplate = (id: number) => {
    api.choiceTemplatesChoiceTemplateIdDelete({
      'choiceTemplateId': id
    })
      .then(() => {
        setTemplates(templates.filter((x: ChoiceTemplate) =>
          x.choice_template_id !== id));
        setSuccessMessage('削除に成功しました');
        setErrorMessage('');
      })
      .catch(error => {
        console.error(error);
        setSuccessMessage('');
        setErrorMessage('削除に失敗しました');
      });
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h1>選択肢テンプレート</h1>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {errorMessage !== '' &&
              <Grid item xs={12}>
                <MuiAlert elevation={6} variant="filled" severity="error">
                  {errorMessage}
                </MuiAlert>
              </Grid>
            }
            {successMessage !== '' &&
              <Grid item xs={12}>
                <MuiAlert elevation={6} variant="filled" severity="success">
                  {successMessage}
                </MuiAlert>
              </Grid>
            }
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
                          <EditIconButton
                            onClick={() => handleUpdateTemplate(template.choice_template_id)}
                          />
                        </TableCell>
                        <TableCell padding='checkbox'>
                          <CancelIconButton
                            onClick={() => handleDeleteTemplate(template.choice_template_id)}
                          />
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
              <Grid item xs={12} key={index}>
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
                <CancelIconButton
                  onClick={() => setTarget({
                    ...target,
                    'choices': target.choices.filter(
                      (value: Option, i: number) => i !== index
                    ),
                  })}
                />
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
