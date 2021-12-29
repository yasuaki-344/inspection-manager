import React from "react";
import {
  Datagrid,
  TextField,
  List,
  Edit,
  SimpleForm,
  EditButton,
  TextInput,
  ReferenceInput,
  SelectInput,
  Create,
} from "react-admin";

export const InspectionTypeList = (props: any) => (
  // eslint-disable-next-line
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="点検タイプID" />
      <TextField source="description" label="点検タイプ" />
      <EditButton />
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
      <ReferenceInput label="User" source="userId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="description" name="点検タイプ" />
    </SimpleForm>
  </Create>
);
