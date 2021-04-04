import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export const ItemTypes = {
  LIST_ITEM: 'listItem'
}

const DraggableListItem = (text) => {
  return (
    <ListItem button>
      <ListItemText primary={text} />
    </ListItem>
  );
}

export const Experiment = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <List component="nav" aria-label="main mailbox folders">
        <DraggableListItem text="Inbox" />
        <DraggableListItem text="Drafts" />
        <DraggableListItem text="Trash" />
        <DraggableListItem text="Spam" />
      </List>
    </DndProvider>
  )
}