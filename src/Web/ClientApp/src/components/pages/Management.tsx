import React, { FC } from "react";
import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import polyglotI18nProvider from "ra-i18n-polyglot";
import japaneseMessages from "@bicstone/ra-language-japanese";
import CategoryIcon from "@mui/icons-material/Category";
import ClassIcon from '@mui/icons-material/Class';
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
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
  ChoiceTemplateCreate,
  ChoiceTemplateEdit,
  ChoiceTemplateList,
} from "./ChoiceTemplates";

export const Management: FC = (): JSX.Element => {
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
        icon={CategoryIcon}
      />
      <Resource
        name="inspection-types"
        options={{ label: "点検タイプ" }}
        create={InspectionTypeCreate}
        edit={InspectionTypeEdit}
        list={InspectionTypeList}
        icon={ClassIcon}
      />
      <Resource
        name="choice-templates"
        options={{ label: "選択肢テンプレート" }}
        create={ChoiceTemplateCreate}
        edit={ChoiceTemplateEdit}
        list={ChoiceTemplateList}
        icon={FormatListNumberedIcon}
      />
    </Admin>
  );
};
Management.displayName = Management.name;
