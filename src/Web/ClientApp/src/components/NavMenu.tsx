import React, { FC, useState } from 'react';
import {
  AppBar, Divider, IconButton, Toolbar, Typography,
  List, ListItem, ListItemIcon,
  SwipeableDrawer
} from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import CreateIcon from '@mui/icons-material/Create';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import HomeIcon from '@mui/icons-material/Home';
import LabelIcon from '@mui/icons-material/Label';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import './NavMenu.css';

const textDark = {
  color: '#000000',
  textDecoration: 'none',
}
const textWhite = {
  color: '#FFFFFF',
  textDecoration: 'none',
}

export const NavMenu: FC = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start' aria-label='menu' color='inherit'
            onClick={() => setOpen(true)}
          >
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
                  <Link style={textDark} to='/'>ホーム</Link>
                </ListItem>
                <ListItem button>
                  <ListItemIcon><CreateIcon /></ListItemIcon>
                  <Link style={textDark} to='/create'>新規作成</Link>
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemIcon><CategoryIcon /></ListItemIcon>
                  <Link style={textDark} to='/group'>点検グループ</Link>
                </ListItem>
                <ListItem button>
                  <ListItemIcon><LabelIcon /></ListItemIcon>
                  <Link style={textDark} to='/types'>点検種別</Link>
                </ListItem>
                <ListItem button>
                  <ListItemIcon><FormatListNumberedIcon /></ListItemIcon>
                  <Link style={textDark} to='/choices-template'>
                    選択肢テンプレート
                  </Link>
                </ListItem>
              </List>
            </div>
          </SwipeableDrawer>
          <Typography variant='h6' noWrap color='inherit'>
            <Link style={textWhite} to='/' color='primary'>
              Inspection Manager
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </header >
  );
}
NavMenu.displayName = NavMenu.name;
