import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
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
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>点検シート名</TableCell>
              <TableCell>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inspectionSheets.map((sheet: any) =>
              <TableRow key={sheet.sheet_id}>
                <TableCell>
                  {sheet.sheet_name}
                </TableCell>
                <TableCell>
                  <Link to={"/edit/" + sheet.sheet_id}>編集</Link>|
                <Link to={"/details/" + sheet.sheet_id}>詳細</Link>|
                <Button
                    size='small'
                    variant='contained'
                    color='secondary'
                    onClick={() => handleDelete(sheet.sheet_id)}
                  >
                    削除
                </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
Home.displayName = Home.name;
