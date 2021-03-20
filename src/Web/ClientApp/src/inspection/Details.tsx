import React, { useEffect, useState } from 'react';
import { EquipmentForm } from './EquipmentForm';
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
      <h3>id:{inspectionSheet.sheet_id}</h3>
      <h3>name:{inspectionSheet.sheet_name}</h3>
      {inspectionSheet.equipments.map((equipment: Equipment) =>
        <div key={equipment.equipment_id}>
          <h3>id:{equipment.equipment_id}</h3>
          <h3>name:{equipment.equipment_name}</h3>
          {equipment.inspection_items.map((item: InspectionItem) =>
            <div key={item.inspection_item_id}>
              <h3>id:{item.inspection_item_id}</h3>
              <h3>name:{item.inspection_content}</h3>
              <h3>type:{item.input_type}</h3>
              {item.choices.map((choice: string, index: number) =>
                <h3 key={`${item.inspection_item_id}_${index}`}>
                  {choice}
                </h3>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
Details.displayName = Details.name;
