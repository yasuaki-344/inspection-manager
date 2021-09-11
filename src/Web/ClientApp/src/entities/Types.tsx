import { ChoiceTemplate } from "../typescript-fetch";
import { InspectionItem, InspectionSheet } from ".";

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
