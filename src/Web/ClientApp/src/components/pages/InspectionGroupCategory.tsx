import React, { FC, useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import nameof from "ts-nameof.macro";
import {
  Notification,
  NotificationInitState,
  NotificationStateInteractor,
} from "../utilities/Notification";
import {
  BottomNavigationAdd,
  CancelIconButton,
  EditIconButton,
  TopPageLink,
} from "../utilities";
import { EditDialog } from "../dialog/EditDialog";
import {
  IInspectionGroupPresenter,
  IInspectionGroupController,
} from "../../interfaces";
import { useDIContext } from "../../container";
import { InspectionGroup } from "../../entities";

export const InspectionGroupCategory: FC = (): JSX.Element => {
  const inject = useDIContext();
  const presenter: IInspectionGroupPresenter = inject(
    nameof<IInspectionGroupPresenter>()
  );
  const controller: IInspectionGroupController = inject(
    nameof<IInspectionGroupController>()
  );

  const [open, setOpen] = useState(false);
  const notification = new NotificationStateInteractor(
    useState(NotificationInitState)
  );

  useEffect(() => {
    controller.fetchInspectionGroups().catch((error) => {
      console.error(error);
      notification.setMessageState("error", "データの取得に失敗しました");
    });
  }, []);

  /**
   * Implement the process to add new group
   */
  const handleAddItem = (): void => {
    controller.createEditItem();
    setOpen(true);
  };

  /**
   * Implement the process to update group
   * @param id Group ID to be edited.
   */
  const handleUpdateItem = (id: number): void => {
    controller.setEditItem(id);
    setOpen(true);
  };

  const handleRegistration = (): void => {
    if (presenter.editItem.inspectionGroupId !== 0) {
      controller
        .update(presenter.editItem)
        .then(() => {
          notification.setMessageState("success", "更新に成功しました");
        })
        .catch((error) => {
          console.error(error);
          notification.setMessageState("error", "更新に失敗しました");
        });
    } else {
      controller
        .create(presenter.editItem)
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
   * Implement the process to delete group
   * @param id Group ID to be deleted.
   */
  const handleDeleteItem = (id: number): void => {
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
          <h1>点検グループ編集</h1>
        </Grid>
        <Grid item xs={12}>
          <TopPageLink />
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>点検グループ</TableCell>
                  <TableCell>&nbsp;</TableCell>
                  <TableCell>&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {presenter.state.map((type: InspectionGroup) => (
                  <TableRow key={type.inspectionGroupId}>
                    <TableCell padding="checkbox" align="center">
                      {type.inspectionGroupId}
                    </TableCell>
                    <TableCell>{type.description}</TableCell>
                    <TableCell padding="checkbox">
                      <EditIconButton
                        onClick={() => handleUpdateItem(type.inspectionGroupId)}
                      />
                    </TableCell>
                    <TableCell padding="checkbox">
                      <CancelIconButton
                        onClick={() => handleDeleteItem(type.inspectionGroupId)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <BottomNavigationAdd
            label="点検グループ追加"
            onClick={handleAddItem}
          />
        </Grid>
      </Grid>
      <EditDialog
        open={open}
        title="点検グループ編集"
        label="点検グループ名"
        target={presenter.editItem}
        onChange={controller.editGroup}
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
InspectionGroupCategory.displayName = InspectionGroupCategory.name;
