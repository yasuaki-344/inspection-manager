import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  CircularProgress,
  Container,
} from "@mui/material";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DetailsIcon from "@mui/icons-material/Details";
import nameof from "ts-nameof.macro";
import { InspectionSheet, InspectionSheetInitialState } from "../../entities";
import {
  IHomeController,
  IInspectionGroupInteractor,
  IInspectionTypeInteractor,
  IInspectionSheetInteractor,
} from "../../interfaces";
import { CancelIconButton } from "../utilities";
import { SheetSearchMenu } from "../SheetSearchMenu";
import { SheetDeleteConfirmationDialog } from "../dialog/SheetDeleteConfirmationDialog";
import { useDIContext } from "../../container";

export const Home: FC = (): JSX.Element => {
  const inject = useDIContext();
  const controller: IHomeController = inject(nameof<IHomeController>());

  const groupUseCase: IInspectionGroupInteractor = inject(
    nameof<IInspectionGroupInteractor>()
  );
  const typeUseCase: IInspectionTypeInteractor = inject(
    nameof<IInspectionTypeInteractor>()
  );
  const sheetUseCase: IInspectionSheetInteractor = inject(
    nameof<IInspectionSheetInteractor>()
  );

  const [open, setOpen] = useState(false);
  const [targetSheet, setTargetSheet] = useState<InspectionSheet>(
    InspectionSheetInitialState
  );
  const [searchOption, setSearchOption] = useState({
    sheetName: "",
    inspectionGroup: "",
    inspectionType: "",
  });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    controller
      .fetchDisplayData()
      .then(() => {
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  /**
   * Updates search option setting with given change event parameter.
   * @param e Change event which contains search option member name and its value.
   */
  const handleSearchOption = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchOption({
      ...searchOption,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Executes to search inspection sheet based on search options.
   */
  const handleSearch = () => {
    const { inspectionGroup, inspectionType, sheetName } = searchOption;
    controller.searchInspectionSheet(
      inspectionGroup,
      inspectionType,
      sheetName
    );
    setPage(0);
  };

  /**
   * Reset search options.
   */
  const handleResetSearchOption = () => {
    setSearchOption({
      sheetName: "",
      inspectionGroup: "",
      inspectionType: "",
    });
    controller.searchInspectionSheet("", "", "");
    setPage(0);
  };

  const handleClickOpen = (sheet: InspectionSheet) => {
    setTargetSheet(sheet);
    setOpen(true);
  };

  const handleDelete = () => {
    setOpen(false);
    controller.removeInspectionSheet(targetSheet.sheetId).catch(console.error);
  };

  /**
   * Changes page number to display.
   * @param event Page number change event.
   * @param newPage New page number.
   */
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  /**
   * Change the number of items to display per page.
   * @param event Change event for the number of items to display per page.
   */
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const table = loading ? (
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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ダウンロード</TableCell>
            <TableCell>点検シート名</TableCell>
            <TableCell>点検グループ</TableCell>
            <TableCell>点検種別</TableCell>
            <TableCell>&nbsp;</TableCell>
            <TableCell>&nbsp;</TableCell>
            <TableCell>&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sheetUseCase.filteredSheets
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((sheet: InspectionSheet) => (
              <TableRow key={sheet.sheetId}>
                <TableCell padding="checkbox">
                  <ButtonGroup
                    variant="outlined"
                    aria-label="outlined button group"
                  >
                    <Button
                      onClick={() =>
                        controller.exportExcelInspectionSheet(sheet)
                      }
                    >
                      Excel
                    </Button>
                    <Button
                      onClick={() =>
                        controller.exportJsonInspectionSheet(sheet)
                      }
                    >
                      JSON
                    </Button>
                  </ButtonGroup>
                </TableCell>
                <TableCell>{sheet.sheetName}</TableCell>
                <TableCell>
                  {groupUseCase.getName(sheet.inspectionGroupId)}
                </TableCell>
                <TableCell>
                  {typeUseCase.getName(sheet.inspectionTypeId)}
                </TableCell>
                <TableCell padding="checkbox">
                  <Link to={`/edit/${sheet.sheetId}`}>
                    <EditIcon />
                  </Link>
                </TableCell>
                <TableCell padding="checkbox">
                  <Link to={`/details/${sheet.sheetId}`}>
                    <DetailsIcon />
                  </Link>
                </TableCell>
                <TableCell padding="checkbox">
                  <CancelIconButton onClick={() => handleClickOpen(sheet)} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={sheetUseCase.filteredSheets.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 50]}
        labelRowsPerPage="1ページあたりの件数:"
      />
    </>
  );

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            点検シート一覧
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button variant="contained" component={Link} to="/create">
                新規作成
              </Button>
            </Grid>
            <Grid item xs={12}>
              <SheetSearchMenu
                searchOption={searchOption}
                handleSearchOption={handleSearchOption}
                handleSearch={handleSearch}
                handleResetSearchOption={handleResetSearchOption}
              />
            </Grid>
            <Grid item xs={12}>
              {table}
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <SheetDeleteConfirmationDialog
        open={open}
        sheetName={targetSheet.sheetName}
        groupName={groupUseCase.getName(targetSheet.inspectionGroupId)}
        typeName={typeUseCase.getName(targetSheet.inspectionTypeId)}
        onDeleteClick={handleDelete}
        onCancelClick={() => setOpen(false)}
      />
    </>
  );
};
Home.displayName = Home.name;
