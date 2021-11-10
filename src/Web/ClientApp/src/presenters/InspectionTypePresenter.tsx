import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  IInspectionTypeInteractor,
  IInspectionTypePresenter,
} from "../interfaces";
import { InspectionType } from "../entities";
import { CancelIconButton, EditIconButton } from "../components/utilities";

export class InspectionTypePresenter implements IInspectionTypePresenter {
  private readonly useCase: IInspectionTypeInteractor;

  readonly state: InspectionType[];

  readonly editItem: InspectionType;

  constructor(useCase: IInspectionTypeInteractor) {
    this.useCase = useCase;
    this.state = useCase.types;
    this.editItem = useCase.target;
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
