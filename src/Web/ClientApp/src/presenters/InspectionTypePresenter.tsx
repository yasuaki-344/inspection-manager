import { IInspectionTypeInteractor } from "../interfaces";
import { InspectionType } from "../typescript-fetch";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';
import { CancelIconButton, EditIconButton } from "../components/common";

export class InspectionTypePresenter {
  private readonly useCase: IInspectionTypeInteractor

  constructor(useCase: IInspectionTypeInteractor) {
    this.useCase = useCase
  }

  get(): void {
    this.useCase.get()
  }

  getById(id: number): InspectionType | undefined {
    return this.useCase.getById(id)
  }

  inspectionTypeTable(
    updateMethod: (id: number) => void,
    deleteMethod: (id: number) => void,
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
          {this.useCase.types.map((type: InspectionType) =>
            <TableRow key={type.inspection_type_id}>
              <TableCell>
                {type.description}
              </TableCell>
              <TableCell padding='checkbox'>
                <EditIconButton onClick={() => updateMethod(type.inspection_type_id)} />
              </TableCell>
              <TableCell padding='checkbox'>
                <CancelIconButton onClick={() => deleteMethod(type.inspection_type_id)} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }
}