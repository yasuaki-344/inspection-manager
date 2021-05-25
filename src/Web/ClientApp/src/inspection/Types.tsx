export const ItemType = {
  EQUIPMENT: 'EQUIPMENT',
  INSPECTION_ITEM: 'INSPECTION_ITEM',
};

export const useInputTypes = [
  { value: 0, label: "テキスト入力" },
  { value: 1, label: "数値入力" },
  { value: 2, label: "項目選択" },
  { value: 5, label: "日付入力" },
];

export type Option = {
  option_id: number,
  description: string,
};

export type ChoiceTemplate = {
  choice_template_id: number,
  choices: Option[],
};

export type InspectionGroup = {
  inspection_group_id: number,
  description: string,
};

export type InspectionType = {
  inspection_type_id: number,
  description: string,
};

export type InspectionItem = {
  inspection_item_id: number,
  inspection_content: string,
  input_type: number,
  choices: string[],
};

export type Equipment = {
  equipment_id: number,
  equipment_name: string,
  inspection_items: InspectionItem[],
};

export type InspectionSheet = {
  sheet_id: number,
  sheet_name: string,
  inspection_type_id: number,
  inspection_group_id: number,
  inspection_type: string,
  inspection_group: string,
  equipments: Equipment[],
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
    equipment_index?: number;
    inspection_item_index?: number;
    swap_index?: number;
    sheet?: InspectionSheet;
    inspection_item?: InspectionItem;
  };
};

export interface InspectionItemContextType {
  inspectionItem: InspectionItem;
  setItem: (item: InspectionItem) => void;
  updateField: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setChoices: (choices: string[]) => void;
  addChoice: () => void;
  removeChoice: (index: number) => void;
  updateChoice: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void;
};

export interface InspectionSheetContextType {
  inspectionSheet: InspectionSheet;
  setSheet: (sheet: InspectionSheet) => void;
  updateField: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  addEquipment: () => void;
  removeEquipment: (index: number) => void;
  updateEquipment: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void;
  swapEquipment: (srdIndex: number, dstIndex: number) => void,
  addInspectionItem: (index: number, item: InspectionItem) => void;
  removeInspectionItem: (equipmentIndex: number, itemIndex: number) => void;
  updateInspectionItem: (id: number, item: InspectionItem) => void;
  swapInspectionItem: (equipmentId: number, srdId: number, dstId: number) => void;
};
