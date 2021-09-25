import React, { FC, useState, useEffect } from "react";
import { BottomNavigation, TableContainer, Grid, Paper } from "@mui/material";
import { ChoiceTemplate } from "../../entities";
import {
  BottomNavigationAdd,
  Notification,
  NotificationInitState,
  NotificationStateInteractor,
} from "../common";
import { ChoiceTemplateInteractor } from "../../use-cases";
import { ChoiceTemplateRepository } from "../../infrastructure";
import { ChoiceTemplatePresenter } from "../../presenters";
import { ChoiceTemplateController } from "../../controllers";
import { ChoiceTemplateEditDialog } from "../dialog/ChoiceTemplateEditDialog";

const generate = (
  hook: [
    Array<ChoiceTemplate>,
    React.Dispatch<React.SetStateAction<Array<ChoiceTemplate>>>
  ]
) => {
  const [types, setTypes] = hook;
  const useCase = new ChoiceTemplateInteractor(
    types,
    setTypes,
    new ChoiceTemplateRepository()
  );
  const controller = new ChoiceTemplateController(useCase);
  const presenter = new ChoiceTemplatePresenter(useCase);
  return { controller, presenter };
};

export const ChoicesTemplateManager: FC = (): JSX.Element => {
  const { controller, presenter } = generate(
    useState<Array<ChoiceTemplate>>([])
  );
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [target, setTarget] = useState<ChoiceTemplate>({
    choiceTemplateId: 0,
    choices: [],
  });
  const notification = new NotificationStateInteractor(
    useState(NotificationInitState)
  );

  useEffect(() => {
    presenter.get();
  }, []);

  /**
   * Creates new template set.
   */
  const handleAddTemplate = () => {
    setTarget({
      choiceTemplateId: 0,
      choices: [],
    });
    setIsUpdate(false);
    setOpen(true);
  };

  /**
   * Edit the specified template.
   * @param id The template ID to be edited.
   */
  const handleUpdateTemplate = (id: number) => {
    const template = presenter.getById(id);
    if (template != null) {
      setTarget(template);
      setIsUpdate(true);
      setOpen(true);
    }
  };

  /**
   * Add new template set.
   */
  const handleRegistration = () => {
    if (isUpdate) {
      controller
        .update(target)
        .then(() => {
          notification.setMessageState("success", "更新に成功しました");
        })
        .catch((error) => {
          console.error(error);
          notification.setMessageState("error", "更新に失敗しました");
        });
    } else {
      controller
        .create(target)
        .then(() => {
          notification.setMessageState("success", "追加に成功しました");
        })
        .catch((error) => {
          console.error(error);
          notification.setMessageState("error", "追加に失敗しました");
        });
    }
    setOpen(false);
  };

  /**
   * Removes the specified template.
   * @param id The template ID to be removed.
   */
  const handleDeleteTemplate = (id: number) => {
    controller
      .delete(id)
      .then(() => {
        notification.setMessageState("success", "削除に成功しました");
      })
      .catch((error) => {
        console.error(error);
        notification.setMessageState("error", "削除に失敗しました");
      });
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h1>選択肢テンプレート</h1>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            {presenter.choiceTemplateTable(
              handleUpdateTemplate,
              handleDeleteTemplate
            )}
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <BottomNavigation showLabels>
            <BottomNavigationAdd
              label="テンプレート追加"
              onClick={handleAddTemplate}
            />
          </BottomNavigation>
        </Grid>
      </Grid>
      <ChoiceTemplateEditDialog
        open={open}
        target={target}
        setTarget={setTarget}
        onOkButtonClick={() => handleRegistration()}
        onCancelButtonClick={() => setOpen(false)}
      />
      <Notification
        open={notification.state.isOpen}
        severity={notification.state.severity}
        message={notification.state.message}
        onClose={() => {
          notification.hideDisplay();
        }}
      />
    </>
  );
};
ChoicesTemplateManager.displayName = ChoicesTemplateManager.name;
