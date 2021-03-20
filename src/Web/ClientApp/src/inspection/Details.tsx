import React, { useEffect, useState } from 'react';
import {
  Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';

import { InspectionSheet, Equipment, InspectionItem } from './Types';

export const Details = ({ match }: any): JSX.Element => {
  const sheetId = match.params.id;
  const [inspectionSheet, setInspectionSheet] = useState<InspectionSheet>({
    sheet_id: '',
    sheet_name: '',
    equipments: [],
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
      <h3>点検シートID:{inspectionSheet.sheet_id}</h3>
      <h3>シート名:{inspectionSheet.sheet_name}</h3>
      {inspectionSheet.equipments.map((equipment: Equipment) =>
        <div key={equipment.equipment_id}>
          <h3>点検機器ID:{equipment.equipment_id}</h3>
          <h3>点検機器名:{equipment.equipment_name}</h3>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableCell>ID</TableCell>
                <TableCell>点検項目</TableCell>
                <TableCell>点検タイプ</TableCell>
                <TableCell>選択肢</TableCell>
              </TableHead>
              <TableBody>
                {equipment.inspection_items.map((item: InspectionItem) =>
                  <TableRow key={item.inspection_item_id}>
                    <TableCell>{item.inspection_item_id}</TableCell>
                    <TableCell>{item.inspection_content}</TableCell>
                    <TableCell>{item.input_type}</TableCell>
                    <TableCell>{item.choices.join(',')}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}
Details.displayName = Details.name;
