import React, { useState, useContext, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import { InspectionSheetForm } from './form/InspectionSheetForm';
import { InspectionSheetContext } from '../../App';
import { TopPageLink } from '../common';
import { Notification, NotificationInitState, NotificationStateInteractor } from '../common/Notification';

export const Edit = ({ match }: any): JSX.Element => {
  const sheetId = match.params.id;
  const { sheetController } = useContext(InspectionSheetContext);
  const notification = new NotificationStateInteractor(useState(NotificationInitState));

  useEffect(() => {
    sheetController.getInspectionSheetById(sheetId)
      .catch((error) => {
        console.error(error);
        notification.setMessageState('error', `データの取得に失敗しました (ID:${sheetId})`);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheetId]);

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    sheetController.updateInspectionSheet()
      .then(() => {
        notification.setMessageState('success', '更新に成功しました');
      })
      .catch(error => {
        console.error(error)
        notification.setMessageState('error', '更新に失敗しました');
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
      <Grid item xs={12}>
        <Notification
          open={notification.state.isOpen}
          severity={notification.state.severity}
          message={notification.state.message}
          onClose={() => { notification.hideDisplay() }}
        />
      </Grid>
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
