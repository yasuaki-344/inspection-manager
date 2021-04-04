import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export const ItemTypes = {
  LIST_ITEM: 'listItem'
}

export const Experiment = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Drafts" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Trash" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Spam" />
        </ListItem>
      </List>
    </DndProvider>
  )
}