import React, { FC, useContext, useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import nameof from "ts-nameof.macro";
import { InspectionSheetForm } from "./InspectionSheetForm";
import {
  TopPageLink,
  Notification,
  NotificationInitState,
  NotificationStateInteractor,
} from "../utilities";
import { OriginalSheetSelectDialog } from "../dialog";
import { DIContainerContext } from "../../App";
import { InspectionSheet, InspectionSheetInitialState } from "../../entities";
import {
  IInspectionSheetController,
  IInspectionSheetPresenter,
} from "../../interfaces";

export const Create: FC = (): JSX.Element => {
  const container = useContext(DIContainerContext);
  const sheetPresenter: IInspectionSheetPresenter = container.inject(
    nameof<IInspectionSheetPresenter>()
  );
  const sheetController: IInspectionSheetController = container.inject(
    nameof<IInspectionSheetController>()
  );
  const [open, setOpen] = useState(false);
  const [inspectionSheets, setInspectionSheets] = useState<InspectionSheet[]>(
    []
  );
  const notification = new NotificationStateInteractor(
    useState(NotificationInitState)
  );

  useEffect(() => {
    sheetController.setSheet(InspectionSheetInitialState);
    sheetController
      .getAllInspectionSheet()
      .then((json: InspectionSheet[]) => {
        console.log(json);
        setInspectionSheets(json);
      })
      .catch((error) => {
        notification.setMessageState("error", "データの取得に失敗しました");
        console.error(error);
      });
  }, []);

  /**
   * Set the specified inspection sheet.
   * @param sheetId Sheet ID of inspection sheet to set.
   */
  const handleSelectSheet = (sheetId: number) => {
    sheetController.getInspectionSheetById(sheetId).catch((error) => {
      notification.setMessageState(
        "error",
        `データの取得に失敗しました (ID:${sheetId})`
      );
      console.error(error);
    });
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.debug(sheetPresenter);
    sheetController
      .createInspectionSheet()
      .then(() => {
        notification.setMessageState("success", "登録に成功しました");
      })
      .catch((error) => {
        console.error(error);
        notification.setMessageState("error", "登録に失敗しました");
      });
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h1>新規作成ページ</h1>
        </Grid>
        <Grid item xs={12}>
          <TopPageLink />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => setOpen(true)}
          >
            既存のデータをコピー
          </Button>
        </Grid>
        <Grid item xs={12}>
          <form data-testid="form" onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <InspectionSheetForm isEdit={false} />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  新規作成
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
      <OriginalSheetSelectDialog
        open={open}
        inspectionSheets={inspectionSheets}
        onSelectClick={handleSelectSheet}
        onCancelClick={() => setOpen(false)}
      />
    </>
  );
};
Create.displayName = Create.name;
