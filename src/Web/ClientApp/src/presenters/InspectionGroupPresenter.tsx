import { IInspectionGroupInteractor } from "../interfaces";
import { InspectionGroup } from "../typescript-fetch";
import {
  IconButton, Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';

export class InspectionGroupPresenter {
  useCase: IInspectionGroupInteractor

  constructor(useCase: IInspectionGroupInteractor) {
    this.useCase = useCase
  }

  get(): void {
    this.useCase.get()
  }

  getById(id: number): InspectionGroup | undefined {
    return this.useCase.getById(id)
  }

  inspectionGroupTable(
    updateMethod: (id: number) => void,
    deleteMethod: (id: number) => void,
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
          {this.useCase.getGroups().map((type: InspectionGroup, index: number) =>
            <TableRow key={type.inspection_group_id}>
              <TableCell>
                {type.description}
              </TableCell>
              <TableCell padding='checkbox'>
                <IconButton
                  size='small'
                  color='primary'
                  onClick={() => updateMethod(type.inspection_group_id)}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell padding='checkbox'>
                <IconButton
                  data-testid={`remove-type-button-${index}`}
                  size='small'
                  color='secondary'
                  onClick={() => deleteMethod(type.inspection_group_id)}
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