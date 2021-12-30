import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Route } from "react-router-dom";
import { Layout } from "./components";
import { Home, Create, Details, Edit, Management } from "./components/pages";
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
      <CssBaseline />
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/management" component={Management} />
        <InspectionItemDialogStateContext.Provider
          value={useState(InspectionItemDialogInitialState)}
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
