import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { InspectionSheet } from '../inspection/Types';

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

  const handleDelete = (id: string) => {
    console.log(`delete ${id}`);
    fetch(`inspectionsheet/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((json: InspectionSheet) => {
        console.log(json);
        setInspectionSheets(
          inspectionSheets.filter((x: InspectionSheet) =>
          x.sheet_id !== json.sheet_id)
        );
      })
      .catch(console.error);
  }

  return (
    <div>
      <h1>点検シート一覧</h1>
      <Link to="/create">新規作成</Link>
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
                <Link to={"/edit/" + sheet.sheet_id}>編集</Link>|
                <Link to={"/details/" + sheet.sheet_id}>詳細</Link>|
                <button onClick={() => handleDelete(sheet.sheet_id)}>削除</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
Home.displayName = Home.name;
