import React from 'react';
import { DndProvider } from 'react-dnd';
import { useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export const ItemTypes = {
  LIST_ITEM: 'listItem'
}

const DraggableListItem = (text) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.KNIGHT,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
      }}
    >
      <ListItem>
        <ListItemText primary={text} />
      </ListItem>
    </div>
  );
};

const DroppableList = () => {
  return (
    <List component="nav" aria-label="main mailbox folders">
      <DraggableListItem text="Inbox" />
      <DraggableListItem text="Drafts" />
      <DraggableListItem text="Trash" />
      <DraggableListItem text="Spam" />
    </List>
  );
};

export const Experiment = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DroppableList />
    </DndProvider>
  )
}