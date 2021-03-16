export type InspectionItem = {
  inspection_item_id: string,
  inspection_content: string,
  input_type: number,
  choices: string[],
};

export type Equipment = {
  equipment_id: string,
  equipment_name: string,
  inspection_items: InspectionItem[],
};

export type InspectionSheet = {
  sheet_id: string,
  sheet_name: string,
  equipments: Equipment[],
};

export type InspectionSheetAction = {
  type: string;
  payload?: {
    name?: string;
    value?: string;
    equipment_id?: string;
    inspection_item_id?: string;
    choice_index?: number;
    sheet?: InspectionSheet;
  };
};

