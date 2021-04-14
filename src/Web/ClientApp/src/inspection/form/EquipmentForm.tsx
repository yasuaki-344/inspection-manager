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
import { InspectionItemContext } from '../context/InspectionItemContext';
import {
  Equipment, ItemType, InspectionItem,
  InspectionSheetContextType, InspectionItemContextType

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
  id: string,
};

interface EquipmentFormProps {
  equipment: Equipment,
  setEquipmentId: React.Dispatch<React.SetStateAction<string>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setAdditional: React.Dispatch<React.SetStateAction<boolean>>,
};

export const EquipmentForm: FC<EquipmentFormProps> = ({
  equipment,
  setEquipmentId,
  setOpen,
  setAdditional,
}): JSX.Element => {
  const classes = useStyles();
  const context = useContext<InspectionSheetContextType>(InspectionSheetContext);
  const itemContext = useContext<InspectionItemContextType>(InspectionItemContext);
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

  /**
   * Implements the process for editing inspection item.
   */
  const handleEditItem = (equipmentId: string, inspectionItem: InspectionItem) => {
    setEquipmentId(equipmentId);
    setAdditional(false);
    itemContext.setItem(inspectionItem);
    setOpen(true);
  }

  /**
   * Implements the process for adding inspection item.
   */
  const handleAddItem = (equipmentId: string) => {
    setEquipmentId(equipmentId);
    setAdditional(true);
    itemContext.setItem({
      inspection_item_id: Math.random().toString(36).substr(2, 9),
      inspection_content: '',
      input_type: 1,
      choices: [],
    })
    setOpen(true);
  };

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
                id='outlined-required'
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
                editInspectionItem={(inspectionItem: InspectionItem) =>
                  handleEditItem(equipment.equipment_id, inspectionItem)
                }
                addInspectionItem={() => handleAddItem(equipment.equipment_id)}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Paper >
  );
}