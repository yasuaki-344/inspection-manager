import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Create } from './inspection/Create';
import { Details } from './inspection/Details';
import { Edit } from './inspection/Edit';

import './custom.css'

const App = (): JSX.Element => {
  return (
    <Layout>
      <Route exact path='/' component={Home} />
      <Route path='/create' component={Create} />
      <Route path='/details/:id' component={Details} />
      <Route path='/edit/:id' component={Edit} />
    </Layout>
  );
}
App.displayName = App.name;
export default App;
