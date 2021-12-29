import React from "react";
import { Datagrid, TextField, List, Edit, SimpleForm, EditButton, TextInput } from "react-admin";

export const InspectionTypeList = (props: any) => (
  // eslint-disable-next-line
  <List {...props}>
    <Datagrid>
      <TextField source="inspectionTypeId" label="点検タイプID" />
      <TextField source="description" label="点検タイプ" />
      <EditButton/>
    </Datagrid>
  </List>
);

export const InspectionTypeEdit = (props: any) => (
  // eslint-disable-next-line
  <Edit {...props}>
    <SimpleForm>
      <TextField source="inspectionTypeId" label="点検タイプID" />
      <TextInput source="description" label="点検タイプ" />
    </SimpleForm>
  </Edit>
);
