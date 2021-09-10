import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Create } from './components/inspection/Create';
import { Details } from './components/inspection/Details';
import { Edit } from './components/inspection/Edit';
import { InspectionGroupCategory } from './components/categories/InspectionGroupCategory';
import { InspectionTypeCategory } from './components/categories/InspectionTypeCategory';
import { ChoicesTemplate } from './components/categories/ChoicesTemplate';
import {
  InspectionSheetContext,
  InspectionSheetOperator,
  InspectionItemOperator,
  InspectionItemContext
} from './use-cases';
import './custom.css'

const App = (): JSX.Element => {
  return (
    <Layout>
      <Route exact path='/' component={Home} />
      <Route path='/group' component={InspectionGroupCategory} />
      <Route path='/types' component={InspectionTypeCategory} />
      <Route path='/choices-template' component={ChoicesTemplate} />
      <InspectionSheetContext.Provider value={InspectionSheetOperator()} >
        <InspectionItemContext.Provider value={InspectionItemOperator()}>
          <Route path='/create' component={Create} />
          <Route path='/edit/:id' component={Edit} />
        </InspectionItemContext.Provider>
      </InspectionSheetContext.Provider>
      <Route path='/details/:id' component={Details} />
    </Layout>
  );
}
App.displayName = App.name;
export default App;
