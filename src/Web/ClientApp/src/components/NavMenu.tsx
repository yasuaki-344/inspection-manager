import React, { useState } from 'react';
import { AppBar, Menu, MenuItem, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export const NavMenu = (): JSX.Element => {
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
              <Link className="text-dark" to="/">Home</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link className="text-dark" to="/create">Create</Link>
            </MenuItem>
          </Menu>
          <Typography variant="h6" noWrap color="inherit">
            <Link className="text-white" to="/" color="primary">
              Inspection Manager
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  );
}
NavMenu.displayName = NavMenu.name;
