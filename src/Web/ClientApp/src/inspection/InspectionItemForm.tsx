import React, { Fragment, useState } from 'react';
import {
  BottomNavigation, BottomNavigationAction,
  Box, Collapse, IconButton, Grid, TextField,
  TableCell, TableRow
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useInputTypes = [
  { value: 1, label: "整数入力" },
  { value: 2, label: "テキスト入力" },
  { value: 3, label: "項目選択" },
];

export const InspectionItemForm = (props: any): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {props.inspectionItem.inspection_content}
        </TableCell>
        <TableCell>
          {useInputTypes.filter(e => e.value === props.inspectionItem.input_type)[0].label}
        </TableCell>
        <TableCell>
          {props.inspectionItem.choices.join(',')}
        </TableCell>
        <TableCell align="right">
          <IconButton color="primary" size="small"
            onClick={() => props.removeInspectionItem(
              props.equipment_id, props.inspectionItem.inspection_item_id
            )}
          >
            <CancelIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Grid container spacing={0}>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="点検項目"
                    variant="outlined"
                    size="small"
                    name="inspection_content"
                    value={props.inspectionItem.inspection_content}
                    onChange={(e) => {
                      props.updateInspectionItem(e,
                        props.equipment_id, props.inspectionItem.inspection_item_id)
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    select
                    id="outlined-required"
                    label="点検タイプ"
                    variant="outlined"
                    size="small"
                    name="input_type"
                    value={props.inspectionItem.input_type}
                    onChange={(e) => {
                      props.updateInspectionItem(e,
                        props.equipment_id, props.inspectionItem.inspection_item_id)
                    }}
                  >
                    {useInputTypes.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                {(props.inspectionItem.input_type !== 3) ? <></> :
                  <Grid item xs={6}>
                    {props.inspectionItem.choices.map((choice: string, index: number) =>
                      <div key={`${props.inspectionItem.inspection_item_id}_${index}`}>
                        {choice}
                      </div>
                    )}
                    <BottomNavigation showLabels>
                      <BottomNavigationAction
                        label="選択肢追加"
                        icon={<AddCircleIcon />}
                        onClick={() => props.addChoice(
                          props.equipment_id, props.inspectionItem.inspection_item_id)}
                      />
                    </BottomNavigation>
                  </Grid>
                }
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}