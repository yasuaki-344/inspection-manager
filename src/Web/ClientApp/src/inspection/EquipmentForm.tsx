import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Accordion, AccordionSummary, AccordionDetails,
  BottomNavigation, BottomNavigationAction,
  Grid, Paper, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CancelIcon from '@material-ui/icons/Cancel';
import { InspectionItem } from './Types';
import { isValidInspectionItem, InspectionItemOperator } from './InspectionItemOperator';
import { InspectionItemForm } from './InspectionItemForm';
import { InspectionItemDialog } from './InspectionItemDialog';

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
    addChoice, removeChoice, updateChoice, setChoices,
  ] = InspectionItemOperator();

  const [open, setOpen] = useState(false);
  const [additional, setAdditional] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(!isValidInspectionItem(inspectionItem));
  }, [inspectionItem]);


  /**
   * Implements the process for editing inspection item.
   */
  const handleEditItem = () => {
    setAdditional(false);
    setItem(inspectionItem);
    setOpen(true);
  };

  /**
   * Implements the process for adding inspection item.
   */
   const handleAddItem = () => {
    setAdditional(true);
    setItem({
      inspection_item_id: Math.random().toString(36).substr(2, 9),
      inspection_content: "",
      input_type: 1,
      choices: [],
    })
    setOpen(true);
  };

  /**
   * Implements the process for managing inspection item of equipment.
   */
  const handleInspectionItem = () => {
    if (additional) {
      props.addInspectionItem(props.equipment.equipment_id, inspectionItem);
    } else {
      props.updateInspectionItem(props.equipment.equipment_id, inspectionItem);
    }
    setOpen(false);
  };

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
                      handleEdit={handleEditItem}
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
                  onClick={() => { handleAddItem() }}
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
      <InspectionItemDialog
        open={open}
        disabled={disabled}
        inspectionItem={inspectionItem}
        handleClose={() => setOpen(false)}
        updateField={updateField}
        setChoices={setChoices}
        addChoice={addChoice}
        updateChoice={updateChoice}
        removeChoice={removeChoice}
        handleInspectionItem={handleInspectionItem}
      />
    </Paper >
  );
}