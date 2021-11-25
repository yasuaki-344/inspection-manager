import React, { FC, useState, useEffect } from "react";
import {
  BottomNavigation,
  TableContainer,
  Grid,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import nameof from "ts-nameof.macro";
import { ChoiceTemplate } from "../../entities";
import {
  BottomNavigationAdd,
  CancelIconButton,
  EditIconButton,
  Notification,
  NotificationInitState,
  NotificationStateInteractor,
} from "../utilities";
import { ChoiceTemplateEditDialog } from "../dialog";
import {
  IChoiceTemplateController,
  IChoiceTemplatePresenter,
} from "../../interfaces";
import { useDIContext } from "../../container";

export const ChoicesTemplateManager: FC = (): JSX.Element => {
  const inject = useDIContext();
  const controller: IChoiceTemplateController = inject(
    nameof<IChoiceTemplateController>()
  );
  const presenter: IChoiceTemplatePresenter = inject(
    nameof<IChoiceTemplatePresenter>()
  );

  const [open, setOpen] = useState(false);
  const notification = new NotificationStateInteractor(
    useState(NotificationInitState)
  );

  useEffect(() => {
    controller.getAllChoiceTemplates();
  }, []);

  /**
   * Creates new template set.
   */
  const handleAddTemplate = () => {
    controller.setUpNewChoiceTemplate();
    setOpen(true);
  };

  /**
   * Edit the specified template.
   * @param id The template ID to be edited.
   */
  const handleUpdateTemplate = (id: number) => {
    controller.setUpChoiceTemplateForEdit(id);
    setOpen(true);
  };

  /**
   * Add new template set.
   */
  const handleRegistration = () => {
    if (presenter.target.choiceTemplateId !== 0) {
      controller
        .update()
        .then(() => {
          notification.setMessageState("success", "更新に成功しました");
        })
        .catch((error) => {
          console.error(error);
          notification.setMessageState("error", "更新に失敗しました");
        });
    } else {
      controller
        .create()
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
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>選択肢</TableCell>
                  <TableCell>&nbsp;</TableCell>
                  <TableCell>&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {presenter.state.map((template: ChoiceTemplate) => (
                  <TableRow key={template.choiceTemplateId}>
                    <TableCell>
                      {template.choices.map((x) => x.description).join(",")}
                    </TableCell>
                    <TableCell padding="checkbox">
                      <EditIconButton
                        onClick={() =>
                          handleUpdateTemplate(template.choiceTemplateId)
                        }
                      />
                    </TableCell>
                    <TableCell padding="checkbox">
                      <CancelIconButton
                        onClick={() =>
                          handleDeleteTemplate(template.choiceTemplateId)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
