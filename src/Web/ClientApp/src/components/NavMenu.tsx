import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Menu, MenuItem, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import './NavMenu.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textDark: {
      color: "#000000",
      textDecoration:"none",
    },
    textWhite: {
      color: "#FFFFFF",
      textDecoration:"none",
    },
  })
);

export const NavMenu = (): JSX.Element => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" aria-label="menu" color="inherit" onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link className={classes.textDark} to="/">Home</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link className={classes.textDark} to="/create">Create</Link>
            </MenuItem>
          </Menu>
          <Typography variant="h6" noWrap color="inherit">
            <Link className={classes.textWhite} to="/" color="primary">
              Inspection Manager
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  );
}
NavMenu.displayName = NavMenu.name;
