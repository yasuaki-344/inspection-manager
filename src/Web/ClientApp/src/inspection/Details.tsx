import React, { useEffect, useState } from 'react';

export const Details = ({ match }: any): JSX.Element => {
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

  return (
    <div>
      <h1>詳細ページ</h1>
      <h3>id:{inspectionSheet.sheet_id}</h3>
      <h3>name:{inspectionSheet.sheet_name}</h3>
    </div>
  );
}
Details.displayName = Details.name;
