import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Create } from './inspection/Create';
import { Details } from './inspection/Details';
import { Edit } from './inspection/Edit';
import { InspectionGroupCategory } from './categories/InspectionGroupCategory';
import { InspectionTypeCategory } from './categories/InspectionTypeCategory';
import { ChoicesTemplate } from './categories/ChoicesTemplate';
import { InspectionSheetContext, InspectionSheetOperator } from './inspection/InspectionSheetContext';
import './custom.css'

const App = (): JSX.Element => {
  return (
    <Layout>
      <Route exact path='/' component={Home} />
      <Route path='/group' component={InspectionGroupCategory} />
      <Route path='/types' component={InspectionTypeCategory} />
      <Route path='/choices-template' component={ChoicesTemplate} />
      <InspectionSheetContext.Provider value={InspectionSheetOperator()} >
        <Route path='/create' component={Create} />
        <Route path='/edit/:id' component={Edit} />
      </InspectionSheetContext.Provider>
      <Route path='/details/:id' component={Details} />
    </Layout>
  );
}
App.displayName = App.name;
export default App;
