export type InspectionSheetAction = {
  type: string;
  payload?: {
    name: string;
    value: string;
  };
};

export type InspectionSheet = {
  sheet_id: string,
  sheet_name: string,
}
