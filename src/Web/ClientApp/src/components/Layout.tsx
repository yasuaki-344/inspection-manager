import React, { FC } from "react";
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import { NavMenu } from "./NavMenu";

interface LayoutProps {
  children: React.ReactNode;
}

const mdTheme = createTheme();

export const Layout: FC<LayoutProps> = (props): JSX.Element => {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <NavMenu />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {props.children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
Layout.displayName = Layout.name;
