import { Dispatch, SetStateAction, useReducer, useState } from "react";
import {
  InspectionSheetAction,
  InspectionSheetInitialState,
  InspectionSheetReducer,
} from "../entities";
import {
  IInspectionGroupRepository,
  IInspectionSheetInteractor,
  IInspectionSheetRepository,
  IInspectionTypeRepository,
} from "../interfaces";
import {
  Choice,
  Equipment,
  InspectionGroup,
  InspectionItem,
  InspectionSheet,
  InspectionType,
} from "../typescript-fetch";

export class InspectionSheetInteractor implements IInspectionSheetInteractor {
  readonly types: InspectionType[];

  private readonly setTypes: Dispatch<SetStateAction<InspectionType[]>>;

  readonly groups: InspectionGroup[];

  private readonly setGroups: Dispatch<SetStateAction<InspectionGroup[]>>;

  readonly sheets: InspectionSheet[];

  private readonly setSheets: Dispatch<SetStateAction<InspectionSheet[]>>;

  readonly filteredSheets: InspectionSheet[];

  private readonly setFilteredSheets: Dispatch<
    SetStateAction<InspectionSheet[]>
  >;

  readonly sheet: InspectionSheet;

  private readonly dispatch: Dispatch<InspectionSheetAction>;

  private readonly typeRepository: IInspectionTypeRepository;

  private readonly groupRepository: IInspectionGroupRepository;

  private readonly sheetRepository: IInspectionSheetRepository;

  /**
   * Initializes a new instance of InspectionSheetInteractor.
   * @param typeRepository IInspectionTypeRepository object.
   * @param groupRepository IInspectionGroupRepository object.
   * @param sheetRepository IInspectionSheetRepository object.
   */
  constructor(
    typeRepository: IInspectionTypeRepository,
    groupRepository: IInspectionGroupRepository,
    sheetRepository: IInspectionSheetRepository
  ) {
    [this.types, this.setTypes] = useState<InspectionType[]>([]);
    [this.groups, this.setGroups] = useState<InspectionGroup[]>([]);
    [this.sheets, this.setSheets] = useState<InspectionSheet[]>([]);
    [this.filteredSheets, this.setFilteredSheets] = useState<InspectionSheet[]>(
      []
    );
    [this.sheet, this.dispatch] = useReducer(
      InspectionSheetReducer,
      InspectionSheetInitialState
    );
    this.typeRepository = typeRepository;
    this.groupRepository = groupRepository;
    this.sheetRepository = sheetRepository;
  }

  typeName(id: number): string | undefined {
    return this.types.find((x: InspectionType) => x.id === id)?.description;
  }

  groupName(id: number): string | undefined {
    return this.groups.find((x: InspectionGroup) => x.id === id)?.description;
  }

  /** @inheritdoc */
  async fetchTypesAndGroups(): Promise<[InspectionType[], InspectionGroup[]]> {
    const [types, groups] = await Promise.all([
      this.typeRepository.get(),
      this.groupRepository.get(),
    ]);
    this.setTypes(types);
    this.setGroups(groups);

    return [types, groups];
  }

  /** @inheritdoc */
  async fetchAllInspectionSheets(): Promise<void> {
    const [types, groups, sheets] = await Promise.all([
      this.typeRepository.get(),
      this.groupRepository.get(),
      this.sheetRepository.get(),
    ]);
    this.setTypes(types);
    this.setGroups(groups);
    this.setSheets(sheets);
    this.setFilteredSheets(sheets);
  }

  /** @inheritdoc */
  async fetchInspectionSheetById(id: number): Promise<void> {
    const [types, groups, sheet] = await Promise.all([
      this.typeRepository.get(),
      this.groupRepository.get(),
      this.sheetRepository.getById(id),
    ]);
    this.setTypes(types);
    this.setGroups(groups);
    this.setSheet(sheet);
  }

  async copyInspectionSheetFrom(id: number): Promise<void> {
    await this.sheetRepository.getById(id).then((res: InspectionSheet) => {
      this.setSheet({
        ...res,
        sheetId: 0,
        equipments: res.equipments.map((x: Equipment) => {
          return {
            ...x,
            equipmentId: 0,
            inspectionItems: x.inspectionItems.map((y: InspectionItem) => {
              return {
                ...y,
                inspectionItemId: 0,
                choices: y.choices.map((z: Choice) => {
                  return {
                    ...z,
                    choiceId: 0,
                  };
                }),
              };
            }),
          };
        }),
      });
    });
  }

  /** @inheritdoc */
  searchInspectionSheet(
    groupKeyword: string,
    typeKeyword: string,
    sheetKeyword: string
  ): void {
    const groupIds = this.groups
      .filter((x: InspectionGroup) => x.description.includes(groupKeyword))
      .map((x: InspectionGroup) => x.id);
    const typeIds = this.types
      .filter((x: InspectionType) => x.description.includes(typeKeyword))
      .map((x: InspectionType) => x.id);

    this.setFilteredSheets(
      this.sheets.filter(
        (x: InspectionSheet) =>
          x.sheetName.includes(sheetKeyword) &&
          groupIds.includes(x.inspectionGroupId) &&
          typeIds.includes(x.inspectionTypeId)
      )
    );
  }

  /** @inheritdoc */
  setSheet(sheet: InspectionSheet): void {
    this.dispatch({
      type: "SET_SHEET",
      payload: { sheet },
    });
  }

  /** @inheritdoc */
  resetSearchedInspectionSheets(): void {
    this.setFilteredSheets(this.sheets);
  }

  /** @inheritdoc */
  setMember(
    name: "sheetName" | "inspectionGroupId" | "inspectionTypeId",
    value: string | number
  ): void {
    this.dispatch({ type: "setMember", payload: { name, value } });
  }

  /** @inheritdoc */
  addEquipment(): void {
    this.dispatch({
      type: "ADD_EQUIPMENT",
      payload: {},
    });
  }

  /** @inheritdoc */
  removeEquipment(orderIndex: number): void {
    this.dispatch({
      type: "REMOVE_EQUIPMENT",
      payload: {
        numericValue: orderIndex,
      },
    });
  }

  /** @inheritdoc */
  swapEquipments(srcOrderIndex: number, dstOrderIndex: number): void {
    this.dispatch({
      type: "SWAP_EQUIPMENTS",
      payload: {
        srcOrderIndex,
        dstOrderIndex,
      },
    });
  }

  /** @inheritdoc */
  setEquipmentName(orderIndex: number, name: string): void {
    this.dispatch({
      type: "SET_EQUIPMENT_STRING_FIELD",
      payload: {
        equipmentOrderIndex: orderIndex,
        name: "equipmentName",
        stringValue: name,
      },
    });
  }

  /** @inheritdoc */
  async createInspectionSheet(): Promise<void> {
    await this.sheetRepository.post(this.sheet);
  }

  async updateInspectionSheet(): Promise<void> {
    const sheet = await this.sheetRepository.put(this.sheet);
    this.setSheet(sheet);
  }

  /** @inheritdoc */
  async removeInspectionSheet(id: number): Promise<void> {
    await this.sheetRepository.delete(id).then(() => {
      this.setSheets(
        this.sheets.filter((x: InspectionSheet) => x.sheetId !== id)
      );
      this.setFilteredSheets(
        this.filteredSheets.filter((x: InspectionSheet) => x.sheetId !== id)
      );
    });
  }

  /** @inheritdoc */
  addInspectionItem(index: number, item: InspectionItem): void {
    this.dispatch({
      type: "ADD_INSPECTION_ITEM",
      payload: {
        equipmentOrderIndex: index,
        inspectionItem: item,
      },
    });
  }

  /** @inheritdoc */
  removeInspectionItem(
    equipmentOrderIndex: number,
    itemOrderIndex: number
  ): void {
    this.dispatch({
      type: "REMOVE_INSPECTION_ITEM",
      payload: {
        equipmentOrderIndex,
        itemOrderIndex,
      },
    });
  }

  updateInspectionItem(
    equipmentOrderIndex: number,
    itemOrderIndex: number,
    item: InspectionItem
  ): void {
    this.dispatch({
      type: "UPDATE_INSPECTION_ITEM",
      payload: {
        equipmentOrderIndex,
        itemOrderIndex,
        inspectionItem: item,
      },
    });
  }

  swapInspectionItem(
    equipmentOrderIndex: number,
    srcOrderIndex: number,
    dstOrderIndex: number
  ) {
    this.dispatch({
      type: "SWAP_INSPECTION_ITEMS",
      payload: {
        equipmentOrderIndex,
        srcOrderIndex,
        dstOrderIndex,
      },
    });
  }
}
