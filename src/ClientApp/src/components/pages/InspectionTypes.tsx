import React from "react";
import {
  Datagrid,
  TextField,
  List,
  Edit,
  SimpleForm,
  EditButton,
  TextInput,
  Create,
  DeleteButton,
} from "react-admin";

export const InspectionTypeList = (props: any) => (
  // eslint-disable-next-line
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="点検タイプID" />
      <TextField source="description" label="点検タイプ" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const InspectionTypeEdit = (props: any) => (
  // eslint-disable-next-line
  <Edit {...props}>
    <SimpleForm>
      <TextField source="id" label="点検タイプID" />
      <TextInput source="description" label="点検タイプ" />
    </SimpleForm>
  </Edit>
);

export const InspectionTypeCreate = (props: any) => (
  // eslint-disable-next-line
  <Create {...props}>
    <SimpleForm>
      <TextInput disabled label="点検タイプID" source="id" defaultValue="0" />
      <TextInput
        source="description"
        label="点検タイプ"
        defaultValue="タイプ"
      />
    </SimpleForm>
  </Create>
);
