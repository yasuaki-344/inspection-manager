import React, { FC, useState, useEffect } from 'react';
import {
  BottomNavigation, TableContainer, Grid, Paper,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { ChoiceTemplate } from '../../typescript-fetch';
import { BottomNavigationAdd } from '../common';
import { ChoiceTemplateInteractor } from '../../use-cases';
import { ChoiceTemplateRepository } from '../../infrastructure';
import { ChoiceTemplatePresenter } from '../../presenters';
import { ChoiceTemplateController } from '../../controllers';
import { ChoiceTemplateEditDialog } from './ChoiceTemplateEditDialog';

const generate = (hook: [Array<ChoiceTemplate>, React.Dispatch<React.SetStateAction<Array<ChoiceTemplate>>>]) => {
  const [types, setTypes] = hook;
  const useCase = new ChoiceTemplateInteractor(types, setTypes, new ChoiceTemplateRepository());
  const controller = new ChoiceTemplateController(useCase);
  const presenter = new ChoiceTemplatePresenter(useCase);
  return { controller, presenter }
}

export const ChoicesTemplate: FC = (): JSX.Element => {
  const { controller, presenter } = generate(useState<Array<ChoiceTemplate>>([]));
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [target, setTarget] = useState<ChoiceTemplate>({
    choice_template_id: 0,
    choices: []
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // eslint-disable-next-line
  useEffect(() => { presenter.get() }, []);

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
    const template = presenter.getById(id);
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
      controller.update(target)
        .then(() => {
          setSuccessMessage('更新に成功しました');
          setErrorMessage('');
        })
        .catch(error => {
          console.error(error);
          setSuccessMessage('');
          setErrorMessage('更新に失敗しました');
        })
    } else {
      controller.create(target)
        .then(() => {
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
    controller.delete(id)
      .then(() => {
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
              {presenter.choiceTemplateTable(
                handleUpdateTemplate,
                handleDeleteTemplate
              )}
            </TableContainer>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <BottomNavigation showLabels>
            <BottomNavigationAdd
              label='テンプレート追加'
              onClick={handleAddTemplate}
            />
          </BottomNavigation>
        </Grid>
      </Grid >
      <ChoiceTemplateEditDialog
        open={open}
        target={target}
        setTarget={setTarget}
        onOkButtonClick={() => handleRegistration()}
        onCancelButtonClick={() => setOpen(false)}
      />
    </>
  );
}
ChoicesTemplate.displayName = ChoicesTemplate.name;
