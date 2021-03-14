import React, { Fragment, useState } from 'react';
import {
  Box, Collapse,
  IconButton, Grid, TextField,
  TableCell, TableRow
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

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
                <Grid item xs={12}>
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
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}