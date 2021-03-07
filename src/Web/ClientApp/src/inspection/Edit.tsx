import React, { useEffect, useState } from 'react';

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

  const handleUpdate = () => {
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
      <button onClick={handleUpdate}>更新</button>
    </div>
  );
}
Edit.displayName = Edit.name;
