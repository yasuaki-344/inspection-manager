import React, { FC, useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
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
import {
  IInspectionSheetInteractor,
} from "../../interfaces";
import { useDIContext } from "../../container";
import { InspectionSheetInitialState } from "../../entities";

export const Create: FC = (): JSX.Element => {
  const inject = useDIContext();
  const sheetUseCase: IInspectionSheetInteractor = inject(
    nameof<IInspectionSheetInteractor>()
  );

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const notification = new NotificationStateInteractor(
    useState(NotificationInitState)
  );

  useEffect(() => {
    sheetUseCase.setSheet(InspectionSheetInitialState);
    sheetUseCase.fetchTypesAndGroups()
      .then(([groups, types]) => {
        sheetUseCase.setGroupId(groups[0].id);
        sheetUseCase.setTypeId(types[0].id);
      })
      .then(() => setLoading(false))
      .catch((error) => {
        notification.setMessageState("error", "データの取得に失敗しました");
        console.error(error);
      });
  }, []);

  const handleSheetSelectionDialog = () => {
    sheetUseCase.fetchAllInspectionSheets().then(() => {
      setOpen(true);
    });
  };

  /**
   * Set the specified inspection sheet.
   * @param sheetId Sheet ID of inspection sheet to set.
   */
  const handleSelectSheet = (sheetId: number) => {
    sheetUseCase.copyInspectionSheetFrom(sheetId).catch((error) => {
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
    sheetUseCase
      .createInspectionSheet()
      .then(() => {
        sheetUseCase.setSheet({
          sheetId: 0,
          sheetName: "",
          inspectionGroupId: sheetUseCase.groups[0].id,
          inspectionTypeId: sheetUseCase.types[0].id,
          equipments: [],
        });
      })
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
    <Grid container spacing={2}>
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
        <Box component="form" onSubmit={handleSubmit}>
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
        </Box>
      </Grid>
    </Grid>
  );

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h4" align="center">
                点検シート新規作成
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TopPageLink />
            </Grid>
            <Grid item xs={12}>
              {sheetForm}
            </Grid>
          </Grid>
        </Paper>
      </Container>
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
        inspectionSheets={sheetUseCase.sheets}
        onSelectClick={handleSelectSheet}
        onCancelClick={() => setOpen(false)}
      />
    </>
  );
};
Create.displayName = Create.name;
