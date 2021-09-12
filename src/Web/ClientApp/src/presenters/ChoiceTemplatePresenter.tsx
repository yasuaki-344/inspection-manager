import {
  Table, TableBody, TableCell, TableHead, TableRow
} from '@material-ui/core';
import { CancelIconButton, EditIconButton } from '../components/common';
import { IChoiceTemplateInteractor } from "../interfaces";
import { ChoiceTemplate } from '../typescript-fetch';

export class ChoiceTemplatePresenter {
  private readonly useCase: IChoiceTemplateInteractor

  constructor(useCase: IChoiceTemplateInteractor) {
    this.useCase = useCase
  }

  get(): void {
    this.useCase.get();
  }

  getById(id: number): ChoiceTemplate | undefined {
    return this.useCase.getById(id)
  }

  choiceTemplateTable(
    updateMethod: (id: number) => void,
    deleteMethod: (id: number) => void,
  ): JSX.Element {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>選択肢</TableCell>
            <TableCell>&nbsp;</TableCell>
            <TableCell>&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.useCase.getTemplates().map((template: ChoiceTemplate, index: number) =>
            <TableRow key={template.choice_template_id}>
              <TableCell>
                {template.choices.map(x => x.description).join(',')}
              </TableCell>
              <TableCell padding='checkbox'>
                <EditIconButton onClick={() => updateMethod(template.choice_template_id)}
                />
              </TableCell>
              <TableCell padding='checkbox'>
                <CancelIconButton onClick={() => deleteMethod(template.choice_template_id)}
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }
}