import React, { FC } from "react";
import Container from "@mui/material/Container";
import { NavMenu } from "./NavMenu";

interface LayoutProps {
  children: React.ReactNodeArray | React.ReactNode;
}

export const Layout: FC<LayoutProps> = (props): JSX.Element => {
  return (
    <>
      <NavMenu />
      <Container>{props.children}</Container>
    </>
  );
};
Layout.displayName = Layout.name;
