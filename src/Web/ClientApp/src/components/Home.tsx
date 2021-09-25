import React, { FC, useContext, useEffect, useState } from "react";
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
import { DIContainerContext } from "../App";
import { InspectionSheet, InspectionSheetInitialState } from "../entities";
import {
  IInspectionGroupPresenter,
  IInspectionSheetPresenter,
  IInspectionTypePresenter,
} from "../interfaces/presenter";
import { IInspectionSheetController } from "../interfaces/controller";
import { CancelIconButton } from "./common";
import { SheetSearchMenu } from "./SheetSearchMenu";
import { SheetDeleteConfirmationDialog } from "./dialog/SheetDeleteConfirmationDialog";

export const Home: FC = (): JSX.Element => {
  const container = useContext(DIContainerContext);
  const groupPresenter: IInspectionGroupPresenter = container.inject(
    nameof<IInspectionGroupPresenter>()
  );
  const typePresenter: IInspectionTypePresenter = container.inject(
    nameof<IInspectionTypePresenter>()
  );
  const sheetPresenter: IInspectionSheetPresenter = container.inject(
    nameof<IInspectionSheetPresenter>()
  );
  const sheetController: IInspectionSheetController = container.inject(
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
    groupPresenter.get();
    typePresenter.get();
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
    const filteredGroupIds = groupPresenter.getIds(
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

  const handleDownload = (sheet: InspectionSheet) => {
    fetch(`excelsheet/${sheet.sheetId}`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.download = `${sheet.sheetName}.xlsx`;
        a.href = url;
        a.click();
        a.remove();
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 1e4);
      })
      .catch(console.error);
  };

  const handleExportJson = (sheet: InspectionSheet) => {
    fetch(`jsonexport/${sheet.sheetId}`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.download = `${sheet.sheetName}.json`;
        a.href = url;
        a.click();
        a.remove();
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 1e4);
      })
      .catch(console.error);
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
                          <Button onClick={() => handleDownload(sheet)}>
                            Excel
                          </Button>
                          <Button onClick={() => handleExportJson(sheet)}>
                            JSON
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                      <TableCell>{sheet.sheetName}</TableCell>
                      <TableCell>
                        {groupPresenter.getGroupName(sheet.inspectionGroupId)}
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
        groupName={groupPresenter.getGroupName(targetSheet.inspectionGroupId)}
        typeName={typePresenter.getTypeName(targetSheet.inspectionTypeId)}
        onDeleteClick={handleDelete}
        onCancelClick={() => setOpen(false)}
      />
    </div>
  );
};
Home.displayName = Home.name;
