import React from 'react';
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
    <Grid container>
      <Grid item xs={12}>
        <h1>新規作成ページ</h1>
      </Grid>
      <Grid item xs={12}>
        <Link to="/">トップページへ戻る</Link>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
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
            <Button type="submit" size='medium' variant='contained' color='primary'>新規作成</Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
Create.displayName = Create.name;
