import React, { FC, useEffect, useState } from "react";
import { Button, CircularProgress, Grid } from "@mui/material";
import { Box } from "@mui/system";
import nameof from "ts-nameof.macro";
import { InspectionSheetForm } from "./InspectionSheetForm";
import {
  TopPageLink,
  Notification,
  NotificationInitState,
  NotificationStateInteractor,
} from "../utilities";
import { OriginalSheetSelectDialog } from "../dialog";
import { ICreateController, ICreatePresenter } from "../../interfaces";
import { useDIContext } from "../../container";

export const Create: FC = (): JSX.Element => {
  const inject = useDIContext();
  const controller: ICreateController = inject(nameof<ICreateController>());
  const presenter: ICreatePresenter = inject(nameof<ICreatePresenter>());

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const notification = new NotificationStateInteractor(
    useState(NotificationInitState)
  );

  useEffect(() => {
    controller.initializeInspectionSheet();
    controller
      .fetchInspectionMasterData()
      .then(() => setLoading(false))
      .catch((error) => {
        notification.setMessageState("error", "データの取得に失敗しました");
        console.error(error);
      });
  }, []);

  const handleSheetSelectionDialog = () => {
    controller.fetchSelectionSheets().then(() => {
      setOpen(true);
    });
  };

  /**
   * Set the specified inspection sheet.
   * @param sheetId Sheet ID of inspection sheet to set.
   */
  const handleSelectSheet = (sheetId: number) => {
    controller.fetchInspectionSheet(sheetId).catch((error) => {
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
    controller
      .createInspectionSheet()
      .then(() => {
        notification.setMessageState("success", "登録に成功しました");
      })
      .catch((error) => {
        console.error(error);
        notification.setMessageState("error", "登録に失敗しました");
      });
  };

  const sheetForm = loading ? (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12}>
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </Grid>
    </Grid>
  ) : (
    <>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => handleSheetSelectionDialog()}
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
    </>
  );

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h1>新規作成ページ</h1>
        </Grid>
        <Grid item xs={12}>
          <TopPageLink />
        </Grid>
        {sheetForm}
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
        inspectionSheets={presenter.selectionSheets}
        onSelectClick={handleSelectSheet}
        onCancelClick={() => setOpen(false)}
      />
    </>
  );
};
Create.displayName = Create.name;
