import React, { useState, useContext, useEffect } from 'react';
import { Alert } from '@mui/material';
import { Button, Grid } from '@mui/material';
import { InspectionSheetForm } from './form/InspectionSheetForm';
import { InspectionSheetContext } from '../../App';
import { TopPageLink } from '../common';

export const Edit = ({ match }: any): JSX.Element => {
  const sheetId = match.params.id;
  const { sheetController } = useContext(InspectionSheetContext);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    sheetController.getInspectionSheetById(sheetId)
      .catch((error) => {
        setSuccessMessage('');
        setErrorMessage(`データの取得に失敗しました (ID:${sheetId})`);
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheetId]);

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    sheetController.updateInspectionSheet()
      .then(() => {
        setSuccessMessage('更新に成功しました');
        setErrorMessage('');
      })
      .catch(error => {
        console.error(error)
        setSuccessMessage('');
        setErrorMessage('更新に失敗しました');
      });
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <h1>編集ページ</h1>
      </Grid>
      <Grid item xs={12}>
        <TopPageLink />
      </Grid>
      {errorMessage !== '' &&
        <Grid item xs={12}>
          <Alert elevation={6} variant="filled" severity="error">
            {errorMessage}
          </Alert>
        </Grid>
      }
      {successMessage !== '' &&
        <Grid item xs={12}>
          <Alert elevation={6} variant="filled" severity="success">
            {successMessage}
          </Alert>
        </Grid>
      }
      <Grid item xs={12}>
        <form data-testid='form' onSubmit={handleUpdate}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <InspectionSheetForm isEdit={true} />
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
              >
                更新
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
Edit.displayName = Edit.name;
