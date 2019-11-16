import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/Home';
import PlayList from './components/playlist';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/playlist" exact component={PlayList} />
        <Route path="/" exact component={IndexPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
