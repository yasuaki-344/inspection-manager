import React, { FC, useState, useEffect } from "react";
import { Grid, Paper, TableContainer } from "@mui/material";
import { InspectionGroup } from "../../entities";
import { InspectionGroupInteractor } from "../../use-cases";
import { InspectionGroupController } from "../../controllers";
import { InspectionGroupPresenter } from "../../presenters";
import { InspectionGroupRepository } from "../../infrastructure/InspectionGroupRepository";
import {
  Notification,
  NotificationInitState,
  NotificationStateInteractor,
} from "../utilities/Notification";
import { BottomNavigationAdd, TopPageLink } from "../utilities";
import { EditDialog } from "../dialog/EditDialog";

const generate = (
  hook: [
    Array<InspectionGroup>,
    React.Dispatch<React.SetStateAction<Array<InspectionGroup>>>
  ]
) => {
  const [types, setTypes] = hook;
  const useCase = new InspectionGroupInteractor(
    types,
    setTypes,
    new InspectionGroupRepository()
  );
  const controller = new InspectionGroupController(useCase);
  const presenter = new InspectionGroupPresenter(useCase);
  return { controller, presenter };
};

export const InspectionGroupCategory: FC = (): JSX.Element => {
  const { controller, presenter } = generate(
    useState<Array<InspectionGroup>>([])
  );

  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [target, setTarget] = useState<InspectionGroup>({
    inspectionGroupId: 0,
    description: "",
  });
  const notification = new NotificationStateInteractor(
    useState(NotificationInitState)
  );

  useEffect(() => {
    presenter.get();
  }, []);

  /**
   * Implement the process to add new group
   */
  const handleAddItem = (): void => {
    setTarget({
      inspectionGroupId: 0,
      description: "グループ",
    });
    setIsUpdate(false);
    setOpen(true);
  };

  /**
   * Implement the process to update group
   * @param id Group ID to be edited.
   */
  const handleUpdateItem = (id: number): void => {
    const group = presenter.getById(id);
    if (group != null) {
      setTarget(group);
      setIsUpdate(true);
      setOpen(true);
    }
  };

  const handleRegistration = (): void => {
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
            {presenter.inspectionGroupTable(handleUpdateItem, handleDeleteItem)}
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
        target={target}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTarget({
            ...target,
            [e.target.name]: e.target.value,
          })
        }
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
