import React, { FC } from "react";
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { NavMenu } from "./NavMenu";

interface LayoutProps {
  children: React.ReactNodeArray | React.ReactNode;
}

const mdTheme = createTheme();

export const Layout: FC<LayoutProps> = (props): JSX.Element => {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <NavMenu />
        <Container>{props.children}</Container>
      </Box>
    </ThemeProvider>
  );
};
Layout.displayName = Layout.name;
