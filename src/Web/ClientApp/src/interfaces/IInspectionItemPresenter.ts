import React from "react";
import { InspectionItem } from "../entities";

export interface IInspectionItemPresenter {
  getState(): InspectionItem;
  isValidInspectionItem(): boolean;
  getEditContent(
    onTemplateSelectClick: (
      event: React.MouseEvent<HTMLElement, MouseEvent>
    ) => void
  ): JSX.Element;
}
