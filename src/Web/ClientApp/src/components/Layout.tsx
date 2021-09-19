import React, { FC } from 'react';
import Container from '@mui/material/Container';
import { NavMenu } from './NavMenu';

interface LayoutProps {
  children: React.ReactNodeArray
}

export const Layout: FC<LayoutProps> = (props): JSX.Element => {
  return (
    <div>
      <NavMenu />
      <Container>
        {props.children}
      </Container>
    </div>
  );
}
Layout.displayName = Layout.name;
