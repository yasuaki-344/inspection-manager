import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "./components";
import { Home, Create, Details, Edit, Management } from "./components/pages";
import {
  DIContainerContext,
  InspectionItemDialogInitialState,
  InspectionItemDialogStateContext,
  setUpDIContainer,
} from "./container";

export const App = (): JSX.Element => {
  const container = setUpDIContainer();
  return (
    <Switch>
      <Route path="/management" component={Management} />
      <DIContainerContext.Provider value={container}>
        <Layout>
          <Route exact path="/" component={Home} />
          <InspectionItemDialogStateContext.Provider
            value={useState(InspectionItemDialogInitialState)}
          >
            <Route path="/create" component={Create} />
            <Route path="/edit/:id" component={Edit} />
          </InspectionItemDialogStateContext.Provider>
          <Route path="/details/:id" component={Details} />
        </Layout>
      </DIContainerContext.Provider>
    </Switch>
  );
};
App.displayName = App.name;
