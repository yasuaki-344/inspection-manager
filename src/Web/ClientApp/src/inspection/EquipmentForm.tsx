import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Accordion, AccordionSummary, AccordionDetails,
  Button, BottomNavigation, BottomNavigationAction,
  Dialog, DialogActions, DialogContent, DialogTitle,
  IconButton, Grid, Paper, TextField, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CancelIcon from '@material-ui/icons/Cancel';
import { isValidInspectionItem, InspectionItemOperator } from './InspectionItemOperator';
import { InspectionItemForm } from './InspectionItemForm';
import { useInputTypes, InspectionItem } from './Types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    equipmentLabel: {
      backgroundColor: theme.palette.primary.main,
      color: "#FFFFFF",
      fontSize: 20,
    },
    paperElement: {
      margin: 4
    },
    menuIcon: {
      color: "#FFFFFF",
    },
  })
);

export const EquipmentForm = (props: any): JSX.Element => {
  const classes = useStyles();

  const [
    inspectionItem, setItem, updateField,
    addChoice, removeChoice, updateChoice
  ] = InspectionItemOperator();

  const [open, setOpen] = useState(false);
  const [additional, setAdditional] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(!isValidInspectionItem(inspectionItem));
  }, [inspectionItem]);

  return (
    <Paper variant="outlined">
      <Accordion>
        <AccordionSummary
          className={classes.equipmentLabel}
          expandIcon={<ExpandMoreIcon className={classes.menuIcon} />}
        >
          <div>{props.equipment.equipment_name}</div>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={12} className={classes.paperElement}>
              <TextField
                required
                id="outlined-required"
                label="点検機器名"
                variant="outlined"
                size="small"
                name="equipment_name"
                value={props.equipment.equipment_name}
                onChange={(e) => { props.updateEquipment(e, props.equipment.equipment_id) }}
              />
            </Grid>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>点検項目</TableCell>
                    <TableCell>点検タイプ</TableCell>
                    <TableCell>選択肢</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.equipment.inspection_items.map((inspectionItem: InspectionItem) =>
                    <InspectionItemForm
                      key={inspectionItem.inspection_item_id}
                      equipment_id={props.equipment.equipment_id}
                      inspectionItem={inspectionItem}
                      removeInspectionItem={props.removeInspectionItem}
                      handleEdit={() => {
                        setAdditional(false);
                        setItem(inspectionItem);
                        setOpen(true);
                      }}
                    />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Grid item xs={12}>
              <BottomNavigation showLabels>
                <BottomNavigationAction
                  label="点検項目追加"
                  icon={<AddCircleIcon />}
                  onClick={() => {
                    setAdditional(true);
                    setItem({
                      inspection_item_id: Math.random().toString(36).substr(2, 9),
                      inspection_content: "",
                      input_type: 1,
                      choices: [],
                    })
                    setOpen(true);
                  }}
                />
                <BottomNavigationAction
                  label="点検機器削除"
                  icon={<CancelIcon />}
                  onClick={() => props.removeEquipment(props.equipment.equipment_id)}
                />
              </BottomNavigation>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>点検項目編集</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                autoFocus
                id='outlined-required'
                label='点検項目'
                variant='outlined'
                size='small'
                name='inspection_content'
                value={inspectionItem.inspection_content}
                onChange={(e) => updateField(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                select
                id='outlined-required'
                label='点検タイプ'
                variant='outlined'
                size='small'
                name='input_type'
                value={inspectionItem.input_type}
                onChange={(e) => { updateField(e); }}
              >
                {useInputTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem >
                ))}
              </TextField>
            </Grid>
            {(inspectionItem.input_type !== 3) ? <></> :
              <>
                {inspectionItem.choices.map((choice: string, index: number) =>
                  <Grid item xs={12} key={`${inspectionItem.inspection_item_id}_${index}`}>
                    <TextField
                      required
                      id='outlined-required'
                      label={`選択肢${index + 1}`}
                      variant='outlined'
                      size='small'
                      name='choice'
                      value={choice}
                      onChange={(e) => updateChoice(e, index)}
                    />
                    <IconButton color='primary' size='small'
                      onClick={() => removeChoice(index)}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <BottomNavigation showLabels>
                    <BottomNavigationAction
                      label='選択肢追加'
                      icon={<AddCircleIcon />}
                      onClick={() => addChoice()}
                    />
                  </BottomNavigation>
                </Grid>
              </>
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='primary'
            disabled={disabled}
            onClick={() => {
              if (additional) {
                props.addInspectionItem(props.equipment.equipment_id, inspectionItem);
              } else {
                props.updateInspectionItem(props.equipment.equipment_id, inspectionItem);
              }
              setOpen(false);
            }}
          >OK</Button>
          <Button
            variant='contained'
            onClick={() => setOpen(false)}
          >キャンセル</Button>
        </DialogActions>
      </Dialog>
    </Paper >
  );
}