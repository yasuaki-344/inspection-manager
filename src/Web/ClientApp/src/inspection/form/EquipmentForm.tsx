import React, { useContext, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Accordion, AccordionSummary, AccordionDetails, IconButton,
  Grid, Paper, TextField,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CancelIcon from '@material-ui/icons/Cancel';
import { InspectionItemForm } from './InspectionItemForm';
import { InspectionItemDialog } from '../dialog/InspectionItemDialog';
import { InspectionSheetContext } from '../context/InspectionSheetContext';
import { InspectionItemContext } from '../context/InspectionItemContext';
import { Equipment } from '../Types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    equipmentLabel: {
      backgroundColor: theme.palette.primary.main,
      color: '#FFFFFF',
      fontSize: 20,
    },
    paperElement: {
      margin: 4
    },
    menuIcon: {
      color: '#FFFFFF',
    },
  })
);

interface EquipmentFormProps {
  equipment: Equipment,
};

export const EquipmentForm = (props: EquipmentFormProps): JSX.Element => {
  const classes = useStyles();
  const context = useContext(InspectionSheetContext);
  const itemContext = useContext(InspectionItemContext)
  const [open, setOpen] = useState(false);
  const [additional, setAdditional] = useState(false);

  /**
   * Implements the process for managing inspection item of equipment.
   */
  const handleInspectionItem = () => {
    if (additional) {
      context.addInspectionItem(props.equipment.equipment_id, itemContext.inspectionItem);
    } else {
      context.updateInspectionItem(props.equipment.equipment_id, itemContext.inspectionItem);
    }
    setOpen(false);
  };

  return (
    <Paper variant='outlined'>
      <Accordion>
        <AccordionSummary
          className={classes.equipmentLabel}
          expandIcon={<ExpandMoreIcon className={classes.menuIcon} />}
        >
          <IconButton
            size='small'
            color='inherit'
            onClick={() => context.removeEquipment(props.equipment.equipment_id)}
          >
            <CancelIcon />
          </IconButton>
          <div>{props.equipment.equipment_name}</div>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={12} className={classes.paperElement}>
              <TextField
                required
                id='outlined-required'
                label='点検機器名'
                variant='outlined'
                size='small'
                name='equipment_name'
                value={props.equipment.equipment_name}
                onChange={e => context.updateEquipment(e, props.equipment.equipment_id)}
              />
            </Grid>
            <Grid item xs={12}>
              <InspectionItemForm
                equipmentId={props.equipment.equipment_id}
                inspectionItems={props.equipment.inspection_items}
                setOpen={setOpen}
                setAdditional={setAdditional}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <InspectionItemDialog
        open={open}
        handleClose={() => setOpen(false)}
        handleInspectionItem={handleInspectionItem}
      />
    </Paper >
  );
}