import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { IInspectionGroupInteractor } from "../interfaces";
import { InspectionGroup } from "../entities";
import { CancelIconButton, EditIconButton } from "../components/utilities";
import { IInspectionGroupPresenter } from "../interfaces/presenter";

export class InspectionGroupPresenter implements IInspectionGroupPresenter {
  private readonly useCase: IInspectionGroupInteractor;

  constructor(useCase: IInspectionGroupInteractor) {
    this.useCase = useCase;
  }

  get(): void {
    this.useCase.get();
  }

  getById(id: number): InspectionGroup | undefined {
    return this.useCase.getById(id);
  }

  getIds(keyword: string): Array<number> {
    return this.useCase.groups
      .filter((x: InspectionGroup) => x.description.includes(keyword))
      .map((x: InspectionGroup) => x.inspectionGroupId);
  }

  getGroupName(id: number): string | undefined {
    return this.useCase.groups.find(
      (x: InspectionGroup) => x.inspectionGroupId === id
    )?.description;
  }

  inspectionGroupTable(
    updateMethod: (id: number) => void,
    deleteMethod: (id: number) => void
  ): JSX.Element {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>点検グループ</TableCell>
            <TableCell>&nbsp;</TableCell>
            <TableCell>&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.useCase.groups.map((type: InspectionGroup) => (
            <TableRow key={type.inspectionGroupId}>
              <TableCell>{type.description}</TableCell>
              <TableCell padding="checkbox">
                <EditIconButton
                  onClick={() => updateMethod(type.inspectionGroupId)}
                />
              </TableCell>
              <TableCell padding="checkbox">
                <CancelIconButton
                  onClick={() => deleteMethod(type.inspectionGroupId)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}
