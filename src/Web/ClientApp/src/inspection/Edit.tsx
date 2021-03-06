import React, { useEffect } from 'react';
import { Button, Grid } from '@material-ui/core';
import { InspectionSheet } from './Types';
import { InspectionSheetOperator } from './InspectionSheetOperator';
import { InspectionSheetForm } from './InspectionSheetForm';

export const Edit = ({ match }: any): JSX.Element => {
  const sheetId = match.params.id;
  const [
    inspectionSheet, setSheet, updateField,
    addEquipment, removeEquipment, updateEquipment,
    addInspectionItem, removeInspectionItem, updateInspectionItem
  ] = InspectionSheetOperator();

  useEffect(() => {
    fetch(`inspectionsheet/${sheetId}`)
      .then(res => res.json())
      .then((json: InspectionSheet) => {
        console.log(json);
        setSheet(json);
      })
      .catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheetId]);

  const handleUpdate = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    fetch(`inspectionsheet/${sheetId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inspectionSheet)
    })
      .then((res) => res.json())
      .then((json: InspectionSheet) => {
        console.log(json);
        setSheet(json);
      })
      .catch(console.error);
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <h1>編集ページ</h1>
      </Grid>
      <Grid item xs={12}>
        <InspectionSheetForm
          isEdit={true}
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
        <Button
          size='medium'
          variant='contained'
          color='primary'
          onClick={handleUpdate}
        >
          更新
        </Button>
      </Grid>
    </Grid>
  );
}
Edit.displayName = Edit.name;
