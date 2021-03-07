import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {inspectionSheets.map((sheet: any) =>
            <tr key={sheet.sheet_id}>
              <td>{sheet.sheet_name}</td>
              <td>
                <Link to={"/details/" + sheet.sheet_id}>詳細</Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
Home.displayName = Home.name;
