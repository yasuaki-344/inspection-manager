import { IInspectionTypeInteractor } from "../interfaces";
import { InspectionType } from "../typescript-fetch";
import {
  IconButton, Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';

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
          {this.useCase.getTypes().map((type: InspectionType, index: number) =>
            <TableRow key={type.inspection_type_id}>
              <TableCell>
                {type.description}
              </TableCell>
              <TableCell padding='checkbox'>
                <IconButton
                  size='small'
                  color='primary'
                  onClick={() => updateMethod(type.inspection_type_id)}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell padding='checkbox'>
                <IconButton
                  data-testid={`remove-type-button-${index}`}
                  size="small"
                  color='secondary'
                  onClick={() => deleteMethod(type.inspection_type_id)}
                >
                  <CancelIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }
}