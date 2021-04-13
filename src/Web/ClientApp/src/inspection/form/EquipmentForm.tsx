import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Accordion, AccordionSummary, AccordionDetails, IconButton,
  Grid, Paper, TextField,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CancelIcon from '@material-ui/icons/Cancel';
import { InspectionItemForm } from './InspectionItemForm';
import { InspectionSheetContext } from '../context/InspectionSheetContext';
import { Equipment, ItemType } from '../Types';

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
  setEquipmentId: React.Dispatch<React.SetStateAction<string>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setAdditional: React.Dispatch<React.SetStateAction<boolean>>,
};

export const EquipmentForm = (props: EquipmentFormProps): JSX.Element => {
  const classes = useStyles();
  const context = useContext(InspectionSheetContext);

  const ref = useRef<HTMLLIElement>(null)
  const [, drop] = useDrop({
    accept: ItemType.EQUIPMENT,
    drop(item: any) {
      if (!ref.current || item.id === props.equipment.equipment_id) {
        return;
      }
      context.swapEquipment(props.equipment.equipment_id, item.id);
    }
  })
  const [, drag] = useDrag({
    type: ItemType.EQUIPMENT,
    item: { id: props.equipment.equipment_id },
  })
  drag(drop(ref));

  return (
    <Paper variant='outlined' ref={ref}>
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
                setEquipmentId={props.setEquipmentId}
                inspectionItems={props.equipment.inspection_items}
                setOpen={props.setOpen}
                setAdditional={props.setAdditional}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Paper >
  );
}