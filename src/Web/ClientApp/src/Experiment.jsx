import React from 'react';
import { DndProvider } from 'react-dnd';
import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export const ItemTypes = {
  LIST_ITEM: 'listItem'
}

const DraggableListItem = ({ text }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.LIST_ITEM,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <ListItem ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      <ListItemText primary={text} />
    </ListItem>
  );
};

const DroppableList = () => {
  // eslint-disable-next-line
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.LIST_ITEM,
      drop: () => {
        console.log('dropped');
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      })
    }),
    []
  );

  return (
    <List ref={drop} component="nav" aria-label="main mailbox folders">
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