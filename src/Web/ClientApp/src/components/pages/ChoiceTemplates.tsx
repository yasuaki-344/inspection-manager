import React from "react";
import {
  ArrayField,
  Datagrid,
  TextField,
  List,
  EditButton,
  DeleteButton,
  SingleFieldList,
  ChipField,
  Edit,
  SimpleForm,
  ArrayInput,
  SimpleFormIterator,
  TextInput,
  Create,
} from "react-admin";

export const ChoiceTemplateList = (props: any) => (
  // eslint-disable-next-line
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="テンプレートID" />
      <ArrayField source="choices" label="選択肢">
        <SingleFieldList>
          <ChipField source="description" />
        </SingleFieldList>
      </ArrayField>
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const ChoiceTemplateEdit = (props: any) => (
  // eslint-disable-next-line
  <Edit {...props}>
    <SimpleForm>
      <TextField source="id" label="テンプレートID" />
      <ArrayInput source="choices" label="選択肢">
        <SimpleFormIterator>
          <TextInput
            disabled
            source="option_id"
            label="項目ID"
            defaultValue="0"
          />
          <TextInput source="description" label="項目" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);

export const ChoiceTemplateCreate = (props: any) => (
  // eslint-disable-next-line
  <Create {...props}>
    <SimpleForm>
      <TextInput disabled label="テンプレートID" source="id" defaultValue="0" />
      <ArrayInput source="choices" label="選択肢">
        <SimpleFormIterator>
          <TextInput
            disabled
            source="option_id"
            label="項目ID"
            defaultValue="0"
          />
          <TextInput source="description" label="項目" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);
