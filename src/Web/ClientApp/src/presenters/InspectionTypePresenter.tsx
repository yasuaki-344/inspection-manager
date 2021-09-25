import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { IInspectionTypeInteractor } from "../interfaces";
import { InspectionType } from "../entities";
import { CancelIconButton, EditIconButton } from "../components/common";

export class InspectionTypePresenter {
  private readonly useCase: IInspectionTypeInteractor;

  constructor(useCase: IInspectionTypeInteractor) {
    this.useCase = useCase;
  }

  get(): void {
    this.useCase.get();
  }

  getById(id: number): InspectionType | undefined {
    return this.useCase.getById(id);
  }

  getIds(keyword: string): Array<number> {
    return this.useCase.types
      .filter((x: InspectionType) => x.description.includes(keyword))
      .map((x: InspectionType) => x.inspectionTypeId);
  }

  getTypeName(id: number): string | undefined {
    return this.useCase.types.find(
      (x: InspectionType) => x.inspectionTypeId === id
    )?.description;
  }

  inspectionTypeTable(
    updateMethod: (id: number) => void,
    deleteMethod: (id: number) => void
  ): JSX.Element {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>点検タイプ</TableCell>
            <TableCell>&nbsp;</TableCell>
            <TableCell>&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.useCase.types.map((type: InspectionType) => (
            <TableRow key={type.inspectionTypeId}>
              <TableCell>{type.description}</TableCell>
              <TableCell padding="checkbox">
                <EditIconButton
                  onClick={() => updateMethod(type.inspectionTypeId)}
                />
              </TableCell>
              <TableCell padding="checkbox">
                <CancelIconButton
                  onClick={() => deleteMethod(type.inspectionTypeId)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}
