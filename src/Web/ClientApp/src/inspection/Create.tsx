import React, { useState } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import { InspectionSheetOperator } from './InspectionSheetOperator';
import { InspectionSheetForm } from './InspectionSheetForm';

export const Create = (): JSX.Element => {
  const [
    inspectionSheet, , updateField,
    addEquipment, removeEquipment, updateEquipment,
    addInspectionItem, removeInspectionItem, updateInspectionItem,
  ] = InspectionSheetOperator();

  const [open, setOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.debug(inspectionSheet);
    fetch('inspectionsheet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inspectionSheet)
    })
      .then((res) => {
        if (res.ok) {
          alert('登録に成功しました');
        } else {
          alert('登録に失敗しました')
        }
        return res.json();
      })
      .then(console.log)
      .catch(console.error);
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h1>新規作成ページ</h1>
        </Grid>
        <Grid item xs={12}>
          <Link to='/'>トップページへ戻る</Link>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant='contained'
            onClick={() => setOpen(true)}
          >既存のデータをコピー</Button>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <InspectionSheetForm
                  isEdit={false}
                  sheet={inspectionSheet}
                  updateField={updateField}
                  addEquipment={addEquipment}
                  removeEquipment={removeEquipment}
                  updateEquipment={updateEquipment}
                  addInspectionItem={addInspectionItem}
                  removeInspectionItem={removeInspectionItem}
                  updateInspectionItem={updateInspectionItem}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type='submit' variant='contained' color='primary'>新規作成</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>コピーする点検シートを選択</DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='primary'
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
Create.displayName = Create.name;
