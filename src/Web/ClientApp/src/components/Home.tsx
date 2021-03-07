import React, { useEffect, useState } from 'react';

export const Home = (): JSX.Element => {
  const [inspectionSheets, setInspectionSheets] = useState([]);

  useEffect(() => {
    console.log("called");
    fetch('inspectionsheet')
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setInspectionSheets(json);
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>点検シート一覧</h1>
      <table>
        <thead>
          <tr>
            <th>シート名</th>
          </tr>
        </thead>
        <tbody>
          {inspectionSheets.map((sheet: any) =>
            <tr key={sheet.sheet_id}>
              <td>{sheet.sheet_name}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
Home.displayName = Home.name;
