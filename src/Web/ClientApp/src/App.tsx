import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Counter } from './components/Counter';
import { Create } from './inspection/Create';

import './custom.css'

const App = (): JSX.Element => {
  return (
    <Layout>
      <Route exact path='/' component={Home} />
      <Route path='/create' component={Create} />
      <Route path='/counter' component={Counter} />
    </Layout>
  );
}
App.displayName = App.name;
export default App;
