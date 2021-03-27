export const useInputTypes = [
  { value: 1, label: "整数入力" },
  { value: 2, label: "テキスト入力" },
  { value: 3, label: "項目選択" },
];

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
  inspection_type: string,
  inspection_group: string,
  equipments: Equipment[],
};

export type InspectionSheetSummary = {
  sheet_id: string,
  sheet_name: string,
  inspection_type: string,
  inspection_group: string,
};

export type InspectionItemAction = {
  type: string;
  payload?: {
    name?: string;
    value?: string;
    choice_index?: number;
    choices?: string[];
    item?: InspectionItem;
  };
};

export type InspectionSheetAction = {
  type: string;
  payload?: {
    name?: string;
    value?: string;
    equipment_id?: string;
    inspection_item_id?: string;
    sheet?: InspectionSheet;
    inspection_item?: InspectionItem;
  };
};

