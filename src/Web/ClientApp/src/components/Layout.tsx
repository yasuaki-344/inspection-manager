import React from 'react';
import { Container } from '@material-ui/core';
import { NavMenu } from './NavMenu';

export const Layout = (props: any): JSX.Element => {
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
