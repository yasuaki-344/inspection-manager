import React, { FC, useState } from "react";
import {
  Divider,
  IconButton,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import CreateIcon from "@mui/icons-material/Create";
import HomeIcon from "@mui/icons-material/Home";
import LabelIcon from "@mui/icons-material/Label";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link } from "react-router-dom";
import { LinkNavItem, LinkNavTitle } from "./stylesheets";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export const NavMenu: FC = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

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
      path: "/management",
      icon: <LabelIcon />,
      label: "管理ページ",
    },
  ];

  return (
    <>
      <AppBar position="absolute" open={open}>
        <Toolbar sx={{ pr: "24px" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            noWrap
            color="inherit"
            sx={{ flexGrow: 1 }}
          >
            <Link style={LinkNavTitle} to="/" color="primary">
              Inspection Manager
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          {mainMenuList.map((x) => (
            <Link key={x.id} style={LinkNavItem} to={x.path}>
              <ListItem button>
                <ListItemIcon>{x.icon}</ListItemIcon>
                <ListItemText primary={x.label} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {subMenuList.map((x) => (
            <Link key={x.id} style={LinkNavItem} to={x.path}>
              <ListItem button>
                <ListItemIcon>{x.icon}</ListItemIcon>
                <ListItemText primary={x.label} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </>
  );
};
NavMenu.displayName = NavMenu.name;
