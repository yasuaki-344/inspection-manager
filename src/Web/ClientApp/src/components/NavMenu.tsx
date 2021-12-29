import React, { FC, useState } from "react";
import {
  AppBar,
  Divider,
  IconButton,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import HomeIcon from "@mui/icons-material/Home";
import LabelIcon from "@mui/icons-material/Label";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { LinkNavItem, LinkNavTitle } from "./stylesheets";

export const NavMenu: FC = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  const mainMenuList = [
    {
      id: 1,
      path: "/",
      icon: <HomeIcon />,
      label: "ホーム",
    },
    {
      id: 2,
      path: "/create",
      icon: <CreateIcon />,
      label: "新規作成",
    },
  ];

  const subMenuList = [
    {
      id: 2,
      path: "/types",
      icon: <LabelIcon />,
      label: "点検種別",
    },
    {
      id: 3,
      path: "/choices-template",
      icon: <FormatListNumberedIcon />,
      label: "選択肢テンプレート",
    },
  ];

  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="menu"
            color="inherit"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor="left"
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <div
              role="presentation"
              onClick={() => setOpen(false)}
              onKeyDown={() => setOpen(false)}
            >
              <List>
                {mainMenuList.map((x) => (
                  <Link key={x.id} style={LinkNavItem} to={x.path}>
                    <ListItem button>
                      <ListItemIcon>{x.icon}</ListItemIcon>
                      <ListItemText primary={x.label} />
                    </ListItem>
                  </Link>
                ))}
                <Divider />
                {subMenuList.map((x) => (
                  <Link key={x.id} style={LinkNavItem} to={x.path}>
                    <ListItem button>
                      <ListItemIcon>{x.icon}</ListItemIcon>
                      <ListItemText primary={x.label} />
                    </ListItem>
                  </Link>
                ))}
              </List>
            </div>
          </SwipeableDrawer>
          <Typography variant="h6" noWrap color="inherit">
            <Link style={LinkNavTitle} to="/" color="primary">
              Inspection Manager
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  );
};
NavMenu.displayName = NavMenu.name;
