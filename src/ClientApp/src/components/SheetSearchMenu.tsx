import React, { FC } from "react";
import { IconButton, TextField } from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SearchIcon from "@mui/icons-material/Search";
import { SearchField } from "./stylesheets";

interface SheetSearchMenuProps {
  searchOption: any;
  handleSearchOption: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSearch: any;
  handleResetSearchOption: any;
}

export const SheetSearchMenu: FC<SheetSearchMenuProps> = (
  props: SheetSearchMenuProps
): JSX.Element => {
  return (
    <>
      <TextField
        sx={SearchField}
        label="点検シート名"
        variant="outlined"
        size="small"
        name="sheetName"
        value={props.searchOption.sheetName}
        onChange={props.handleSearchOption}
      />
      <TextField
        sx={SearchField}
        label="点検グループ"
        variant="outlined"
        size="small"
        name="inspectionGroup"
        value={props.searchOption.inspectionGroup}
        onChange={props.handleSearchOption}
      />
      <TextField
        sx={SearchField}
        label="点検種別"
        variant="outlined"
        size="small"
        name="inspectionType"
        value={props.searchOption.inspectionType}
        onChange={props.handleSearchOption}
      />
      <IconButton onClick={props.handleSearch}>
        <SearchIcon />
      </IconButton>
      <IconButton edge="end" onClick={props.handleResetSearchOption}>
        <RotateLeftIcon />
      </IconButton>
    </>
  );
};
