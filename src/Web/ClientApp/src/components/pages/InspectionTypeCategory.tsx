import React, { FC } from "react";
import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import {
  InspectionTypeCreate,
  InspectionTypeEdit,
  InspectionTypeList,
} from "./InspectionTypes";
import {
  InspectionGroupCreate,
  InspectionGroupEdit,
  InspectionGroupList,
} from "./InspectionGroups";

export const InspectionTypeCategory: FC = (): JSX.Element => {
  return (
    <Admin dataProvider={simpleRestProvider("http://localhost:5000/v1")}>
      <Resource
        name="inspection-groups"
        options={{ label: '点検グループ' }}
        create={InspectionGroupCreate}
        edit={InspectionGroupEdit}
        list={InspectionGroupList}
      />
      <Resource
        name="inspection-types"
        options={{ label: '点検タイプ' }}
        create={InspectionTypeCreate}
        edit={InspectionTypeEdit}
        list={InspectionTypeList}
      />
    </Admin>
  );
};
InspectionTypeCategory.displayName = InspectionTypeCategory.name;
