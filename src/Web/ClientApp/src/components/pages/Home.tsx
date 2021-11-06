import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DetailsIcon from "@mui/icons-material/Details";
import nameof from "ts-nameof.macro";
import { InspectionSheet, InspectionSheetInitialState } from "../../entities";
import {
  IInspectionSheetPresenter,
  IInspectionTypePresenter,
  IHomePresenter,
} from "../../interfaces/presenter";
import {
  IInspectionSheetController,
  IHomeController,
} from "../../interfaces/controller";
import { CancelIconButton } from "../utilities";
import { SheetSearchMenu } from "../SheetSearchMenu";
import { SheetDeleteConfirmationDialog } from "../dialog/SheetDeleteConfirmationDialog";
import { useDIContext } from "../../container";

export const Home: FC = (): JSX.Element => {
  const inject = useDIContext();
  const controller: IHomeController = inject(nameof<IHomeController>());
  const presenter: IHomePresenter = inject(nameof<IHomePresenter>());

  const typePresenter: IInspectionTypePresenter = inject(
    nameof<IInspectionTypePresenter>()
  );
  const sheetPresenter: IInspectionSheetPresenter = inject(
    nameof<IInspectionSheetPresenter>()
  );
  const sheetController: IInspectionSheetController = inject(
    nameof<IInspectionSheetController>()
  );
  const [inspectionSheets, setInspectionSheets] = useState<
    Array<InspectionSheet>
  >([]);
  const [filteredInspectionSheets, setFilteredInspectionSheets] = useState<
    Array<InspectionSheet>
  >([]);
  const [open, setOpen] = useState(false);
  const [targetSheet, setTargetSheet] = useState<InspectionSheet>(
    InspectionSheetInitialState
  );
  const [searchOption, setSearchOption] = useState({
    sheetName: "",
    inspectionGroup: "",
    inspectionType: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    controller.fetchDisplayData().then().catch();
    sheetPresenter
      .getAllInspectionSheet()
      .then((res: Array<InspectionSheet>) => {
        console.log(JSON.stringify(res));
        setInspectionSheets(res);
        setFilteredInspectionSheets(res);
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
    const filteredGroupIds = presenter.getGroupIds(
      searchOption.inspectionGroup
    );
    const filteredTypeIds = typePresenter.getIds(searchOption.inspectionType);
    setFilteredInspectionSheets(
      inspectionSheets.filter(
        (x: InspectionSheet) =>
          x.sheetName.includes(searchOption.sheetName) &&
          filteredGroupIds.includes(x.inspectionGroupId) &&
          filteredTypeIds.includes(x.inspectionTypeId)
      )
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
    setFilteredInspectionSheets(inspectionSheets);
    setPage(0);
  };

  const handleClickOpen = (sheet: InspectionSheet) => {
    setTargetSheet(sheet);
    setOpen(true);
  };

  const handleDelete = () => {
    setOpen(false);
    sheetController
      .removeInspectionSheet(targetSheet.sheetId)
      .then(() => {
        setInspectionSheets(
          inspectionSheets.filter(
            (x: InspectionSheet) => x.sheetId !== targetSheet.sheetId
          )
        );
        setFilteredInspectionSheets(
          inspectionSheets.filter(
            (x: InspectionSheet) => x.sheetId !== targetSheet.sheetId
          )
        );
      })
      .catch(console.error);
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

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h1>点検シート一覧</h1>
        </Grid>
        <Grid item xs={12}>
          <Link to="/create">新規作成</Link>
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
          <TableContainer component={Paper}>
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
                {filteredInspectionSheets
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
                        {presenter.getGroupName(sheet.inspectionGroupId)}
                      </TableCell>
                      <TableCell>
                        {typePresenter.getTypeName(sheet.inspectionTypeId)}
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
                        <CancelIconButton
                          onClick={() => handleClickOpen(sheet)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={inspectionSheets.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50]}
            labelRowsPerPage="1ページあたりの件数:"
          />
        </Grid>
      </Grid>
      <SheetDeleteConfirmationDialog
        open={open}
        sheetName={targetSheet.sheetName}
        groupName={presenter.getGroupName(targetSheet.inspectionGroupId)}
        typeName={typePresenter.getTypeName(targetSheet.inspectionTypeId)}
        onDeleteClick={handleDelete}
        onCancelClick={() => setOpen(false)}
      />
    </div>
  );
};
Home.displayName = Home.name;
