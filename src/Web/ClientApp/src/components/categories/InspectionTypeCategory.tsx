import React, { FC, useState, useEffect } from "react";
import { Grid, Paper, TableContainer } from '@mui/material';
import { InspectionType } from '../../typescript-fetch';
import { InspectionTypeInteractor } from "../../use-cases";
import { InspectionTypeController } from "../../controllers";
import { InspectionTypePresenter } from "../../presenters";
import { InspectionTypeRepository } from "../../infrastructure/InspectionTypeRepository";
import { Notification, NotificationInitState, NotificationStateInteractor } from "../common/Notification";
import { BottomNavigationAdd, TopPageLink } from "../common";
import { EditDialog } from "./EditDialog";

const generate = (hook: [InspectionType[], React.Dispatch<React.SetStateAction<InspectionType[]>>]) => {
  const [types, setTypes] = hook;
  const useCase = new InspectionTypeInteractor(types, setTypes, new InspectionTypeRepository());
  const controller = new InspectionTypeController(useCase);
  const presenter = new InspectionTypePresenter(useCase);
  return { controller, presenter }
}

export const InspectionTypeCategory: FC = (): JSX.Element => {
  const { controller, presenter } = generate(useState<Array<InspectionType>>([]));

  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [target, setTarget] = useState<InspectionType>({
    inspection_type_id: 0,
    description: ''
  });
  const notification = new NotificationStateInteractor(useState(NotificationInitState));

  // eslint-disable-next-line
  useEffect(() => { presenter.get() }, []);

  /**
   * Implement the process to add new type
   */
  const handleAddItem = (): void => {
    setTarget({
      inspection_type_id: 0,
      description: 'タイプ'
    });
    setIsUpdate(false);
    setOpen(true);
  }

  /**
   * Implement the process to update type
   * @param id Type ID to be edited.
   */
  const handleUpdateItem = (id: number): void => {
    const type = presenter.getById(id);
    if (type != null) {
      setTarget(type);
      setIsUpdate(true);
      setOpen(true);
    }
  }

  const handleRegistration = (): void => {
    if (isUpdate) {
      controller.update(target)
        .then(() => {
          notification.setMessageState('success', '更新に成功しました');
        })
        .catch(error => {
          console.log(error);
          notification.setMessageState('error', '更新に失敗しました');
        });
    } else {
      controller.create(target)
        .then(() => {
          notification.setMessageState('success', '追加に成功しました');
        })
        .catch(error => {
          console.error(error);
          notification.setMessageState('error', '追加に失敗しました');
        })
    }
    setOpen(false);
  }

  /**
   * Implement the process to delete group
   * @param id Type ID to be deleted.
   */
  const handleDeleteItem = (id: number): void => {
    controller.delete(id)
      .then(() => {
        notification.setMessageState('success', '削除に成功しました');
      })
      .catch(error => {
        console.error(error);
        notification.setMessageState('error', '削除に失敗しました');
      });
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h1>点検タイプ編集</h1>
        </Grid>
        <Grid item xs={12}>
          <TopPageLink />
        </Grid>
        <Grid item xs={12}>
          <Notification
            open={notification.state.isOpen}
            severity={notification.state.severity}
            message={notification.state.message}
            onClose={() => { notification.hideDisplay(); }}
          />
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            {presenter.inspectionTypeTable(handleUpdateItem, handleDeleteItem)}
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <BottomNavigationAdd
            label="点検タイプ追加"
            onClick={handleAddItem}
          />
        </Grid>
      </Grid >
      <EditDialog
        open={open}
        title="点検タイプ編集"
        label="点検タイプ名"
        target={target}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTarget({
          ...target,
          [e.target.name]: e.target.value,
        })}
        onOkButtonClick={() => handleRegistration()}
        onCancelButtonClick={() => setOpen(false)}
      />
    </>
  );
}
InspectionTypeCategory.displayName = InspectionTypeCategory.name;
