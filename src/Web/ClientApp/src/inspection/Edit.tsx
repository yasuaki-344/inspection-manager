import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';

export const Edit = ({ match }: any): JSX.Element => {
  const sheetId = match.params.id;
  const [inspectionSheet, setInspectionSheet] = useState({
    sheet_id: '',
    sheet_name: '',
  });

  useEffect(() => {
    fetch(`inspectionsheet/${sheetId}`)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setInspectionSheet(json);
      })
      .catch(console.error);
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
      .then(json => {
        setInspectionSheet(json);
      })
      .catch(console.error);
  }

  return (
    <div>
      <h1>編集ページ</h1>
      <h3>id:{inspectionSheet.sheet_id}</h3>
      <h3>name:{inspectionSheet.sheet_name}</h3>
      <Button
        size='medium'
        variant='contained'
        color='primary'
        onClick={handleUpdate}
      >
        更新
      </Button>
    </div>
  );
}
Edit.displayName = Edit.name;
