import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar, Divider, IconButton, Toolbar, Typography,
  List, ListItem, ListItemIcon,
  SwipeableDrawer
} from '@material-ui/core';
import CategoryIcon from '@material-ui/icons/Category';
import CreateIcon from '@material-ui/icons/Create';
import HomeIcon from '@material-ui/icons/Home';
import LabelIcon from '@material-ui/icons/Label';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import './NavMenu.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textDark: {
      color: '#000000',
      textDecoration: 'none',
    },
    textWhite: {
      color: '#FFFFFF',
      textDecoration: 'none',
    },
  })
);

export const NavMenu = (): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <header>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' aria-label='menu' color='inherit' onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor='left'
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <div
              role='presentation'
              onClick={() => setOpen(false)}
              onKeyDown={() => setOpen(false)}
            >
              <List>
                <ListItem button>
                  <ListItemIcon><HomeIcon /></ListItemIcon>
                  <Link className={classes.textDark} to='/'>Home</Link>
                </ListItem>
                <ListItem button>
                  <ListItemIcon><CreateIcon /></ListItemIcon>
                  <Link className={classes.textDark} to='/group'>新規作成</Link>
                </ListItem>
                <ListItem button>
                  <ListItemIcon><CategoryIcon /></ListItemIcon>
                  <Link className={classes.textDark} to='/group'>点検グループ</Link>
                </ListItem>
                <ListItem button>
                  <ListItemIcon><LabelIcon /></ListItemIcon>
                  <Link className={classes.textDark} to='/types'>点検種別</Link>
                </ListItem>
              </List>
              <Divider />
            </div>
          </SwipeableDrawer>
          <Typography variant='h6' noWrap color='inherit'>
            <Link className={classes.textWhite} to='/' color='primary'>
              Inspection Manager
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </header >
  );
}
NavMenu.displayName = NavMenu.name;
