import React, { useState, useContext, useEffect } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import { InspectionSheet } from './Types';
import { InspectionSheetForm } from './form/InspectionSheetForm';
import { InspectionSheetContext } from './context/InspectionSheetContext';

export const Edit = ({ match }: any): JSX.Element => {
  const sheetId = match.params.id;
  const context = useContext(InspectionSheetContext);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch(`inspectionsheet/${sheetId}`)
      .then(res => res.json())
      .then((json: InspectionSheet) => {
        console.log(json);
        context.setSheet(json);
      })
      .catch((error) => {
        setSuccessMessage('');
        setErrorMessage(`データの取得に失敗しました (ID:${sheetId})`);
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheetId]);

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    fetch(`inspectionsheet/${sheetId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(context.inspectionSheet)
    })
      .then((res) => {
        if (res.ok) {
          setSuccessMessage('更新に成功しました');
          setErrorMessage('');
        } else {
          setSuccessMessage('');
          setErrorMessage('更新に失敗しました');
        }
        return res.json();
      })
      .then((json: InspectionSheet) => {
        console.log(json);
        context.setSheet(json);
      })
      .catch(console.error);
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <h1>編集ページ</h1>
      </Grid>
      <Grid item xs={12}>
        <Link to="/">トップページへ戻る</Link>
      </Grid>
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
