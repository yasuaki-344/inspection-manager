import React, { FC } from "react";
import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import polyglotI18nProvider from "ra-i18n-polyglot";
import japaneseMessages from "@bicstone/ra-language-japanese";
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
import {
  ChoiceTemplateList
} from "./ChoiceTemplates";

export const InspectionTypeCategory: FC = (): JSX.Element => {
  const i18nProvider = polyglotI18nProvider(() => japaneseMessages, "ja");
  return (
    <Admin
      dataProvider={simpleRestProvider("http://localhost:5000/v1")}
      i18nProvider={i18nProvider}
    >
      <Resource
        name="inspection-groups"
        options={{ label: "点検グループ" }}
        create={InspectionGroupCreate}
        edit={InspectionGroupEdit}
        list={InspectionGroupList}
      />
      <Resource
        name="inspection-types"
        options={{ label: "点検タイプ" }}
        create={InspectionTypeCreate}
        edit={InspectionTypeEdit}
        list={InspectionTypeList}
      />
      <Resource
        name="choice-templates"
        options={{ label: "選択肢テンプレート" }}
        list={ChoiceTemplateList}
      />
    </Admin>
  );
};
InspectionTypeCategory.displayName = InspectionTypeCategory.name;
