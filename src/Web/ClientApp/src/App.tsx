import React from "react";
import { Route } from "react-router-dom";
import { Layout } from "./components";
import {
  Home,
  Create,
  Details,
  Edit,
  InspectionGroupCategory,
  InspectionTypeCategory,
  ChoicesTemplateManager,
} from "./components/pages";
import {
  DIContainerContext,
  InspectionItemDialogInitialState,
  InspectionItemDialogStateContext,
  setUpDIContainer,
} from "./container";

const App = (): JSX.Element => {
  const container = setUpDIContainer();
  return (
    <DIContainerContext.Provider value={container}>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/group" component={InspectionGroupCategory} />
        <Route path="/types" component={InspectionTypeCategory} />
        <Route path="/choices-template" component={ChoicesTemplateManager} />
        <InspectionItemDialogStateContext.Provider
          value={InspectionItemDialogInitialState}
        >
          <Route path="/create" component={Create} />
          <Route path="/edit/:id" component={Edit} />
        </InspectionItemDialogStateContext.Provider>
        <Route path="/details/:id" component={Details} />
      </Layout>
    </DIContainerContext.Provider>
  );
};
App.displayName = App.name;
export default App;
