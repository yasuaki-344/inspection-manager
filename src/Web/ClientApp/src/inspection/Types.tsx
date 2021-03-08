export type InspectionSheetAction = {
  type: string;
  payload?: {
    name: string;
    value: string;
  };
};

export type Equipment = {
  equipment_id: string,
  equipment_name: string,
};

export type InspectionSheet = {
  sheet_id: string,
  sheet_name: string,
  equipments: Equipment[],
};
