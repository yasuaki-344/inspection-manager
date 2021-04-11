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
import { InspectionSheetContext } from './inspection/context/InspectionSheetContext';
import { InspectionSheetOperator } from './inspection/operator/InspectionSheetOperator';
import { InspectionItemOperator } from './inspection/operator/InspectionItemOperator';
import { InspectionItemContext } from './inspection/context/InspectionItemContext';
import './custom.css'
import { Experiment } from './Experiment';

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
      <Route path='/test' component={Experiment} />
    </Layout>
  );
}
App.displayName = App.name;
export default App;
