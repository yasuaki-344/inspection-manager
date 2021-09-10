import { ChoiceTemplate } from "../../typescript-fetch";
import { InspectionItem, InspectionSheet } from "../../entities";

export const ItemType = {
  EQUIPMENT: 'EQUIPMENT',
  INSPECTION_ITEM: 'INSPECTION_ITEM',
};

// export const useInputTypes = [
//   { value: 0, label: "テキスト入力" },
//   { value: 1, label: "数値入力" },
//   { value: 2, label: "項目選択" },
//   { value: 5, label: "日付入力" },
// ];
export const useInputTypes = [
  { value: 1, label: "テキスト入力" },
  { value: 2, label: "数値入力" },
  { value: 3, label: "項目選択" },
  { value: 6, label: "日付入力" },
];

export type InspectionItemAction = {
  type: string;
  payload?: {
    name?: string;
    value?: string;
    choice_index?: number;
    choices?: ChoiceTemplate;
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
  setChoices: (choices: ChoiceTemplate) => void;
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
  updateInspectionItem: (equipmentIndex: number, itemIndex: number, item: InspectionItem) => void;
  swapInspectionItem: (equipmentId: number, srdIndex: number, dstIndex: number) => void;
};
