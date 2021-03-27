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
    fetch('choicetemplate')
      .then(res => res.json())
      .then((json: ChoiceTemplate[]) => {
        setTemplates(json);
      })
      .catch(console.error);
  }, []);

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
   * Edit the specified template.
   * @param index The index template to be edited.
   */
  const handleEditTemplate = (index: number) => {
    setTarget(templates[index]);
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

  /**
   * Implement the process to submit choice templates
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch('choicetemplate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(templates)
    })
      .then((res) => {
        if (res.ok) {
          alert('登録に成功しました');
        } else {
          alert('登録に失敗しました')
        }
        return res.json();
      })
      .then((json: ChoiceTemplate[]) => {
        setTemplates(json);
      })
      .catch(console.error);
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h1>選択肢テンプレート</h1>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
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
                        <TableRow key={`template_${index}`}>
                          <TableCell>
                            <IconButton
                              size='small'
                              onClick={() => handleEditTemplate(index)}
                            >
                              <EditIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell>{template.choices.join(',')}</TableCell>
                          <TableCell align='right'>
                            <IconButton
                              size='small'
                              onClick={() => handleDeleteTemplate(index)}
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
              <Grid item xs={12}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                >テンプレート登録</Button>
              </Grid>
            </Grid>
          </form>
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
