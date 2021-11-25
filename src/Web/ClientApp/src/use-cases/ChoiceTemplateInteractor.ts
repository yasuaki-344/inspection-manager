import { Dispatch, SetStateAction, useState } from "react";
import {
  IChoiceTemplateInteractor,
  IChoiceTemplateRepository,
} from "../interfaces";
import { ChoiceTemplate, Option } from "../entities";

export class ChoiceTemplateInteractor implements IChoiceTemplateInteractor {
  readonly templates: ChoiceTemplate[];

  readonly target: ChoiceTemplate;

  private readonly dispatch: Dispatch<SetStateAction<ChoiceTemplate[]>>;

  private readonly setTarget: Dispatch<SetStateAction<ChoiceTemplate>>;

  private readonly repository: IChoiceTemplateRepository;

  /**
   * Initializes a new instance of ChoiceTemplateInteractor class.
   * @param repository Object implements IChoiceTemplateRepository interface.
   */
  constructor(repository: IChoiceTemplateRepository) {
    const [templates, setTemplates] = useState<ChoiceTemplate[]>([]);
    this.templates = templates;
    this.dispatch = setTemplates;

    const [target, setTarget] = useState<ChoiceTemplate>({
      choiceTemplateId: 0,
      choices: [],
    });
    this.target = target;
    this.setTarget = setTarget;

    this.repository = repository;
  }

  /** @inheritdoc */
  setUpNewChoiceTemplate(): void {
    this.setTarget({
      choiceTemplateId: 0,
      choices: [],
    });
  }

  /** @inheritdoc */
  setUpChoiceTemplateForEdit(id: number): void {
    const data = this.templates.find((x) => x.choiceTemplateId === id);
    if (data != null) {
      this.setTarget(data);
    }
  }

  /** @inheritdoc */
  addChoice(): void {
    this.setTarget({
      ...this.target,
      choices: this.target.choices.concat({
        optionId: 0,
        description: "",
      }),
    });
  }

  /** @inheritdoc */
  updateChoice(index: number, input: string): void {
    this.setTarget({
      ...this.target,
      choices: this.target.choices.map((value: Option, i: number) => {
        return i !== index
          ? value
          : {
              optionId: value.optionId,
              description: input,
            };
      }),
    });
  }

  /** @inheritdoc */
  removeChoice(index: number): void {
    this.setTarget({
      ...this.target,
      choices: this.target.choices.filter(
        (value: Option, i: number) => i !== index
      ),
    });
  }

  /** @inheritdoc */
  async fetchAllChoiceTemplates(): Promise<void> {
    this.repository
      .fetchAllChoiceTemplates()
      .then((res: ChoiceTemplate[]) => {
        this.dispatch(res);
      })
      .catch(console.error);
  }

  /** @inheritdoc */
  async create(): Promise<void> {
    await this.repository.post(this.target).then((res: ChoiceTemplate) => {
      this.dispatch(this.templates.concat(res));
    });
  }

  /** @inheritdoc */
  async update(): Promise<void> {
    await this.repository.put(this.target).then((res: ChoiceTemplate) => {
      this.dispatch(
        this.templates.map((x) =>
          x.choiceTemplateId === res.choiceTemplateId ? res : x
        )
      );
    });
  }

  /** @inheritdoc */
  async delete(id: number): Promise<void> {
    await this.repository.delete(id).then(() => {
      this.dispatch(
        this.templates.filter((x: ChoiceTemplate) => x.choiceTemplateId !== id)
      );
    });
  }
}
