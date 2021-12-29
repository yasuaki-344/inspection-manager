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
