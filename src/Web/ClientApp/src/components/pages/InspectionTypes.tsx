import React from "react";
import { Datagrid, TextField, List } from "react-admin";

export const InspectionTypeList = (props: any) => (
  // eslint-disable-next-line
  <List {...props}>
    <Datagrid>
      <TextField source="inspectionTypeId" label="点検タイプID" />
      <TextField source="description" label="点検タイプ" />
    </Datagrid>
  </List>
);
