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

export const InspectionGroupList = (props: any) => (
  // eslint-disable-next-line
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="点検グループID" />
      <TextField source="description" label="点検グループ" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const InspectionGroupEdit = (props: any) => (
  // eslint-disable-next-line
  <Edit {...props}>
    <SimpleForm>
      <TextField source="id" label="点検グループID" />
      <TextInput source="description" label="点検グループ" />
    </SimpleForm>
  </Edit>
);

export const InspectionGroupCreate = (props: any) => (
  // eslint-disable-next-line
  <Create {...props}>
    <SimpleForm>
      <TextInput disabled label="点検グループID" source="id" defaultValue="0" />
      <TextInput
        source="description"
        label="点検グループ"
        defaultValue="グループ"
      />
    </SimpleForm>
  </Create>
);
