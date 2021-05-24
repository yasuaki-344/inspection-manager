import React, { FC, useRef, useContext } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Accordion, AccordionSummary, AccordionDetails, IconButton,
  Grid, Paper, TextField,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { InspectionItemForm } from './InspectionItemForm';
import { InspectionSheetContext } from '../context/InspectionSheetContext';
import {
  Equipment, ItemType, InspectionItem, InspectionSheetContextType
} from '../Types';

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

interface DragItem {
  id: number,
};

interface EquipmentFormProps {
  equipment: Equipment,
  handleAddItem: (equipmentId: number) => void,
  handleEditItem: (equipmentId: number, inspectionItem: InspectionItem) => void,
  storeHistory: () => void,
};

export const EquipmentForm: FC<EquipmentFormProps> = ({
  equipment,
  handleAddItem,
  handleEditItem,
  storeHistory
}): JSX.Element => {
  const classes = useStyles();
  const context = useContext<InspectionSheetContextType>(InspectionSheetContext);
  const dropRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLButtonElement>(null);

  const [, drop] = useDrop({
    accept: ItemType.EQUIPMENT,
    drop(item: DragItem) {
      if (!dropRef.current || item.id === equipment.equipment_id) {
        return;
      }
      context.swapEquipment(equipment.equipment_id, item.id);
    }
  })
  const [, drag, preview] = useDrag({
    type: ItemType.EQUIPMENT,
    item: { id: equipment.equipment_id },
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
          <div>{equipment.equipment_name}</div>
          <IconButton
            data-testid='remove-equipment-button'
            size='small'
            color='inherit'
            onClick={() => context.removeEquipment(equipment.equipment_id)}
          >
            <CancelIcon />
          </IconButton>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={12} className={classes.paperElement}>
              <TextField
                required
                label='点検機器名'
                variant='outlined'
                size='small'
                name='equipment_name'
                value={equipment.equipment_name}
                onChange={e => context.updateEquipment(e, equipment.equipment_id)}
              />
            </Grid>
            <Grid item xs={12}>
              <InspectionItemForm
                equipmentId={equipment.equipment_id}
                inspectionItems={equipment.inspection_items}
                editInspectionItem={handleEditItem}
                addInspectionItem={handleAddItem}
                storeHistory={storeHistory}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Paper >
  );
}