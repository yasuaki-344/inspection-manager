import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { CancelIconButton, EditIconButton } from "../components/common";
import {
  IChoiceTemplateInteractor,
  IChoiceTemplatePresenter,
} from "../interfaces";
import { ChoiceTemplate } from "../entities";

export class ChoiceTemplatePresenter implements IChoiceTemplatePresenter {
  private readonly useCase: IChoiceTemplateInteractor;

  constructor(useCase: IChoiceTemplateInteractor) {
    this.useCase = useCase;
  }

  get(): void {
    this.useCase.get();
  }

  getTemplates(): Array<ChoiceTemplate> {
    return this.useCase.templates;
  }

  getById(id: number): ChoiceTemplate | undefined {
    return this.useCase.getById(id);
  }

  getByIndex(index: number): ChoiceTemplate | undefined {
    return this.useCase.templates[index];
  }

  choiceTemplateTable(
    updateMethod: (id: number) => void,
    deleteMethod: (id: number) => void
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
          {this.useCase.templates.map((template: ChoiceTemplate) => (
            <TableRow key={template.choiceTemplateId}>
              <TableCell>
                {template.choices.map((x) => x.description).join(",")}
              </TableCell>
              <TableCell padding="checkbox">
                <EditIconButton
                  onClick={() => updateMethod(template.choiceTemplateId)}
                />
              </TableCell>
              <TableCell padding="checkbox">
                <CancelIconButton
                  onClick={() => deleteMethod(template.choiceTemplateId)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}
