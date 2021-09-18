import React, { FC } from 'react';
import { Container } from '@material-ui/core';
import { NavMenu } from './NavMenu';

interface LayoutProps {
  children: React.ReactElement[]
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
