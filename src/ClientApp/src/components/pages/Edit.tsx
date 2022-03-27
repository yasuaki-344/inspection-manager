import React, { FC, useState, useEffect } from "react";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import nameof from "ts-nameof.macro";
import { InspectionSheetForm } from "./InspectionSheetForm";
import {
  Notification,
  NotificationInitState,
  NotificationStateInteractor,
  TopPageLink,
} from "../utilities";
import { useDIContext } from "../../container";
import { IInspectionSheetInteractor } from "../../interfaces";

export const Edit: FC = ({ match }: any): JSX.Element => {
  const sheetId = match.params.id;

  const inject = useDIContext();
  const useCase: IInspectionSheetInteractor = inject(
    nameof<IInspectionSheetInteractor>()
  );

  const [loading, setLoading] = useState(true);
  const notification = new NotificationStateInteractor(
    useState(NotificationInitState)
  );

  useEffect(() => {
    useCase
      .fetchTypesAndGroups()
      .then(([groups, types]) => {
        useCase.setMember("inspectionGroupId", groups[0].id);
        useCase.setMember("inspectionTypeId", types[0].id);
        useCase.fetchInspectionSheetById(sheetId);
      })
      .then(() => setLoading(false))
      .catch((error: any) => {
        notification.setMessageState("error", "データの取得に失敗しました");
        console.error(error);
      });
  }, [sheetId]);

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    useCase
      .updateInspectionSheet()
      .then(() => {
        notification.setMessageState("success", "更新に成功しました");
      })
      .catch((error) => {
        console.error(error);
        notification.setMessageState("error", "更新に失敗しました");
      });
  };

  const sheetForm = loading ? <></> : <InspectionSheetForm isEdit />;

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            点検シート編集
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TopPageLink />
            </Grid>
            <Grid item xs={12}>
              <Box component="form" onSubmit={handleUpdate}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    {sheetForm}
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      更新
                    </Button>
                  </Grid>
                </Grid>
              </Box>
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
    </>
  );
};
Edit.displayName = Edit.name;
