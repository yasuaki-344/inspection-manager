import React, { FC, useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import nameof from "ts-nameof.macro";
import { InspectionSheetForm } from "./InspectionSheetForm";
import {
  Notification,
  NotificationInitState,
  NotificationStateInteractor,
  TopPageLink,
} from "../utilities";
import {
  IInspectionSheetController,
  IInspectionSheetPresenter,
} from "../../interfaces";
import { useDIContext } from "../../container";

export const Edit: FC = ({ match }: any): JSX.Element => {
  const sheetId = match.params.id;

  const inject = useDIContext();
  const controller: IInspectionSheetController = inject(
    nameof<IInspectionSheetController>()
  );
  /* eslint-disable-next-line */
  const presenter: IInspectionSheetPresenter = inject(
    nameof<IInspectionSheetPresenter>()
  );

  const notification = new NotificationStateInteractor(
    useState(NotificationInitState)
  );

  useEffect(() => {
    controller
      .fetchInspectionMasterData()
      .then(() => {
        controller.fetchInspectionSheet(sheetId);
      })
      .catch((error: any) => {
        notification.setMessageState("error", "データの取得に失敗しました");
        console.error(error);
      });
  }, [sheetId]);

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // sheetController
    //   .updateInspectionSheet()
    //   .then(() => {
    //     notification.setMessageState("success", "更新に成功しました");
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     notification.setMessageState("error", "更新に失敗しました");
    //   });
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h1>編集ページ</h1>
        </Grid>
        <Grid item xs={12}>
          <TopPageLink />
        </Grid>
        <Grid item xs={12}>
          <form data-testid="form" onSubmit={handleUpdate}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <InspectionSheetForm isEdit />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  更新
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
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
Edit.displayName = Edit.name;
