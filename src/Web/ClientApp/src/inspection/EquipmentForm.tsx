import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Accordion, AccordionSummary, AccordionDetails,
  BottomNavigation, BottomNavigationAction, Grid, Paper, TextField
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { InspectionItemForm } from './InspectionItemForm';
import { InspectionItem } from './Types';

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
            {props.equipment.inspection_items.map((inspectionItem: InspectionItem) =>
              <Grid item xs={12}>
                <InspectionItemForm
                  key={inspectionItem.inspection_item_id}
                  equipment_id={props.equipment.equipment_id}
                  inspectionItem={inspectionItem}
                  removeInspectionItem={props.removeInspectionItem}
                  updateInspectionItem={props.updateInspectionItem}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <BottomNavigation showLabels>
                <BottomNavigationAction
                  label="点検項目追加"
                  icon={<AddCircleIcon />}
                  onClick={() => props.addInspectionItem(props.equipment.equipment_id)}
                />
                <BottomNavigationAction
                  label="点検機器削除"
                  icon={<RemoveCircleIcon />}
                  onClick={() => props.removeEquipment(props.equipment.equipment_id)}
                />
              </BottomNavigation>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Paper >
  );
}