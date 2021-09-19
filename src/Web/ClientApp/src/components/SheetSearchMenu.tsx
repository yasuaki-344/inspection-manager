import React, { FC } from 'react';
import { Container, IconButton, TextField } from '@mui/material';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import SearchIcon from '@mui/icons-material/Search';
import { SearchField } from './stylesheets';

interface SheetSearchMenuProps {
  searchOption: any,
  handleSearchOption: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  handleSearch: any,
  handleResetSearchOption: any
}

export const SheetSearchMenu: FC<SheetSearchMenuProps> = (props): JSX.Element => {
  return (
    <Container fixed={true}>
      <TextField
        sx={SearchField}
        label='点検シート名'
        variant='outlined'
        size='small'
        name='sheet_name'
        value={props.searchOption.sheet_name}
        onChange={props.handleSearchOption}
      />
      <TextField
        sx={SearchField}
        label='点検グループ'
        variant='outlined'
        size='small'
        name='inspection_group'
        value={props.searchOption.inspection_group}
        onChange={props.handleSearchOption}
      />
      <TextField
        sx={SearchField}
        label='点検種別'
        variant='outlined'
        size='small'
        name='inspection_type'
        value={props.searchOption.inspection_type}
        onChange={props.handleSearchOption}
      />
      <IconButton onClick={props.handleSearch}>
        <SearchIcon />
      </IconButton>
      <IconButton edge='end' onClick={props.handleResetSearchOption}>
        <RotateLeftIcon />
      </IconButton>
    </Container>
  );
}
