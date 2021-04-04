import React, { useState } from 'react';
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

const DraggableListItem = ({ id, text }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.LIST_ITEM,
    item: { id, text },
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
  const [items, setItems] = useState([
    { id: 0, text: 'Inbox' },
    { id: 1, text: 'Drafts' },
    { id: 2, text: 'Trash' },
    { id: 3, text: 'Spam' },
  ]);
  // eslint-disable-next-line
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.LIST_ITEM,
      drop: (item, monitor) => {
        console.log(item);
        // console.log(`dropped:${item.text}`)
        setItems(items.map(x => {
          if (x.id === item.id) {
            return {
              id: item.id,
              text: item.text + 'moved',
            };
          } else {
            return x;
          }
        }))
      },
      hover: (item, monitor) => {

      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      })
    }),
    []
  );

  return (
    <List ref={drop} component="nav" aria-label="main mailbox folders">
      {items.map(item =>
        <DraggableListItem id={item.id} text={item.text} key={item.id} />
      )}
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