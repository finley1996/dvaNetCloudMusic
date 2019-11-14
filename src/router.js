import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import TabBar from './routes/TabBar'
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/tabbar" exact
        component={TabBar} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
