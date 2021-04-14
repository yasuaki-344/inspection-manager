import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Accordion, AccordionSummary, AccordionDetails, IconButton,
  Grid, Paper, TextField,
} from '@material-ui/core';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CancelIcon from '@material-ui/icons/Cancel';
import { InspectionItemForm } from './InspectionItemForm';
import { InspectionSheetContext } from '../context/InspectionSheetContext';
import { InspectionItemContext } from '../context/InspectionItemContext';
import { Equipment, ItemType, InspectionItem } from '../Types';

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
  const itemContext = useContext(InspectionItemContext);
  const dropRef = useRef(null);
  const dragRef = useRef(null);

  const [, drop] = useDrop({
    accept: ItemType.EQUIPMENT,
    drop(item: any) {
      if (!dropRef.current || item.id === props.equipment.equipment_id) {
        return;
      }
      context.swapEquipment(props.equipment.equipment_id, item.id);
    }
  })
  const [, drag, preview] = useDrag({
    type: ItemType.EQUIPMENT,
    item: { id: props.equipment.equipment_id },
  })
  preview(drop(dropRef));
  drag(dragRef);

  return (
    <Paper variant='outlined' >
      <Accordion>
        <AccordionSummary
          className={classes.equipmentLabel}
          expandIcon={<ExpandMoreIcon className={classes.menuIcon} />}
          ref={dropRef}
        >
          <IconButton size='small' color='inherit' ref={dragRef}>
            <DragHandleIcon />
          </IconButton>
          <div>{props.equipment.equipment_name}</div>
          <IconButton
            size='small'
            color='inherit'
            onClick={() => context.removeEquipment(props.equipment.equipment_id)}
          >
            <CancelIcon />
          </IconButton>
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
                editInspectionItem={(inspectionItem: InspectionItem) => {
                  /**
                   * Implements the process for editing inspection item.
                   */
                  props.setEquipmentId(props.equipment.equipment_id);
                  props.setAdditional(false);
                  itemContext.setItem(inspectionItem);
                  props.setOpen(true);
                }}
                addInspectionItem={() => {
                  /**
                   * Implements the process for adding inspection item.
                   */
                  props.setEquipmentId(props.equipment.equipment_id);
                  props.setAdditional(true);
                  itemContext.setItem({
                    inspection_item_id: Math.random().toString(36).substr(2, 9),
                    inspection_content: '',
                    input_type: 1,
                    choices: [],
                  })
                  props.setOpen(true);
                }}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Paper >
  );
}