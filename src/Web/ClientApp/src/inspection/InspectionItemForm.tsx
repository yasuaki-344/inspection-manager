import React, { Fragment, useState } from 'react';
import {
  Button, BottomNavigation, BottomNavigationAction,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Box, Collapse, IconButton, Grid, TextField,
  TableCell, TableRow
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import { InspectionItemOperator } from './InspectionItemOperator';

const useInputTypes = [
  { value: 1, label: "整数入力" },
  { value: 2, label: "テキスト入力" },
  { value: 3, label: "項目選択" },
];

export const InspectionItemForm = (props: any): JSX.Element => {
  const [
    inspectionItem, setItem, updateField,
    addChoice, removeChoice, updateChoice
  ] = InspectionItemOperator();

  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    setItem(props.inspectionItem);
    setOpen(true);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => handleEdit()}>
            <EditIcon />
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
                        <TextField
                          required
                          id="outlined-required"
                          label={`選択肢${index + 1}`}
                          variant="outlined"
                          size="small"
                          name="choice"
                          value={choice}
                          onChange={(e) => {
                            props.updateChoice(e,
                              props.equipment_id,
                              props.inspectionItem.inspection_item_id,
                              index)
                          }}
                        />
                        <IconButton color="primary" size="small"
                          onClick={() => props.removeChoice(
                            props.equipment_id,
                            props.inspectionItem.inspection_item_id,
                            index
                          )}
                        >
                          <CancelIcon />
                        </IconButton>

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
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">点検項目編集</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                autoFocus
                id="outlined-required"
                label="点検項目"
                variant="outlined"
                size="small"
                name="inspection_content"
                value={inspectionItem.inspection_content}
                onChange={(e) => updateField(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                select
                id="outlined-required"
                label="点検タイプ"
                variant="outlined"
                size="small"
                name="input_type"
                value={inspectionItem.input_type}
                onChange={(e) => { updateField(e); }}
              >
                {useInputTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            {(inspectionItem.input_type !== 3) ? <></> :
              <>
                {inspectionItem.choices.map((choice: string, index: number) =>
                  <Grid item xs={12} key={`${inspectionItem.inspection_item_id}_${index}`}>
                    <TextField
                      required
                      id="outlined-required"
                      label={`選択肢${index + 1}`}
                      variant="outlined"
                      size="small"
                      name="choice"
                      value={choice}
                      onChange={(e) => updateChoice(e, index)}
                    />
                    <IconButton color="primary" size="small"
                      onClick={() => removeChoice(index)}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Grid>
                )}
                <BottomNavigation showLabels>
                  <BottomNavigationAction
                    label="選択肢追加"
                    icon={<AddCircleIcon />}
                    onClick={() => addChoice()}
                  />
                </BottomNavigation>
              </>
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}