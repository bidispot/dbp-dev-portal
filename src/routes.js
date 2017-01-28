import React from 'react';
import { IndexRedirect, IndexRoute, Route } from 'react-router';
import AppLayout from "./components/AppLayout";
import dashboard from "./modules/dashboard";
import addapi from "./modules/addapi";
import listapis from "./modules/listapis";
import apps from "./modules/apps";
import subscriptions from "./modules/subscriptions";

const getRoutes = (store) => {
  return (
    <Route path="/" component={AppLayout}>
      <IndexRoute component={AppLayout} />
      <IndexRedirect to="dashboard" />
      <Route path="dashboard" component={dashboard.components.DashboardPage} />
      <Route path="addapi" component={addapi.components.AddApiPage} />
      <Route path="explore" component={listapis.components.ListApisPage} />
      <Route path="myapps" component={apps.components.AppsPage} />
      <Route path="mysubscriptions" component={subscriptions.components.SubscriptionsPage} />
    </Route>
  );
};

export default { getRoutes };
