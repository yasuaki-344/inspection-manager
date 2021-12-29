import React, { FC } from "react";
import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import {
  InspectionTypeList,
  InspectionTypeEdit,
  InspectionTypeCreate,
} from "./InspectionTypes";

export const InspectionTypeCategory: FC = (): JSX.Element => {
  return (
    <Admin dataProvider={simpleRestProvider("http://localhost:5000/v1")}>
      <Resource
        name="inspection-groups"
        options={{ label: '点検グループ' }}
      />
      <Resource
        name="inspection-types"
        options={{ label: '点検タイプ' }}
        list={InspectionTypeList}
        edit={InspectionTypeEdit}
        create={InspectionTypeCreate}
      />
    </Admin>
  );
};
InspectionTypeCategory.displayName = InspectionTypeCategory.name;
